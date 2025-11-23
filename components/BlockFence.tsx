import React from 'react';

const BlockFence: React.FC = () => {
  return (
    <div className="relative w-24 h-16 flex items-end justify-center mx-auto pointer-events-none">
      {/* Post Left */}
      <div className="absolute left-2 bottom-0 w-4 h-16 bg-[#4e342e] border-l-2 border-t-2 border-[#5d4037] border-r-2 border-b-2 border-[#3e2723] shadow-xl z-10">
        <div className="absolute top-1 left-1 w-1 h-1 bg-[#8d6e63] opacity-30"></div>
      </div>

      {/* Post Right */}
      <div className="absolute right-2 bottom-0 w-4 h-16 bg-[#4e342e] border-l-2 border-t-2 border-[#5d4037] border-r-2 border-b-2 border-[#3e2723] shadow-xl z-10">
         <div className="absolute top-1 left-1 w-1 h-1 bg-[#8d6e63] opacity-30"></div>
      </div>
      
      {/* Rails */}
      <div className="absolute bottom-10 left-0 w-full h-3 bg-[#5d4037] border-y-2 border-[#3e2723] z-0 shadow-sm"></div>
      <div className="absolute bottom-4 left-0 w-full h-3 bg-[#5d4037] border-y-2 border-[#3e2723] z-0 shadow-sm"></div>

      {/* Details (Knots/Nails) */}
      <div className="absolute bottom-10 left-3 w-1 h-1 bg-[#281a16] z-20"></div>
      <div className="absolute bottom-10 right-3 w-1 h-1 bg-[#281a16] z-20"></div>
      <div className="absolute bottom-4 left-3 w-1 h-1 bg-[#281a16] z-20"></div>
      <div className="absolute bottom-4 right-3 w-1 h-1 bg-[#281a16] z-20"></div>
    </div>
  );
};

export default BlockFence;