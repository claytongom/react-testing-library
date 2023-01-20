import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('Teste do componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphOne = screen.getByText(/this application simulates a pokédex.../i);
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(/one can filter pokémon by type.../i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const image = screen.getByRole('img', { name: /Pokédex/i });
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
