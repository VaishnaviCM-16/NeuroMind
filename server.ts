import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { KNOWLEDGE_BASE_CHUNKS } from './src/data/neuroKnowledgeBase';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Persistent JSON User Account Database
const USERS_DB_FILE = path.join(process.cwd(), 'users_db.json');

interface UserRecord {
  id: string;
  username: string;
  passwordHash: string;
  fullName: string;
  createdAt: string;
  completedNodes: string[];
  masteredFlashcards: string[];
  quizScore: number;
  level: number;
}

function loadUsersDB(): Record<string, UserRecord> {
  try {
    if (fs.existsSync(USERS_DB_FILE)) {
      const raw = fs.readFileSync(USERS_DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading users DB:', err);
  }
  return {};
}

function saveUsersDB(db: Record<string, UserRecord>) {
  try {
    fs.writeFileSync(USERS_DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users DB:', err);
  }
}

function hashPassword(pwd: string): string {
  return crypto.createHash('sha256').update(pwd + 'NEUROMIND_SALT_2026').digest('hex');
}

// Initialize GoogleGenAI securely on server
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to your environment to use the AI chat.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// RAG Search Helper (Keyword + Token Similarity Ranking)
function searchRagKnowledgeBase(query: string, topK: number = 3) {
  const queryTokens = query.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  
  const scoredChunks = KNOWLEDGE_BASE_CHUNKS.map((chunk) => {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.title.toLowerCase();

    // Check keyword overlaps
    chunk.keywords.forEach((kw) => {
      if (queryTokens.includes(kw.toLowerCase()) || query.toLowerCase().includes(kw.toLowerCase())) {
        score += 3.5;
      }
    });

    // Check title overlaps
    queryTokens.forEach((token) => {
      if (titleLower.includes(token)) score += 2.0;
      if (contentLower.includes(token)) score += 0.8;
    });

    // Exact string match bonus
    if (contentLower.includes(query.toLowerCase())) {
      score += 5.0;
    }

    const maxPossibleScore = 15;
    const similarityScore = Math.min(1.0, Math.max(0.15, score / maxPossibleScore));

    return {
      chunk,
      similarityScore: parseFloat(similarityScore.toFixed(2)),
    };
  });

  scoredChunks.sort((a, b) => b.similarityScore - a.similarityScore);
  return scoredChunks.slice(0, topK);
}

// REST API Endpoints

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NeuroMind Server', time: new Date().toISOString() });
});

// 2. Full Stack Authentication API
// 2a. Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    if (!username || !password || username.trim().length < 3 || password.trim().length < 4) {
      return res.status(400).json({ error: 'Username (min 3 chars) and Password (min 4 chars) are required.' });
    }

    const db = loadUsersDB();
    const normalizedUsername = username.trim().toLowerCase();

    if (db[normalizedUsername]) {
      return res.status(400).json({ error: 'Username already registered. Please login.' });
    }

    const newRecord: UserRecord = {
      id: `usr-${Date.now()}`,
      username: normalizedUsername,
      passwordHash: hashPassword(password),
      fullName: fullName || username,
      createdAt: new Date().toISOString(),
      completedNodes: ['node-0-1'], // Default unlocked level 0
      masteredFlashcards: [],
      quizScore: 0,
      level: 1,
    };

    db[normalizedUsername] = newRecord;
    saveUsersDB(db);

    const { passwordHash, ...userProfile } = newRecord;
    res.json({ success: true, message: 'Account created successfully!', user: userProfile });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// 2b. Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter both username and password.' });
    }

    const db = loadUsersDB();
    const normalizedUsername = username.trim().toLowerCase();
    const user = db[normalizedUsername];

    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const { passwordHash, ...userProfile } = user;
    res.json({ success: true, message: 'Logged in successfully!', user: userProfile });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// 2c. Forgot / Reset Password API
