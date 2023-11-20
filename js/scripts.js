let pokemonList = [
   {name: "Squirtle", height: 50, type: ["earth","cuteness"]},
   {name: "Ivysaur", height: 30, type: ["water","scary"]},
   {name: "Wigglytuff", height: 60, type: ["steel","poison"]}
];

let pokemonList2 = [
   {name: "Alcremie", height: 50, type: ["fairy","magical"]},
   {name: "Altaria", height: 70, type: ["dragon","flying"]},
   {name: "Azurill", height: 25, type: ["water","magical"]}
];

function printArrayDetails(list){
    list.forEach(function(pokemon) {
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
}

printArrayDetails(pokemonList);
printArrayDetails(pokemonList2);
