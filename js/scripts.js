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
    button.classList.add("btn", "btn-primary", "btn-sm");   // adds Bootstrap button utility classes


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
      let modalTitle = item.name;
      let modalContent = `<p><strong>Name:</strong> ${item.name}</p><p><strong>Height:</strong> ${item.height}</p><img src="${item.imageUrl}" alt="${item.name}">`;
      showModal(modalTitle, modalContent);
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

function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.innerHTML = '';   // clear all existing modal content

  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');   // Add the new modal content
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('div');
  contentElement.insertAdjacentHTML('beforeend', text);

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

  modalContainer.addEventListener('click', (e) => {   // this is also triggered when clicking inside the modal - now, will only close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
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