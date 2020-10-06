let pokemonRepository = (function(){
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  let message = document.querySelector('.load-message');

  function add(pokemon){
    //checking for the type of item being added to the list.
    if(typeof(pokemon) === 'object'){
      pokemonList.push(pokemon);
    }
    else{
      return;
    }
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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

// adding a function for event handling.
  function addEvent(element, pokemon){
    element.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

// loading data from the specified apiURL and returning the response as individual pokemon objects.
// added to the pokemonList using add function.
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        hideLoadingMessage();
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

// loading individual data to each pokemon using the url fetched earlier(loadList).
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showLoadingMessage(){
    message.classList.add('visibe');
  }

  function hideLoadingMessage(){
    message.classList.remove('visibe');
    message.classList.add('hidden');
  }

  return {
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    getAll: getAll
  };
}
)();

//using getAll method of the pokemon repository to work on the list of pokemon.
//using the addListItem method to display the data.
//using loadList to load items to the pokemon List.
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
