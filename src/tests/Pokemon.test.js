import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe.only('Teste do componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const toPikachu = screen.getByText('Pikachu');
    expect(toPikachu).toBeInTheDocument();

    const pokemonType = screen.getByText('Electric');
    expect(pokemonType).toBeInTheDocument();

    const infos = screen.getByText(/average weight: 6.0 kg/i);
    expect(infos).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemon/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i })).toHaveAttribute('src', '/star-icon.svg');
  });
});
