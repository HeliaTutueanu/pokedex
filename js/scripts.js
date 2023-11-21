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

  function addListItem(pokemon) {
    let ulElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    addClickListener(button, pokemon);
  }

  function showDetails(pokemon) {
    console.log("Pokemon details:", pokemon);
  }
  
  function addClickListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    findByName: findByName,
    addListItem: addListItem
  };
}

(pokemonRepository.getAll().concat(pokemonRepository2.getAll())).forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
