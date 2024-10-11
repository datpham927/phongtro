import React, { memo } from "react";

interface ButtonComponentProps {
  text: string;
  className?: string; // Optional prop
  onClick?: (e: { preventDefault: () => void; }) => Promise<void>| any// Corrected type
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  className = "", // Default value to an empty string if className is not provided
  onClick,
}) => {
  return (
    <button
      className={`flex items-center py-2 px-3 text-base justify-center rounded-md hover:underline ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default memo(ButtonComponent);
