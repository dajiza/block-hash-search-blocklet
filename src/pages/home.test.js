import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './home';

describe('Home', () => {
  it('initialize', () => {
    render(<Home />);
    const button = 'Search';
    expect(screen.getByText(button)).not.toBeNull();
  });
  it('click search button with empty input', () => {
    render(<Home />);
    const button = screen.getByText('Search');
    fireEvent.click(button);
    const message = 'Please enter Block Hash';
    expect(screen.getByText(message)).not.toBeNull();
  });
});
