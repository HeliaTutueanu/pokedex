let pokemonRepository = (function () {
  let pokemonList = [
    {name: "Squirtle", height: 50, type: ["earth","cuteness"]},
    {name: "Ivysaur", height: 30, type: ["water","scary"]},
    {name: "Wigglytuff", height: 60, type: ["steel","poison"]}
];

function getAll() {
  return pokemonList;
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

return {
  getAll: getAll,
  add: add
};
})();

let pokemonRepository2 = (function () {
  let pokemonList2 = [
    {name: "Alcremie", height: 50, type: ["fairy","magical"]},
    {name: "Altaria", height: 70, type: ["dragon","flying"]},
    {name: "Azurill", height: 25, type: ["water","magical"]}
];

function getAll() {
  return pokemonList2;
}

function add(pokemon) {
  pokemonList2.push(pokemon);
}

return {
  getAll: getAll,
  add: add
};
})();

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