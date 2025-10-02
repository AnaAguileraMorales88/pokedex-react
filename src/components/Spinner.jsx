    export default function Spinner() {
    return (
        <section
        role="region"
        aria-label="Cargando"
        className="flex justify-center items-center mt-10"
        >
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        <span className="sr-only">Cargando pokémons...</span>
        </section>
    );
    }
