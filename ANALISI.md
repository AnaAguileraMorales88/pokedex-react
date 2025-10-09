# Análisis del proyecto Pokédex React

## 1. Arquitectura de componentes y servicios

### Componentes principales
- **App.jsx**: Contenedor principal que gestiona el estado global de favoritos (`favorites`) y provee rutas usando React Router.
- **Home.jsx**: Página principal que muestra la lista de Pokémon, búsqueda por nombre, filtro por tipo y filtro de favoritos.
- **PokemonDetail.jsx**: Página de detalle de cada Pokémon (imagen, nombre, tipos, altura, peso, botón de favoritos y botón de volver).
- **PokemonCard.jsx**: Componente para mostrar un Pokémon en la lista con imagen, nombre, tipos y botón de favorito.
- **FavoriteButton.jsx**: Botón para marcar/desmarcar favoritos, manejando el `e.stopPropagation()` para no disparar el click del card.
- **Spinner.jsx**: Componente reutilizable para mostrar un indicador de carga.

### Servicios
- **pokeApi.js**: 
  - `getPokemons(limit)`: obtiene la lista de Pokémon y sus detalles.
  - `getPokemonById(id)`: obtiene el detalle de un Pokémon por su ID.
  - `getTypes()`: obtiene los tipos disponibles.

---

## 2. Decisiones técnicas

### Estado
- Se utiliza **lifting state up** para los favoritos (`favorites`) en App.jsx, evitando inconsistencias entre Home, PokemonCard y PokemonDetail.
- Filtros (`search`, `selectedType`, `showFavorites`) se manejan en Home.jsx para actualizar la lista filtrada (`filteredPokemons`) mediante un `useEffect`.

### Estilos
- **Tailwind CSS**: rápido para prototipado y estilos responsivos.
- Interacciones visuales: hover, focus, scroll horizontal para los tipos, animaciones en favoritos y cards.

### Routing
- **React Router DOM v6**: navegación entre Home y PokemonDetail.
- Componente `ScrollToTop` para resetear scroll al cambiar de ruta.

### Testing
- Vitest + React Testing Library:
  - Test de carga de Home con Spinner y lista de Pokémon.
  - Test de PokemonCard: renderizado de nombre, tipos y botón favorito.
  - MemoryRouter para pruebas de navegación.

### Persistencia
- Favoritos guardados en `localStorage` para mantener estado entre recargas.

---

## 3. Posibles mejoras y funcionalidades futuras

- Scroll infinito para la lista de Pokémon.
- Búsqueda avanzada por tipo múltiple.
- Detalles adicionales en PokemonDetail (habilidades, estadísticas, evoluciones).
- Mejoras en UI/UX: animaciones más suaves, modo oscuro, responsividad avanzada.
- Filtrado por favoritos avanzado (orden, categorías, etc.).
- Optimización de llamadas a la API para evitar múltiples fetchs de detalles si ya se han cargado.
- Test más exhaustivo: prueba de interacción con filtros, favoritos y navegación.

---

**Autora:** Ana Aguilera Morales  

