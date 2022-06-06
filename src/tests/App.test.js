import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWitchRouter';

describe('testando o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const abautLink = screen.getByRole('link', { name: /about/i });
    const favLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(abautLink).toBeInTheDocument();
    expect(favLink).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página inicial, na URL /', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const tituloHome = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(tituloHome).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de About', () => {
    renderWithRouter(<App />);
    const abautLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(abautLink);
    const abautPage = screen.getByRole('heading', { name: /about pokédex/i });
    expect(abautPage).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para Pokémons Favoritados', () => {
    renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favLink);
    const favPage = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(favPage).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    renderWithRouter(<App />);
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/teste');
    const notFound = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
