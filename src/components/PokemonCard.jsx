    import { useNavigate } from "react-router-dom";
    import FavoriteButton from "./FavoriteButton";

    export default function PokemonCard({ pokemon, toggleFavorite, favorites }) {
    const navigate = useNavigate();

    return (
        <article
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
        className="relative bg-white rounded-xl shadow p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
        >
        <FavoriteButton
            pokemonId={pokemon.id}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
        />

        <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-20 h-20 mb-2"
        />
        <h2 className="capitalize font-semibold">{pokemon.name}</h2>
        <ul className="flex gap-2 mt-2">
            {pokemon.types.map((t) => (
            <li
                key={t.type.name}
                className="px-2 py-1 text-xs bg-gray-200 rounded-full"
            >
                {t.type.name}
            </li>
            ))}
        </ul>
        </article>
    );
    }
