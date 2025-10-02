    import React from "react";
    import { render, screen, fireEvent } from "@testing-library/react";
    import PokemonCard from "../components/PokemonCard";
    import { MemoryRouter } from "react-router-dom";
    import { vi } from "vitest";

    const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    sprites: { front_default: "img.png" },
    types: [{ type: { name: "grass" } }],
    };

    test("muestra el nombre y tipo del Pokémon y toggle favorito", () => {
    const toggleFavorite = vi.fn();
    const favorites = [];

    render(
        <MemoryRouter>
        <PokemonCard
            pokemon={mockPokemon}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
        />
        </MemoryRouter>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();

    const favButton = screen.getByText("★");
    fireEvent.click(favButton);

    expect(toggleFavorite).toHaveBeenCalledWith(1);
    });
