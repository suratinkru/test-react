// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (<>
   <button onClick={onClick}>{label}</button>
   <h1>Hello</h1>
   </>)
 
};

export default Button;
