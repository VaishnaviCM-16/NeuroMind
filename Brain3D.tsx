import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BrainLobeInfo } from '../../types';
import { Brain, Activity, Layers, RotateCcw, Info, CheckCircle2, Zap, Radio, Sliders, Compass, Eye, Scissors, Home } from 'lucide-react';

export const BRAIN_LOBES_DATA: BrainLobeInfo[] = [
  {
    id: 'frontal',
    name: 'Frontal Lobe & Primary Motor Strip (M1)',
    color: '#0891b2', // Cyan
    functions: ['Executive decision making', 'Motor planning & execution (BA 4)', "Broca's speech area (BA 44/45)", 'Working memory & focus'],
    bciRelevance: 'Primary site for Motor Imagery BCIs (C3, C4, Cz) and cognitive workload tracking (Fz, Fp1, Fp2).',
    description: 'Houses the precentral gyrus motor cortex, controlling voluntary movements arranged as the motor homunculus.',
    electrodes: ['Fp1', 'Fp2', 'F3', 'F4', 'Fz', 'C3', 'C4', 'Cz']
  },
  {
    id: 'parietal',
    name: 'Parietal Lobe & Somatosensory Cortex (S1)',
    color: '#a855f7', // Purple
    functions: ['Somatosensory touch processing (BA 1-3)', 'Spatial orientation & navigation', 'Visuomotor integration'],
    bciRelevance: 'Key region for P300 speller event-related potentials (Pz, P3, P4) and spatial coordinate mapping.',
    description: 'Positioned behind the central sulcus, receiving tactile feedback and integrating spatial coordinates.',
    electrodes: ['P3', 'P4', 'Pz']
  },
  {
    id: 'temporal',
    name: 'Temporal Lobe & Auditory Cortex (A1)',
    color: '#f59e0b', // Amber
    functions: ['Auditory processing (A1)', 'Language comprehension (Wernicke BA 22)', 'Hippocampal memory bank', 'Emotion processing'],
    bciRelevance: 'Crucial for auditory BCIs, direct ECoG language decoding, and emotional valence tracking.',
    description: 'Positioned laterally beneath the Sylvian fissure, housing the primary auditory cortex and hippocampus.',
    electrodes: ['T3', 'T4', 'T5', 'T6']
  },
  {
    id: 'occipital',
    name: 'Occipital Lobe & Primary Visual Cortex (V1)',
    color: '#10b981', // Emerald
    functions: ['Primary visual cortex V1 (BA 17)', 'Visual motion processing V5', 'Pattern & color recognition'],
    bciRelevance: 'Essential for Steady-State Visually Evoked Potential (SSVEP) BCIs (O1, O2, Oz) with high bitrate.',
    description: 'Positioned at the posterior pole of the cerebrum, processing retinotopic visual inputs.',
    electrodes: ['O1', 'O2', 'Oz']
  }
];

interface Brain3DProps {
  onNavigateToTab?: (tab: string) => void;
}

