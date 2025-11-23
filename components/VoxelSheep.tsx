
import React from 'react';
import { SheepSkin } from '../types';

interface VoxelSheepProps {
  skin: SheepSkin;
  isJumping: boolean;
}

const VoxelSheep: React.FC<VoxelSheepProps> = ({ skin, isJumping }) => {
  return (
    <div 
      className={`relative w-10 h-9 will-change-transform ${isJumping ? 'animate-sheep-jump' : 'animate-float'}`}
      style={{
        filter: 'drop-shadow(0px 4px 0px rgba(0,0,0,0.2))'
      }}
    >
      {/* Legs (Back) */}
      <div className={`absolute bottom-0 left-3 w-1.5 h-2 bg-neutral-800 rounded-full origin-top ${isJumping ? '-rotate-12' : ''}`}></div>
      <div className={`absolute bottom-0 right-3 w-1.5 h-2 bg-neutral-800 rounded-full origin-top ${isJumping ? 'rotate-12' : ''}`}></div>

      {/* Body - Super Round */}
      <div className={`absolute bottom-1 left-0.5 right-0.5 top-3 ${skin.bodyColor} rounded-[14px] shadow-inner z-10`}>
      </div>

      {/* Head (Big & Cute & Round) */}
      <div className={`absolute -top-1 -left-1 w-9 h-8 z-20`}>
         <div className={`w-full h-full ${skin.headColor} rounded-[14px] relative overflow-hidden shadow-sm`}>
            {/* Blush (Joues roses) */}
            <div className="absolute bottom-2 left-1.5 w-1.5 h-1 bg-pink-400/60 rounded-full"></div>
            <div className="absolute bottom-2 right-1.5 w-1.5 h-1 bg-pink-400/60 rounded-full"></div>
            
            {/* Snout */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-2 h-1 bg-black/10 rounded-full"></div>
         </div>
         
         {/* Eyes (Huge and close together) */}
         <div className="absolute top-3 left-2.5 w-1.5 h-2 bg-white rounded-full">
            <div className="absolute top-0.5 right-0 w-1 h-1 bg-black rounded-full"></div>
         </div>
         <div className="absolute top-3 right-2.5 w-1.5 h-2 bg-white rounded-full">
             <div className="absolute top-0.5 right-0 w-1 h-1 bg-black rounded-full"></div>
         </div>

         {/* Ears (Tiny Nubs) */}
         <div className={`absolute top-1 -left-1 w-2.5 h-2.5 ${skin.headColor} rounded-full shadow-sm`}></div>
         <div className={`absolute top-1 -right-1 w-2.5 h-2.5 ${skin.headColor} rounded-full shadow-sm`}></div>
      </div>

      {/* Legs (Front) */}
      <div className={`absolute bottom-0 left-1.5 w-1.5 h-2 bg-neutral-800 rounded-full z-10 origin-top ${isJumping ? '-rotate-[30deg]' : ''}`}></div>
      <div className={`absolute bottom-0 right-1.5 w-1.5 h-2 bg-neutral-800 rounded-full z-10 origin-top ${isJumping ? 'rotate-[30deg]' : ''}`}></div>
    </div>
  );
};

export default VoxelSheep;