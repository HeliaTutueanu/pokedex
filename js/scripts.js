let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {   // adds a pokemon to the repository if it's a valid object
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }
  
  function addListItem(pokemon) {   // adds a list item for a pokemon to the DOM
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");

    listpokemon.classList.add("list-group-item");   // adds list class to li items
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "btn-sm", "button-class");   // adds Bootstrap button utility classes


    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", `#exampleModal${pokemonList.childElementCount + 1}`);   // unique modal ID

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading...";
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector("p");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  function loadList() {   // fetches the pokemon list from the API
    showLoadingMessage();

    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
        hideLoadingMessage();
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  function loadDetails(item) {   // any additional details for a pokemon
    showLoadingMessage();
    let url = item.detailsUrl;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  function showDetails(item) {   // displays the details
    pokemonRepository.loadDetails(item).then(function () {
      let modalContent = $('<div class="pokemon-info"></div>');
      modalContent.append(`<h2>${item.name}</h2><p><strong>Height:</strong> ${item.height}</p><img src="${item.imageUrl}" alt="${item.name}">`);
  
      showModal(item.name, modalContent);
    });
  }
  

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

document.getElementById('searchTerm').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  searchPokemon(searchTerm);
});

function searchPokemon(searchTerm) {   // function to search and filter Pokemon based on the entered term
  const filteredPokemon = pokemonRepository.getAll().filter(function (pokemon) {
    return pokemon.name.toLowerCase().includes(searchTerm);
  });

  clearPokemonList();   // Clear existing Pokemon list

  filteredPokemon.forEach(function (pokemon) {   // display the filtered Pokemon
    pokemonRepository.addListItem(pokemon);
  });
}

function clearPokemonList() {   // function to clear the Pokemon list
  const pokemonList = document.querySelector('.pokemon-list');
  pokemonList.innerHTML = '';    // remove all child elements
}

document.getElementById('clearSearch').addEventListener('click', function () {   // event listener for the "X" button inside the search bar to clear its content
  document.getElementById('searchTerm').value = '';
  searchPokemon('');   // trigger the search function to update the Pokemon list
});

function showModal(title, content) {
  let modalContainer = $('#modal-container');
  modalContainer.empty();   // clear all existing modal content

  let modal = $('<div class="modal"></div>');

  let closeButtonElement = $('<button class="modal-close">Close</button>');   // add the new modal content
  closeButtonElement.on('click', hideModal);

  let contentElement = $('<div></div>').append(content);   // append the content div to the modal
  
  modal.append(contentElement);
  modal.append(closeButtonElement);


  modalContainer.append(modal);
  modalContainer.addClass('is-visible');

  modalContainer.on('click', (e) => {   // this is also triggered when clicking inside the modal - now, will only close if the user clicks directly on the overlay
    let target = $(e.target);
    if (target.is(modalContainer)) {
      hideModal();
    }
  });
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {   // close  modal with escape
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});