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

pokemonList.forEach(function(item) {
  //if the height of the pokemon exceeds the consitional value, add a statement to indicate that
  if(item.height > 1.1){
    document.write("<p>" + item.name + "(height: " + item.height + ")" + "-Wow! That's big!" + "</p>");
  }
  else {
    document.write("<p>" + item.name + "(height: " + item.height + ")" + "</p>");
  }
});
