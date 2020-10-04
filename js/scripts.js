let pokemonList = [];

pokemonList.push(
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ['grass', 'poison']
  }
);

pokemonList.push(
  {
    name: "Nidoqueen",
    height: 1.3,
    type: ['ground', 'poison']
  }
);

pokemonList.push(
  {
    name: "Pikachu",
    height: 0.4,
    type: ['electric', 'fairy']
  }
);

pokemonList.push(
  {
    name: "Butterfree",
    height: 1.1,
    type: ['bug', 'flying']
  }
);

// console.log(pokemonList[1]);
// document.write(pokemonList[1].height);

//printing each element of the list
for(let i = 0; i < pokemonList.length; i++) {
  //if the height of the pokemon exceeds the consitional value, add a statement to indicate that
  if(pokemonList[i].height > 1.1){
    document.write("<p>" + pokemonList[i].name + "(height: " + pokemonList[i].height + ")" + "-Wow! That's big!" + "</p>");
  }
  else {
    document.write("<p>" + pokemonList[i].name + "(height: " + pokemonList[i].height + ")" + "</p>");
  }
}
