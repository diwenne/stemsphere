export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className="w-8 h-8 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M50,1A49,49,0,1,1,1,50,49.055,49.055,0,0,1,50,1m0-1a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z" />
        <circle cx="50" cy="50" r="15" />
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="18"
          transform="rotate(45 50 50)"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="18"
          transform="rotate(-45 50 50)"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
        />
      </svg>
      <span className="font-bold text-2xl text-gray-800">Stemsphere</span>
    </div>
  );
}