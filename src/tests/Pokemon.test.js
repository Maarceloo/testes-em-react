import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWitchRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByText(/pikachu/i);
    const type = screen.getByTestId('pokemon-type');
    const peso = screen.getByText(/average weight: 6\.0 kg/i);
    const img = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(name).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
    expect(peso).toBeInTheDocument();
    expect(img.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });
  test('Teste se o card do pokémon indicado na Pokédex', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
  test('Teste se ao clicar no link é feito o redirecionamento', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const detalhesPage = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(detalhesPage).toBeInTheDocument();
  });
  test('Teste se simbolo de favorito é exibido', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const favorito = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favorito);
    const imgFavorito = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(imgFavorito).toHaveAttribute('src', '/star-icon.svg');
  });
});
