import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWitchRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByText(/pikachu/i);
    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(pokemon).toBeInTheDocument();
    userEvent.click(botao);
    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filtros = screen.getAllByTestId('pokemon-type-button');
    filtros.forEach((button, index) => {
      expect(button).not.toEqual(filtros[index + 1]);
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnFiltro = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(btnFiltro);
    const elementoInicial = screen.getByText(/charmander/i);
    expect(elementoInicial).toBeInTheDocument();
    const resetBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(resetBtn);
    const elemento = screen.getByText(/pikachu/i);
    expect(elemento).toBeInTheDocument();
  });
});
