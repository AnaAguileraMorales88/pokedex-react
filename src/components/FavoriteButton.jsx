    export default function FavoriteButton({ pokemonId, favorites, toggleFavorite }) {
    const isFavorite = favorites.includes(pokemonId);

    return (
        <button
        onClick={(e) => {
            e.stopPropagation(); 
            toggleFavorite(pokemonId);
        }}
        className={`
            text-2xl 
            w-10 h-10 
            flex justify-center items-center 
            rounded-full 
            transition-transform duration-200 
            ${isFavorite ? "bg-yellow-100 text-yellow-400 shadow-md scale-110" : "bg-gray-100 text-gray-300 hover:bg-gray-200 hover:scale-105"}
        `}
        >
        ★
        </button>
    );
    }
