    import { useEffect, useState } from "react";
    import { getPokemons, getTypes } from "../services/pokeApi";
    import PokemonCard from "../components/PokemonCard";
    import Spinner from "../components/Spinner";

    function Home({ favorites, toggleFavorite }) {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [dataPokemons, dataTypes] = await Promise.all([
            getPokemons(),
            getTypes(),
            ]);
            setPokemons(dataPokemons);
            setFilteredPokemons(dataPokemons);
            setTypes(dataTypes);
        } catch {
            setError("No se pudieron cargar los datos");
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let result = [...pokemons];

        if (search) {
        result = result.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        }

        if (selectedType) {
        result = result.filter((p) =>
            p.types.some((t) => t.type.name === selectedType)
        );
        }

        if (showFavorites) {
        result = result.filter((p) => favorites.includes(p.id));
        }

        setFilteredPokemons(result);
    }, [search, selectedType, pokemons, showFavorites, favorites]);

    if (loading) return <Spinner />;

    if (error)
        return (
        <section className="flex flex-col items-center mt-10 text-red-600 bg-red-100 border border-red-400 rounded p-6 max-w-lg mx-auto shadow">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="text-center mb-4">{error}</p>
            <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
            >
            Reintentar
            </button>
        </section>
        );

    return (
        <main className="p-6 max-w-7xl mx-auto">
        <header>
            <h1 className="text-6xl font-bold text-center mb-8 text-blue-600 drop-shadow-sm">
            Pokédex
            </h1>
        </header>

        <section className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 justify-center items-center">
            <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-3 w-80 sm:w-96 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />

            <ul className="flex gap-2 overflow-x-auto py-2 list-none p-0 m-0 w-full sm:w-auto justify-center">
            {types.map((t) => (
                <li key={t.name} className="flex-shrink-0">
                <button
                    onClick={() =>
                    setSelectedType(selectedType === t.name ? "" : t.name)
                    }
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 transform ${
                    selectedType === t.name
                        ? "bg-blue-500 text-white border-blue-500 scale-105 hover:scale-110 cursor-pointer"
                        : "bg-gray-200 border-gray-300 hover:bg-gray-300 hover:scale-105 cursor-pointer"
                    }`}
                >
                    {t.name}
                </button>
                </li>
            ))}
            </ul>

            <label className="flex items-center gap-2 text-lg">
            <input
                type="checkbox"
                checked={showFavorites}
                onChange={() => setShowFavorites(!showFavorites)}
                className="w-5 h-5 accent-blue-500"
            />
            Mostrar favoritos
            </label>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
                <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                />
            ))
            ) : (
            <p className="text-center col-span-full mt-10 text-gray-500 text-lg">
                No se han encontrado pokémons.
            </p>
            )}
        </section>
        </main>
    );
    }

    export default Home;
