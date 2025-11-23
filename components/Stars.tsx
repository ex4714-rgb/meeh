import React from 'react';

const Stars: React.FC = () => {
  // Generate random positions for stars
  const stars = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: Math.random() > 0.5 ? 'w-2 h-2' : 'w-1 h-1'
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.size} bg-yellow-100 rounded-sm animate-twinkle`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay
          }}
        />
      ))}
      {/* The Moon - Minecraft style square */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-100 opacity-90 animate-float shadow-[0_0_20px_rgba(255,255,200,0.5)]"></div>
    </div>
  );
};

export default Stars;