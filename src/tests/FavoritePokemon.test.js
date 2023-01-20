import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);
    const messageNotFound = screen.getByText(/no favorite pokémon found/i);
    expect(messageNotFound).toBeInTheDocument();
  });

  it('São exibidos na tela apenas os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);

    const favorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite).toBeInTheDocument();
  });
});
