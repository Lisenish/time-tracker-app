import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders without error', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Time tracking App/i);
  expect(headerElement).toBeInTheDocument();
});
