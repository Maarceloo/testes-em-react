import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWitchRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto', () => {
    renderWithRouter(<NotFound />);
    const URL_IMG = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/pikachu crying because the page requested was not/i);
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
    expect(img.src).toBe(URL_IMG);
  });
});
