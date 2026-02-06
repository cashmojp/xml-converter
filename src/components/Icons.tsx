import React from 'react';

interface IconProps {
  className?: string;
}

export const FileCodeArrowIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {/* File shape with folded corner */}
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      {/* Left arrow */}
      <path d="M8 12h2" />
      <path d="M10 12l-2 2" />
      <path d="M10 12l-2-2" />
      {/* Right arrow */}
      <path d="M14 12h2" />
      <path d="M16 12l-2 2" />
      <path d="M16 12l-2-2" />
    </svg>
  );
};
