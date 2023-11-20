function mergedPokemonRepository(mergedList) {
  let pokemonList = mergedList || [];
  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    const expectedKeys = ['name', 'height', 'type'];
    if (typeof pokemon === 'object' && expectedKeys.every(key => Object.keys(pokemon).includes(key))) {
      pokemonList.push(pokemon);
    } else {
      console.error('Invalid Pokemon format. Please provide an object with keys: ' + expectedKeys.join(', '));
    }
  }
  function findByName(name) {
    return pokemonList.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
  }
  return {
    getAll: getAll,
    add: add,
    findByName: findByName
  };
}

let pokemonRepository = mergedPokemonRepository([
  {name: "Squirtle", height: 50, type: ["earth","cuteness"]},
  {name: "Ivysaur", height: 30, type: ["water","scary"]},
  {name: "Wigglytuff", height: 60, type: ["steel","poison"]}
]);

let pokemonRepository2 = mergedPokemonRepository([
  {name: "Alcremie", height: 50, type: ["fairy","magical"]},
  {name: "Altaria", height: 70, type: ["dragon","flying"]},
  {name: "Azurill", height: 25, type: ["water","magical"]}
]);

let newPokemonRepository = pokemonRepository;
let newPokemonRepository2 = pokemonRepository2;

(pokemonRepository.getAll().concat(pokemonRepository2.getAll())).forEach(function(pokemon) {
  document.write(pokemon.name + " (height: " + pokemon.height + ")");
  if (pokemon.height > 55) {
    document.write(" - Wow, that's big!");
  }
  else if (pokemon.height > 30 && pokemon.height <= 50) {
    document.write(" - Amazing height!");
  }
  else {
    document.write(" - You're so cute!");
  }
    document.write("<br>");
  });

printArrayDetails(newPokemonRepository.getAll());
printArrayDetails(newPokemonRepository2.getAll());