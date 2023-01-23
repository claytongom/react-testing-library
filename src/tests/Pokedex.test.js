import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByText('Encountered Pokémon');
    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    const pokemonOne = screen.getByText(/pikachu/i);
    expect(pokemonOne).toBeInTheDocument();

    userEvent.click(nextPokemon);

    const pokemonTwo = screen.getByText(/charmander/i);
    expect(pokemonTwo).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((type, index) => {
      userEvent.click(typeButtons[index]);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(type);
      expect(typeButtons[index]).toHaveTextContent(type);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    expect(allButton.innerHTML).toBe('All');

    const fireType = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireType);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Fire');

    userEvent.click(allButton);
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
