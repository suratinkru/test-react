// src/components/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with label and triggers onClick event', () => {
  const handleClick = jest.fn(); // Create a mock function
  render(<Button label="Click me" onClick={handleClick} />);

  // Find the button by its displayed text
  const buttonElement = screen.getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();

  // Simulate a click event
  fireEvent.click(buttonElement);

  // Check if onClick was called
  expect(handleClick).toHaveBeenCalledTimes(1);
});