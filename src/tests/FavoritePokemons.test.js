import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FavoritePokemons } from '../pages';
import App from '../App';
import renderWithRouter from './renderWitchRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibida na tela a mensagem', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detalhes = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detalhes);
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkBox);
    const favPage = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favPage);
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img.alt).toBe('Pikachu sprite');
  });
});
