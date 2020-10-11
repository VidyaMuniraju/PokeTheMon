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

    button.setAttribute("data-toggle", "modal");

    // setting the target to the modal
    button.setAttribute("data-target", "#exampleModal");

    button.innerText = pokemon.name;

    button.classList.add('button-class-pokemonName');

    button.classList.add('btn');

    button.classList.add('btn-outline-dark');

    listItem.appendChild(button);

    pokemonList.appendChild(listItem);

    addEvent(button, pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
        add(pokemon);
        hideLoadingMessage();
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

// function to show a modal which displays the name, height, and the image of the pokemon
  function showModal(pokemon) {
    let modalBody = document.querySelector('#modal-data');
    modalBody.innerText = ' ';

    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerText = ' ';

    let nameElement = document.createElement('h1');
    nameElement.innerText = 'Name:' + ' ' + pokemon.name;

    let heightElement = document.createElement('h3');
    heightElement.innerText = 'Height:' + ' ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.classList.add('img-responsive');
    imageElement.src = pokemon.imageUrl;

    // appending each element to the new div created
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(imageElement);
  }

  function showLoadingMessage(){
    message.classList.remove('hidden');
  }

  function hideLoadingMessage(){
    message.classList.add('hidden');
  }

  return {
    addListItem: addListItem,
    loadList: loadList,
    showModal: showModal,
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
