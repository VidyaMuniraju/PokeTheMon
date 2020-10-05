let pokemonRepository = (function(){
  let pokemonList = [];

  function add(pokemon){
    pokemonList.push(pokemon);
  }

  function getAll(){
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
}
)();

pokemonRepository.add({
     name: "Bulbasaur",
     height: 0.7,
     type: ['grass', 'poison']
});

pokemonRepository.add({
     name: "Nidoqueen",
     height: 1.3,
     type: ['ground', 'poison']
});

pokemonRepository.add({
     name: "Pikachu",
     height: 0.4,
     type: ['electric', 'fairy']
});

pokemonRepository.add({
    name: "Butterfree",
    height: 1.1,
    type: ['bug', 'flying']
 });

// console.log(pokemonRepository.getAll());
// document.write(pokemonRepository.getAll());

//printing each element of the list using for each method
//using getAll method of the pokemon repository to work on the list of pokemon.
pokemonRepository.getAll().forEach(function(item){
  //if the height of the pokemon exceeds the consitional value, add a statement to indicate that
  if(item.height > 1.1){
    document.write("<p>" + item.name + "(height: " + item.height + ")" + "-Wow! That's big!" + "</p>");
  }
  else {
    document.write("<p>" + item.name + "(height: " + item.height + ")" + "</p>");
  }
});
