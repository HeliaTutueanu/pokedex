let pokemonList = [
   {name: "Squirtle", height: 50, type: ["earth","cuteness"]},
   {name: "Ivysaur", height: 30, type: ["water","scary"]},
   {name: "Wigglytuff", height: 60, type: ["steel","poison"]}
];

for (let i = 0; i < pokemonList.length; i++) {
   document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
   if (pokemonList[i].height > 55) {
      document.write(" - Wow, that's big!");
  }
   else if (pokemonList[i].height > 30 && pokemonList[i].height <= 50) {
   document.write(" - Amazing height!");
  }
   else {
   document.write(" - You're so cute!");
  }
   document.write("<br>");
}