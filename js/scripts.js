let pokemonRepository = (function(){
  let pokemonList = [];

  function addv(pokemon){
    if(typeof(pokemon) === 'object'){
      add(pokemon);
    }
    else{
      return;
    }
  }

  function add(pokemon){
    pokemonList.push(pokemon);
  }

  function getAll(){
    return pokemonList;
  }

  return {
    addv: addv,
    add: add,
    getAll: getAll
  };
}
)();

pokemonRepository.addv({
     name: "Bulbasaur",
     height: 0.7,
     type: ['grass', 'poison']
});

pokemonRepository.addv({
     name: "Nidoqueen",
     height: 1.3,
     type: ['ground', 'poison']
});

pokemonRepository.addv({
     name: "Pikachu",
     height: 0.4,
     type: ['electric', 'fairy']
});

pokemonRepository.addv({
    name: "Butterfree",
    height: 1.1,
    type: ['bug', 'flying']
 });


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
