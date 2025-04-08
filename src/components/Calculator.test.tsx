import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator';

describe('Calculator Component', () => {
  test('แสดงผลลัพธ์ของ sum', () => {
    render(<Calculator a={5} b={3} operator="sum" />);
    expect(screen.getByTestId('result')).toHaveTextContent('8');
  });

  // ลองคอมเมนต์ test นี้เพื่อดูผล coverage ไม่ถึง 100%
  test('แสดงผลลัพธ์ของ subtract', () => {
    render(<Calculator a={5} b={3} operator="subtract" />);
    expect(screen.getByTestId('result')).toHaveTextContent('2');
  });
});