app.post('/api/auth/reset-password', (req, res) => {
  try {
    const { usernameOrEmail, newPassword, verificationCode } = req.body;
    if (!usernameOrEmail || !newPassword) {
      return res.status(400).json({ error: 'Username/Email and New Password are required.' });
    }

    if (newPassword.trim().length < 4) {
      return res.status(400).json({ error: 'New Password must be at least 4 characters.' });
    }

    const db = loadUsersDB();
    const query = usernameOrEmail.trim().toLowerCase();

    // Find account by username or email
    const foundEntry = Object.entries(db).find(
      ([uname, rec]) => uname === query || (rec as any).email?.toLowerCase() === query
    );

    if (!foundEntry) {
      return res.status(404).json({ error: 'No account found with that username or email.' });
    }

    const [key, userRecord] = foundEntry;
    userRecord.passwordHash = hashPassword(newPassword);
    db[key] = userRecord;
    saveUsersDB(db);

    const { passwordHash, ...userProfile } = userRecord;
    res.json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.',
      user: userProfile,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Password reset failed.' });
  }
});

// 2c. Save Progress
app.post('/api/auth/progress', (req, res) => {
  try {
    const { username, completedNodes, quizScore, level } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    const db = loadUsersDB();
    const normalizedUsername = username.trim().toLowerCase();
    const user = db[normalizedUsername];

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (completedNodes) user.completedNodes = Array.from(new Set([...user.completedNodes, ...completedNodes]));
    if (quizScore !== undefined) user.quizScore = Math.max(user.quizScore, quizScore);
    if (level !== undefined) user.level = Math.max(user.level, level);

    db[normalizedUsername] = user;
    saveUsersDB(db);

    const { passwordHash, ...userProfile } = user;
    res.json({ success: true, user: userProfile });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update progress' });
  }
});

// 3. RAG Search API
app.post('/api/rag/search', (req, res) => {
  try {
    const { query, topK } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query string is required' });
    }
    const results = searchRagKnowledgeBase(query, topK || 3);
    res.json({ query, resultsCount: results.length, results });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'RAG Search failed' });
  }
});

// 4. Document Store API
app.get('/api/rag/docs', (req, res) => {
  res.json({
    totalChunks: KNOWLEDGE_BASE_CHUNKS.length,
    chunks: KNOWLEDGE_BASE_CHUNKS,
    categories: ['scratch', 'brain', 'bci', 'nn', 'gan', 'vit', 'gai'],
  });
});

// 5. Gemini Wide-Range AI Assistant API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'AI chat is not configured.',
        suggestion: 'Set GEMINI_API_KEY in your environment and restart the server.',
      });
    }

    // Perform RAG retrieval
    const ragResults = searchRagKnowledgeBase(message, 3);
    
    // Construct context string
    const contextText = ragResults
      .map((r, i) => `[Research Chunk ${i + 1}: ${r.chunk.title}]\n${r.chunk.content}`)
      .join('\n\n');

    const systemInstruction = `You are NeuroMind AI, an engaging, expert AI tutor & assistant on the NeuroMind learning platform.

Your mission is to teach and answer ANY question across a wide range of topics — including Neuroscience, Brain-Computer Interfaces (BCI), Neural Networks, Generative AI, Computer Science, Mathematics, Biology, Philosophy, or General Knowledge.

Teaching Style:
- Adaptable to all levels: Explain from absolute scratch (Level 0 basics) to advanced math/engineering.
- Interactive & Engaging: Use clear analogies, bullet points, numbered steps, and bite-sized paragraphs.
- Rigorous & Helpful: When relevant to brain anatomy or neuro-AI, draw upon the grounded RAG context provided below and cite sources as [Research Chunk X].
- Open & Versatile: If the question is outside neuroscience (e.g. general science, coding, logic), answer directly, thoroughly, and warmly.

Grounded Knowledge Context (NeuroMind RAG Engine):
${contextText}`;

    const client = getGenAIClient();
    const response = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'No response generated.';

    res.json({
      text: answer,
      ragContext: ragResults,
      modelUsed: 'gemini-3.6-flash',
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while calling Gemini AI API.',
      suggestion: 'Please try sending your message again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NeuroMind Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
