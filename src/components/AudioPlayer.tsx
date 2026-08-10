import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState<'rain' | 'fireplace' | 'calm'>('rain');
  const [volume, setVolume] = useState(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  const stopAudio = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        console.error(e);
      }
      audioCtxRef.current = null;
    }
  };

  const startAudio = () => {
    stopAudio();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink or Brown noise synthesis for natural rain/fireplace
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (soundType === 'rain') {
          // Soft filtered rain
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
        } else if (soundType === 'fireplace') {
          // Warm crackling brown noise
          data[i] = (lastOut + 0.05 * white) / 1.05;
          lastOut = data[i];
        } else {
          // Calm breeze
          data[i] = (lastOut + 0.01 * white) / 1.01;
          lastOut = data[i];
        }
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter
      const filter = ctx.createBiquadFilter();
      if (soundType === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.value = 800;
      } else if (soundType === 'fireplace') {
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 1.2;
      } else {
        filter.type = 'lowpass';
        filter.frequency.value = 350;
      }

      const gain = ctx.createGain();
      gain.gain.value = volume;
      gainNodeRef.current = gain;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noiseSourceRef.current = noise;
    } catch (e) {
      console.error('Audio synthesis failed', e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAudio();
    } else {
      stopAudio();
    }
    return () => {
      stopAudio();
    };
  }, [isPlaying, soundType]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-[#1A1918]/90 text-[#E6E1D5] backdrop-blur-md rounded-full px-4 py-2.5 shadow-xl border border-[#3A3835] flex items-center space-x-3 text-xs tracking-wider font-sans-kr transition-all duration-300 hover:scale-105">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="flex items-center space-x-2 text-[#D8D2C3] hover:text-white transition-colors focus:outline-none"
        title="독서 몰입 배경음 ON/OFF"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#D2B48C] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400" />
        )}
        <span className="font-medium">{isPlaying ? '사색 소리 재생 중' : '사색 소리'}</span>
      </button>

      {isPlaying && (
        <div className="flex items-center space-x-2 border-l border-[#3A3835] pl-3">
          <select
            value={soundType}
            onChange={(e) => setSoundType(e.target.value as any)}
            className="bg-transparent text-stone-300 hover:text-white border-none focus:outline-none cursor-pointer text-xs"
          >
            <option value="rain" className="bg-[#1A1918] text-white">빗소리</option>
            <option value="fireplace" className="bg-[#1A1918] text-white">모닥불</option>
            <option value="calm" className="bg-[#1A1918] text-white">고요한 바람</option>
          </select>

          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 accent-[#D2B48C] cursor-pointer"
            title="음량 조절"
          />
        </div>
      )}
    </div>
  );
};
