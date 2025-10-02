    import { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { getPokemonById } from "../services/pokeApi";
    import Spinner from "../components/Spinner";
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
            setError("No se pudo cargar el Pokémon 😢");
        } finally {
            setLoading(false);
        }
        };
        fetchPokemon();
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!pokemon) return null;

    return (
        <main className="p-6">
        <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
            Volver
        </button>

        <article className="relative bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FavoriteButton
            pokemonId={pokemon.id}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            />

            <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 mb-4"
            />
            <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
            <ul className="flex gap-2 mb-2 list-none p-0 m-0">
            {pokemon.types.map((t) => (
                <li
                key={t.type.name}
                className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                >
                {t.type.name}
                </li>
            ))}
            </ul>
            <p>Peso: {pokemon.weight}</p>
            <p>Altura: {pokemon.height}</p>
        </article>
        </main>
    );
    }
