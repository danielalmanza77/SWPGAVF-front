import React from 'react';

const Waves = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0"> {/* Añadir z-index aquí */}
      <svg
        className="relative block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <path
          d="M0 24h150V0C75 4 37.5 18 0 24z"
          className="text-blue-500 fill-current"
        >
          <animate
            attributeName="d"
            values="M0 24h150V0C75 4 37.5 18 0 24z; M0 24h150V0C75 8 37.5 12 0 24z; M0 24h150V0C75 4 37.5 18 0 24z"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Waves;
