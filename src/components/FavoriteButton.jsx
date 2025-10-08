    export default function FavoriteButton({ pokemonId, favorites, toggleFavorite }) {
    const isFav = favorites.includes(pokemonId);

    return (
        <button
        onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemonId);
        }}
        aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={`absolute top-6 right-6 text-2xl transition-transform duration-200 
            ${
            isFav
                ? "text-yellow-400 scale-125 hover:scale-150 cursor-pointer"
                : "text-gray-400 hover:text-yellow-300 hover:scale-125 cursor-pointer"
            }`}
        >
        ★
        </button>
    );
    }
