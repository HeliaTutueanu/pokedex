let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon is not correct")}function n(){return e}function o(){let e=document.createElement("p");e.innerText="Loading...",document.body.appendChild(e)}function i(){let e=document.querySelector("p");e&&e.remove()}function l(e){pokemonRepository.loadDetails(e).then(function(){let t=$('<div class="pokemon-info"></div>');t.append(`<h2>${e.name}</h2><p><strong>Height:</strong> ${e.height}</p><img src="${e.imageUrl}" alt="${e.name}">`),showModal(e.name,t)})}return{add:t,getAll:n,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),o=document.createElement("li"),i=document.createElement("button");o.classList.add("list-group-item"),i.innerText=t.name,i.classList.add("btn","btn-primary","btn-sm","button-class"),i.setAttribute("data-bs-toggle","modal"),i.setAttribute("data-bs-target",`#exampleModal${n.childElementCount+1}`),o.appendChild(i),n.appendChild(o),i.addEventListener("click",function(e){l(t)})},loadList:function e(){return o(),fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){let n={name:e.name,detailsUrl:e.url};t(n),console.log(n),i()})}).catch(function(e){console.error(e),i()})},loadDetails:function e(t){return o(),fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types,i()}).catch(function(e){console.error(e),i()})},showDetails:l}}();function searchPokemon(e){let t=pokemonRepository.getAll().filter(function(t){return t.name.toLowerCase().includes(e)});clearPokemonList(),t.forEach(function(e){pokemonRepository.addListItem(e)})}function clearPokemonList(){let e=document.querySelector(".pokemon-list");e.innerHTML=""}function showModal(e,t){let n=$("#modal-container");n.empty();let o=$('<div class="modal"></div>'),i=$('<button class="modal-close">Close</button>');i.on("click",hideModal);let l=$("<div></div>").append(t);o.append(l),o.append(i),n.append(o),n.addClass("is-visible"),n.on("click",e=>{$(e.target).is(n)&&hideModal()})}function hideModal(){document.querySelector("#modal-container").classList.remove("is-visible")}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})}),document.getElementById("searchTerm").addEventListener("input",function(){let e=this.value.toLowerCase();searchPokemon(e)}),document.getElementById("clearSearch").addEventListener("click",function(){document.getElementById("searchTerm").value="",searchPokemon("")}),window.addEventListener("keydown",e=>{let t=document.querySelector("#modal-container");"Escape"===e.key&&t.classList.contains("is-visible")&&hideModal()});