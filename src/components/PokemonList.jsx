    import { useEffect, useState } from "react";
    import { getPokemonDetail } from "../services/pokeApi";
    import PokemonCard from "./PokemonCard";
    import Spinner from "./Spinner";

    function PokemonList({ pokemons }) {
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
        try {
            const details = await Promise.all(
            pokemons.map((p) => getPokemonDetail(p.name))
            );
            setPokemonDetails(details);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchDetails();
    }, [pokemons]);

    if (loading) return <Spinner />;

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemonDetails.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        </section>
    );
    }

    export default PokemonList;
