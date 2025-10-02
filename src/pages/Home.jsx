    import { useEffect, useState } from "react";
    import { getPokemons, getTypes } from "../services/pokeApi";
    import PokemonCard from "../components/PokemonCard";
    import Spinner from "../components/Spinner";

    function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [dataPokemons, dataTypes] = await Promise.all([
            getPokemons(),
            getTypes()
            ]);
            setPokemons(dataPokemons);
            setFilteredPokemons(dataPokemons);
            setTypes(dataTypes);
        } catch {
            setError("No se pudieron cargar los datos 😢");
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    const toggleFavorite = (id) => {
        let updated = [];
        if (favorites.includes(id)) {
        updated = favorites.filter(favId => favId !== id);
        } else {
        updated = [...favorites, id];
        }
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    useEffect(() => {
        let result = [...pokemons];

        if (search) {
        result = result.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        }

        if (selectedType) {
        result = result.filter(p =>
            p.types.some(t => t.type.name === selectedType)
        );
        }

        if (showFavorites) {
        result = result.filter(p => favorites.includes(p.id));
        }

        setFilteredPokemons(result);
    }, [search, selectedType, pokemons, showFavorites, favorites]);

    if (loading) return <Spinner />;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <main className="p-6">
        <header>
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
            Pokédex
            </h1>
        </header>

        <section className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
            <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-64"
            />

            <ul className="flex overflow-x-auto gap-2 list-none p-0 m-0">
            {types.map(t => (
                <li key={t.name}>
                <button
                    onClick={() => setSelectedType(selectedType === t.name ? "" : t.name)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                    selectedType === t.name ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    {t.name}
                </button>
                </li>
            ))}
            </ul>

            <label className="ml-4 flex items-center gap-2">
            <input
                type="checkbox"
                checked={showFavorites}
                onChange={() => setShowFavorites(!showFavorites)}
            />
            Favoritos
            </label>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredPokemons.length > 0 ? (
            filteredPokemons.map(pokemon => (
                <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                />
            ))
            ) : (
            <p className="text-center col-span-full mt-10">
                No se han encontrado pokémons.
            </p>
            )}
        </section>
        </main>
    );
    }

    export default Home;
