# NeuroMind

NeuroMind is a full-stack learning app for neuroscience, brain-computer interfaces, and AI. It includes a React/Vite frontend and an Express backend with account, progress, knowledge-base search, and Gemini chat APIs.

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)
- A Gemini API key to use the AI chat feature (other app features do not require it)

## Run locally

1. Install dependencies:

   ```sh
   npm ci
   ```

2. (Optional) Configure Gemini chat. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` to your own key. Do not commit `.env.local`.

   PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Start the frontend and backend together:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). Check the backend health endpoint at [http://localhost:3000/api/health](http://localhost:3000/api/health).

Without a Gemini key, the app and its non-AI APIs still run; chat responds with a setup message until a key is configured.

## Performance

Learning modules and the account dialog load on demand instead of being included in the initial page download. The initial JavaScript bundle is about 261 KB (about 80 KB gzipped); 3D and other learning modules are downloaded when opened.

## Production build

```sh
npm run build
```

PowerShell:

```powershell
$env:NODE_ENV = "production"
npm start
```

The production server serves the built frontend and API on port `3000` by default, or on the port provided by the hosting environment through `PORT`. Configure `GEMINI_API_KEY` in the hosting environment if chat is required.

## Data and secrets

- Never commit API keys or other credentials. `.env*` files are ignored; `.env.example` contains placeholders only.
- Local account data is written to `users_db.json`, which is ignored by Git. Back it up separately if you need to preserve local accounts.
- If an API key was previously included in a copy of this project, revoke it and create a replacement before using Gemini chat.
