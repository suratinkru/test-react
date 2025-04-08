import React from 'react';

type CalculatorProps = {
  a: number;
  b: number;
  operator: 'sum' | 'subtract';
};

export function sum(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const Calculator: React.FC<CalculatorProps> = ({ a, b, operator }) => {
  const result = operator === 'sum' ? sum(a, b) : subtract(a, b);
  return (
    <div>
      <h2>Result: <span data-testid="result">{result}</span></h2>
    </div>
  );
};
