const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
        image: result.sprites['front_default'],
        id: result.id,
        name: result.name,
        type: result.types.map((type) => type.type.name).join(', ')
      }));
      displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
        (poke) => `
    <li class="card">
      <img class="card-image" src="${poke.image}"/>
      <h2 class="card-title">#${poke.id}</h2>
      <h2 class="card-title">${poke.name}</h2>
      <h3 class="card-subtitle">Type: ${poke.type}</h3>
    </li>
    `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
