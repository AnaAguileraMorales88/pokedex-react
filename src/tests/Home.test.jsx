    import React from "react";
    import { render, screen, waitFor } from "@testing-library/react";
    import { MemoryRouter } from "react-router-dom";
    import { vi } from "vitest";
    import Home from "../pages/Home";
    import * as pokeApi from "../services/pokeApi";

    const mockPokemons = [
    {
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "img.png" },
        types: [{ type: { name: "grass" } }],
    },
    {
        id: 2,
        name: "charmander",
        sprites: { front_default: "img2.png" },
        types: [{ type: { name: "fire" } }],
    },
    ];

    test("muestra lista de pokémons después de cargar", async () => {
    vi.spyOn(pokeApi, "getPokemons").mockResolvedValue(mockPokemons);

    render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
    );

    expect(screen.getByRole("region", { name: /cargando/i })).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });
    });
