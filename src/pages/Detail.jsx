    import { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { getPokemonById } from "../services/pokeApi";
    import FavoriteButton from "../components/FavoriteButton";

    export default function PokemonDetail({ favorites, toggleFavorite }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
        try {
            const data = await getPokemonById(id);
            setPokemon(data);
        } catch {
            setError("No se pudo cargar el Pokémon");
        } finally {
            setLoading(false);
        }
        };

        fetchPokemon();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Cargando Pokémon...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <main className="p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

        <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 mb-4"
        />

        <section className="flex gap-2 mb-2">
            {pokemon.types.map((t) => (
            <span
                key={t.type.name}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
                {t.type.name}
            </span>
            ))}
        </section>

        <p className="mb-2">Altura: {pokemon.height}</p>
        <p className="mb-4">Peso: {pokemon.weight}</p>

        <FavoriteButton
            pokemonId={pokemon.id}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
        />

        <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Volver
        </button>
        </main>
    );
    }
