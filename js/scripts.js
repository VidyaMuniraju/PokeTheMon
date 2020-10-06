let pokemonRepository = (function(){
  let pokemonList = [];

  function addv(pokemon){
    //checking for the type of item being added to the list.
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

//displaying the list of pokemon as individual li items.
//making every pokemon a button.
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');

    let button = document.createElement('button');

    button.innerText = pokemon.name;

    button.classList.add('button-class-pokemonName');

    listItem.appendChild(button);

    pokemonList.appendChild(listItem);

    addEvent(button, pokemon);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

// adding a function for event handling.
  function addEvent(element, pokemon){
    element.eventListener('click', function(){
      showDetails(pokemon);
    });

  }

  return {
    addv: addv,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
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
//using the addListItem method to display the data.
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

});
