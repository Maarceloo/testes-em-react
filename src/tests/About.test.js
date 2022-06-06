import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from './renderWitchRouter';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const tituloPage = screen.getByRole('heading', { name: /about pokédex/i });
    expect(tituloPage).toBeInTheDocument();
  });
  test('Teste se a página contém uma imagem', () => {
    renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(URL);
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const primeiroParagrafo = screen.getByText(/this application simulates a pokédex,/i);
    const segundoParagrafo = screen.getByText(/one can filter pokémons by type/i);

    expect(primeiroParagrafo).toBeInTheDocument();
    expect(segundoParagrafo).toBeInTheDocument();
  });
});