export const Brain3D: React.FC<Brain3DProps> = ({ onNavigateToTab }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedLobe, setSelectedLobe] = useState<BrainLobeInfo>(BRAIN_LOBES_DATA[0]);
  const [activeElectrode, setActiveElectrode] = useState<string>('Cz');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [sliceMode, setSliceMode] = useState<'none' | 'sagittal' | 'coronal'>('none');

  // Live Simulated Waveform & FFT Spectrum Canvas
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const renderWaveform = () => {
      step += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Gridlines
      ctx.strokeStyle = '#ffffff08';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw active lobe simulated wave
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = selectedLobe.color;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 10 + step;
        let y = height / 2;

        if (selectedLobe.id === 'frontal') {
          // Beta/Motor rhythm
          y += Math.sin(t * 3) * 18 + Math.cos(t * 8) * 8;
        } else if (selectedLobe.id === 'occipital') {
          // Strong Alpha rhythm
          y += Math.sin(t * 5) * 25 + Math.sin(t * 12) * 5;
        } else if (selectedLobe.id === 'temporal') {
          // Gamma spikes
          y += Math.sin(t * 2) * 12 + (Math.random() - 0.5) * 16;
        } else {
          // Parietal P300 deflections
          y += Math.sin(t * 4) * 15 + (x % 120 === 0 ? -25 : 0);
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // FFT Band Power Bars at bottom
      const bands = [
        { label: 'Delta', val: selectedLobe.id === 'frontal' ? 0.2 : 0.4 },
        { label: 'Theta', val: selectedLobe.id === 'temporal' ? 0.7 : 0.3 },
        { label: 'Alpha', val: selectedLobe.id === 'occipital' ? 0.9 : 0.4 },
        { label: 'Beta', val: selectedLobe.id === 'frontal' ? 0.85 : 0.5 },
        { label: 'Gamma', val: selectedLobe.id === 'temporal' ? 0.8 : 0.3 },
      ];

      const barW = width / 5 - 10;
      bands.forEach((b, idx) => {
        const bx = idx * (barW + 10) + 5;
        const bh = b.val * 35;
        ctx.fillStyle = selectedLobe.color + '40';
        ctx.fillRect(bx, height - bh - 5, barW, bh);
        ctx.strokeStyle = selectedLobe.color;
        ctx.strokeRect(bx, height - bh - 5, barW, bh);

        ctx.fillStyle = '#ffffff80';
        ctx.font = '9px monospace';
        ctx.fillText(b.label, bx + 2, height - 8);
      });

      animId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => cancelAnimationFrame(animId);
  }, [selectedLobe]);

  // Three.js Realistic 3D Brain Render Engine
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 600;
    const height = currentMount.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Realistic Anatomical Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLight1.position.set(6, 10, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.0);
    dirLight2.position.set(-6, -4, -6);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 12);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // Main Brain Group
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // Lobe Materials
    const lobeMaterials: { [key: string]: THREE.MeshStandardMaterial } = {
      frontal: new THREE.MeshStandardMaterial({
        color: new THREE.Color(BRAIN_LOBES_DATA[0].color),
        roughness: 0.25,
        metalness: 0.15,
        wireframe: wireframeMode,
      }),
      parietal: new THREE.MeshStandardMaterial({
        color: new THREE.Color(BRAIN_LOBES_DATA[1].color),
        roughness: 0.25,
        metalness: 0.15,
        wireframe: wireframeMode,
      }),
      temporal: new THREE.MeshStandardMaterial({
        color: new THREE.Color(BRAIN_LOBES_DATA[2].color),
        roughness: 0.25,
        metalness: 0.15,
        wireframe: wireframeMode,
      }),
      occipital: new THREE.MeshStandardMaterial({
        color: new THREE.Color(BRAIN_LOBES_DATA[3].color),
        roughness: 0.25,
        metalness: 0.15,
        wireframe: wireframeMode,
      }),
    };

    // Organic Gyri / Sulci High-Resolution Mesh Generator
    const createAnatomicalLobeMesh = (
      lobeId: string,
      posX: number,
      posY: number,
      posZ: number,
      scaleX: number,
      scaleY: number,
      scaleZ: number,
      isRightHemisphere: boolean = false
    ) => {
      // Hide right hemisphere if Sagittal Slice Cutaway is active
      if (sliceMode === 'sagittal' && isRightHemisphere) {
        return null;
      }

      // Hide anterior lobes if Coronal Slice Cutaway is active
      if (sliceMode === 'coronal' && posZ > 0) {
        return null;
      }

      const geom = new THREE.SphereGeometry(1.0, 48, 48);
      const pos = geom.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        let vx = pos.getX(i);
        let vy = pos.getY(i);
        let vz = pos.getZ(i);

        // Procedural sulci & gyri brain cortical folding noise
        const gyriFreq1 = Math.sin(vx * 8) * 0.08;
        const gyriFreq2 = Math.cos(vy * 10) * 0.07;
        const gyriFreq3 = Math.sin(vz * 9) * 0.08;
        const microFolds = Math.sin(vx * 16 + vy * 16) * 0.03;

        const totalNoise = gyriFreq1 + gyriFreq2 + gyriFreq3 + microFolds;

        pos.setXYZ(i, vx * (1 + totalNoise), vy * (1 + totalNoise), vz * (1 + totalNoise));
      }
      geom.computeVertexNormals();

      const mesh = new THREE.Mesh(geom, lobeMaterials[lobeId]);
      mesh.position.set(posX, posY, posZ);
      mesh.scale.set(scaleX, scaleY, scaleZ);
      return mesh;
    };

    // 1. CEREBRAL HEMISPHERES (Left & Right divided by Longitudinal Fissure)
    // Frontal Lobes (Anterior Pole)
    const frontalL = createAnatomicalLobeMesh('frontal', -0.62, 0.45, 0.75, 0.78, 0.78, 0.88, false);
    const frontalR = createAnatomicalLobeMesh('frontal', 0.62, 0.45, 0.75, 0.78, 0.78, 0.88, true);
    if (frontalL) brainGroup.add(frontalL);
    if (frontalR) brainGroup.add(frontalR);

    // Parietal Lobes (Superior Posterior)
    const parietalL = createAnatomicalLobeMesh('parietal', -0.65, 0.65, -0.35, 0.78, 0.72, 0.78, false);
    const parietalR = createAnatomicalLobeMesh('parietal', 0.65, 0.65, -0.35, 0.78, 0.72, 0.78, true);
    if (parietalL) brainGroup.add(parietalL);
    if (parietalR) brainGroup.add(parietalR);

    // Temporal Lobes (Inferior Lateral)
    const temporalL = createAnatomicalLobeMesh('temporal', -0.92, -0.15, 0.25, 0.68, 0.62, 0.82, false);
    const temporalR = createAnatomicalLobeMesh('temporal', 0.92, -0.15, 0.25, 0.68, 0.62, 0.82, true);
    if (temporalL) brainGroup.add(temporalL);
    if (temporalR) brainGroup.add(temporalR);

    // Occipital Lobes (Posterior Pole V1)
    const occipitalL = createAnatomicalLobeMesh('occipital', -0.58, 0.15, -1.25, 0.68, 0.68, 0.68, false);
    const occipitalR = createAnatomicalLobeMesh('occipital', 0.58, 0.15, -1.25, 0.68, 0.68, 0.68, true);
    if (occipitalL) brainGroup.add(occipitalL);
    if (occipitalR) brainGroup.add(occipitalR);

    // 2. CEREBELLUM WITH FINE HORIZONTAL FOLIA STRATIFICATION
    const cerebGeom = new THREE.SphereGeometry(0.72, 32, 32);
    const cerebPos = cerebGeom.attributes.position;
    for (let i = 0; i < cerebPos.count; i++) {
      let vy = cerebPos.getY(i);
      let foliaNoise = Math.sin(vy * 30) * 0.04;
      cerebPos.setY(i, vy + foliaNoise);
    }
    cerebGeom.computeVertexNormals();

    const cerebMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      wireframe: wireframeMode,
    });

    const cerebL = new THREE.Mesh(cerebGeom, cerebMat);
    cerebL.position.set(-0.48, -0.75, -1.05);
    cerebL.scale.set(0.72, 0.52, 0.62);

    const cerebR = new THREE.Mesh(cerebGeom, cerebMat);
    cerebR.position.set(0.48, -0.75, -1.05);
    cerebR.scale.set(0.72, 0.52, 0.62);

    if (sliceMode !== 'sagittal') brainGroup.add(cerebR);
    brainGroup.add(cerebL);

    // 3. BRAINSTEM (Pons, Medulla & Midbrain)
    const stemGeom = new THREE.CylinderGeometry(0.24, 0.16, 1.3, 20);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.set(0, -1.1, -0.45);
    stemMesh.rotation.x = 0.22;
    brainGroup.add(stemMesh);

    // 4. DEEP INTERNAL STRUCTURES (Thalamus & Corpus Callosum exposed during Sagittal Cut)
    if (sliceMode === 'sagittal') {
      // Corpus Callosum Arch
      const ccGeom = new THREE.TorusGeometry(0.8, 0.12, 16, 32, Math.PI);
      const ccMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2 });
      const ccMesh = new THREE.Mesh(ccGeom, ccMat);
      ccMesh.rotation.z = -Math.PI / 2;
      ccMesh.position.set(-0.02, 0.1, 0.0);
      brainGroup.add(ccMesh);

      // Thalamus Egg Core
      const thalGeom = new THREE.SphereGeometry(0.35, 24, 24);
      const thalMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
      const thalMesh = new THREE.Mesh(thalGeom, thalMat);
      thalMesh.position.set(-0.05, -0.05, -0.1);
      brainGroup.add(thalMesh);
    }

    // 5. ELECTRODE PINS (10-20 Scalp Positions)
    const electrodePositions: { name: string; pos: [number, number, number]; lobe: string }[] = [
      { name: 'Fz', pos: [0, 1.32, 0.75], lobe: 'frontal' },
      { name: 'Cz', pos: [0, 1.42, -0.1], lobe: 'frontal' },
      { name: 'Pz', pos: [0, 1.25, -0.85], lobe: 'parietal' },
      { name: 'Oz', pos: [0, 0.55, -1.82], lobe: 'occipital' },
      { name: 'C3', pos: [-1.25, 1.15, -0.1], lobe: 'frontal' },
      { name: 'C4', pos: [1.25, 1.15, -0.1], lobe: 'frontal' },
      { name: 'T3', pos: [-1.6, 0.05, 0.25], lobe: 'temporal' },
      { name: 'T4', pos: [1.6, 0.05, 0.25], lobe: 'temporal' },
    ];

    electrodePositions.forEach((el) => {
      const pinGeom = new THREE.SphereGeometry(0.08, 16, 16);
      const isSelectedEl = el.name === activeElectrode;
      const pinMat = new THREE.MeshBasicMaterial({
        color: isSelectedEl ? 0xf59e0b : 0x06b6d4,
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.set(...el.pos);
      brainGroup.add(pinMesh);
    });

    // Mouse rotation drag controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      brainGroup.rotation.y += deltaX * 0.01;
      brainGroup.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Render loop
    let animId: number;
    const animate = () => {
      if (isAutoRotating && !isDragging) {
        brainGroup.rotation.y += 0.005;
      }

      // Pulse active lobe material emissivity
      Object.keys(lobeMaterials).forEach((key) => {
        if (key === selectedLobe.id) {
          lobeMaterials[key].emissive = new THREE.Color(BRAIN_LOBES_DATA.find((l) => l.id === key)?.color);
          lobeMaterials[key].emissiveIntensity = 0.35 + Math.sin(Date.now() * 0.003) * 0.15;
        } else {
          lobeMaterials[key].emissiveIntensity = 0;
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [selectedLobe, wireframeMode, isAutoRotating, activeElectrode, sliceMode]);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab('mind-maps')}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                  title="Return to Home Dashboard"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>← Back to Home</span>
                </button>
              )}
              <div className="flex items-center space-x-2 text-cyan-400">
                <Brain className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">Realistic 3D Cortical & Electrophysiology Explorer</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Human Brain Anatomy & BCI Electrode Mapping</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect realistic sulci & gyri brain cortical folds, deep Sagittal cross-sections, 4 primary lobes, and 10-20 EEG electrode positions in real-time 3D.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center space-x-1.5 ${
                isAutoRotating
                  ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAutoRotating ? 'Auto-Rotate ON' : 'Paused'}</span>
            </button>

            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center space-x-1.5 ${
                wireframeMode
                  ? 'bg-purple-950 border-purple-500/40 text-purple-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{wireframeMode ? 'Wireframe ON' : 'Solid Mesh'}</span>
            </button>

            <button
              onClick={() => setSliceMode(sliceMode === 'none' ? 'sagittal' : sliceMode === 'sagittal' ? 'coronal' : 'none')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center space-x-1.5 ${
                sliceMode !== 'none'
                  ? 'bg-amber-950 border-amber-500/40 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Cutaway: {sliceMode === 'none' ? 'Full' : sliceMode === 'sagittal' ? 'Sagittal' : 'Coronal'}</span>
            </button>
          </div>
        </div>

        {/* Lobe Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-800/80">
          {BRAIN_LOBES_DATA.map((lobe) => {
            const isSelected = selectedLobe.id === lobe.id;
            return (
              <button
                key={lobe.id}
                onClick={() => {
                  setSelectedLobe(lobe);
                  setActiveElectrode(lobe.electrodes[0]);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 text-slate-100 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-900'
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md"
                  style={{ backgroundColor: lobe.color }}
                />
                <div>
                  <div className="font-bold text-xs">{lobe.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{lobe.electrodes.length} Electrodes</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Canvas + Telemetry & Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3D Three.js Interactive Viewer Stage */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl relative flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2 pt-1">
            <span className="flex items-center space-x-1.5 text-cyan-400">
              <Zap className="w-3.5 h-3.5" />
              <span>3D Anatomical Stage (Click & Drag to Rotate)</span>
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-300">
                Anterior ➔ Frontal | Posterior ➔ Occipital
              </span>
            </div>
          </div>

          <div ref={mountRef} className="w-full h-[360px] cursor-grab active:cursor-grabbing my-auto" />

          {/* Interactive Scalp Electrode Buttons Overlay */}
          <div className="bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Select 10-20 Scalp Electrode:</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedLobe.electrodes.map((el) => (
                <button
                  key={el}
                  onClick={() => setActiveElectrode(el)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeElectrode === el
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Electrophysiology Telemetry & BCI Relevance Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live Waveform Canvas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                <Activity className="w-4 h-4" />
                <span>Electrode [{activeElectrode}] Signal Telemetry</span>
              </span>
              <span className="text-[10px] text-slate-500">500 Hz Sampling</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#050507]">
              <canvas ref={waveformCanvasRef} width={380} height={140} className="w-full h-auto block" />
            </div>
          </div>

          {/* Detailed Lobe Scientific Breakdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div>
              <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold mb-1">
                Anatomical Profile
              </div>
              <h3 className="text-lg font-bold text-slate-100">{selectedLobe.name}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedLobe.description}</p>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Physiological Functions:</div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedLobe.functions.map((fn, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-500/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 uppercase font-mono">
                <Radio className="w-3.5 h-3.5" />
                <span>BCI & Decoding Relevance:</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">{selectedLobe.bciRelevance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
