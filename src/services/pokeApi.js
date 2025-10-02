    // src/services/pokeApi.js

    const API_BASE = "https://pokeapi.co/api/v2";

    export async function getPokemons(limit = 50) {
    try {
        const res = await fetch(`${API_BASE}/pokemon?limit=${limit}`);
        if (!res.ok) throw new Error("Error al obtener la lista de pokémons");

        const data = await res.json();

        const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailRes = await fetch(pokemon.url);
            return await detailRes.json();
        })
        );

        return detailedPokemons;
    } catch (error) {
        console.error("getPokemons error:", error);
        throw error;
    }
    }

    export async function getPokemonById(id) {
    try {
        const res = await fetch(`${API_BASE}/pokemon/${id}`);
        if (!res.ok) throw new Error("Error al obtener detalle del pokémon");

        return await res.json();
    } catch (error) {
        console.error("getPokemonById error:", error);
        throw error;
    }
    }

    export async function getTypes() {
    try {
        const res = await fetch(`${API_BASE}/type`);
        if (!res.ok) throw new Error("Error al obtener tipos");

        const data = await res.json();
        return data.results; 
    } catch (error) {
        console.error("getTypes error:", error);
        throw error;
    }
    }
