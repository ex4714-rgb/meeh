
import React, { useState, useRef, useCallback } from 'react';
import { SheepSkin, Particle } from './types';
import { SHEEP_SKINS } from './constants';
import VoxelSheep from './components/VoxelSheep';
import BlockFence from './components/BlockFence';
import Stars from './components/Stars';

const App: React.FC = () => {
  // State
  const [count, setCount] = useState<number>(0);
  const [activeSkin, setActiveSkin] = useState<SheepSkin>(SHEEP_SKINS[0]);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  
  // Visual Effects
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdCounter = useRef(0);
  
  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSheepSound = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;

    // --- Synthesizing a "Baaaa" (Bleat) ---
    
    // 1. The Voice (Sawtooth wave is buzzy like a vocal cord)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    
    // Pitch drops slightly during the bleat
    osc.frequency.setValueAtTime(180, t); 
    osc.frequency.linearRampToValueAtTime(140, t + 0.6);

    // 2. The Vibrato (LFO - Low Frequency Oscillator) for the "a-a-a-a" effect
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(10, t); // 10Hz wobble

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(8, t); // How strong the wobble is

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency); // Modulate the pitch of the main oscillator

    // 3. Volume Envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.08, t + 0.1); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.8); // Decay

    // Connect graph
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start/Stop
    osc.start(t);
    lfo.start(t);
    osc.stop(t + 0.8);
    lfo.stop(t + 0.8);
  };

  const handleScreenClick = useCallback(() => {
    initAudio();
    
    if (isJumping) return;

    setIsJumping(true);
    playSheepSound();
    setCount(prev => prev + 1);

    // Particle Effect
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    addParticle(x, y);

    // Reset Animation - Matches CSS duration (2000ms)
    setTimeout(() => {
      setIsJumping(false);
    }, 2000); 
  }, [isJumping]);

  const addParticle = (x: number, y: number) => {
    const id = particleIdCounter.current++;
    const texts = ["Zzz", "Bêê", "Hop", "+1", "Dodo"];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const randomColor = ["text-indigo-200", "text-purple-200", "text-white", "text-green-100"][Math.floor(Math.random() * 4)];
    
    setParticles(prev => [...prev, {
      id,
      x: x + (Math.random() * 100 - 50),
      y: y - 100,
      text: randomText,
      color: randomColor,
      scale: 0.8 + Math.random() * 0.4
    }]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1500);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col bg-gradient-to-b from-[#0b1026] via-[#111835] to-[#1e1b4b] text-indigo-100 select-none cursor-pointer font-vt323"
      onClick={handleScreenClick}
    >
      <Stars />

      {/* The Pixel Moon - Top Right */}
      <div className="absolute top-10 right-10 w-24 h-24 pointer-events-none animate-float opacity-100 z-10">
          {/* Moon Body */}
          <div className="w-full h-full bg-[#fefce8] rounded-full shadow-[0_0_60px_rgba(255,255,200,0.3)] relative pixel-shadow border-4 border-[#fefce8]/20">
            {/* Craters */}
            <div className="absolute top-4 right-6 w-4 h-4 bg-[#fde047]/30 rounded-full"></div>
            <div className="absolute bottom-6 left-5 w-6 h-6 bg-[#fde047]/30 rounded-full"></div>
            <div className="absolute top-10 left-8 w-2 h-2 bg-[#fde047]/30 rounded-full"></div>
          </div>
      </div>

      {/* Central Counter - Positioned Higher */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none mix-blend-overlay">
         <h1 className="text-[10rem] leading-none font-bold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] opacity-80">{count}</h1>
         <p className="text-indigo-200 text-2xl tracking-[0.5em] opacity-60 mt-2 uppercase">Moutons</p>
      </div>

      {/* Game Scene */}
      <div className="absolute bottom-0 w-full h-[60%] flex justify-center items-end pointer-events-none">
        
        {/* Green Plain (Hill) */}
        <div className="absolute bottom-[-15%] w-[140%] h-[80%] bg-[#064e3b] rounded-[100%] shadow-[inset_0_20px_60px_rgba(0,0,0,0.6)] border-t-8 border-[#042f2e] z-10"></div>
        
        {/* Decorative Grass */}
        <div className="absolute bottom-[20%] left-[10%] w-2 h-3 bg-[#065f46] rounded-t-full opacity-40 z-10"></div>
        <div className="absolute bottom-[25%] right-[15%] w-3 h-4 bg-[#065f46] rounded-t-full opacity-40 z-10"></div>

        {/* Fence Positioned on Hill */}
        <div className="absolute bottom-[35%] z-20 scale-100">
          <BlockFence />
        </div>

        {/* Sheep Container - Jumping Layer */}
        <div className="absolute bottom-[35%] z-30 mb-2 w-full h-full pointer-events-none">
             <div className="absolute left-0 bottom-0 w-full h-full flex justify-center items-end">
                {/* The sheep component itself handles the offset animations */}
                <VoxelSheep skin={activeSkin} isJumping={isJumping} />
             </div>
        </div>
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div 
          key={p.id}
          className={`absolute font-bold text-2xl pointer-events-none animate-float-up ${p.color}`}
          style={{ 
            left: p.x, 
            top: p.y, 
            transform: `scale(${p.scale})`,
            textShadow: '2px 2px 0px rgba(0,0,0,0.3)' 
          }}
        >
          {p.text}
        </div>
      ))}

      {/* Skin Selector */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center z-50 pointer-events-auto">
        <div className="flex gap-3 p-3 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/5">
          {SHEEP_SKINS.map((skin) => {
            const isActive = activeSkin.id === skin.id;
            return (
              <button
                key={skin.id}
                onClick={(e) => { e.stopPropagation(); setActiveSkin(skin); }}
                className={`
                  relative w-10 h-10 rounded-xl transition-all duration-300
                  ${isActive ? 'scale-110 ring-2 ring-white/50 bg-white/10' : 'opacity-50 hover:opacity-100 hover:scale-110'}
                `}
              >
                <div className={`w-full h-full rounded-lg flex items-center justify-center`}>
                   <div className={`w-5 h-5 ${skin.woolColor} rounded-full shadow-sm`}></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tap Hint */}
      {!isJumping && count === 0 && (
        <div className="absolute top-[65%] w-full text-center z-30 animate-pulse text-emerald-100/30 tracking-[0.3em] text-sm">
           TOUCHER L'ÉCRAN
        </div>
      )}
    </div>
  );
};

export default App;
