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
      // console.log(pokemon);
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
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerText = ' ';

    // creating new div element to display data
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = 'Name:' + ' ' + pokemon.name;

    let heightElement = document.createElement('h3');
    heightElement.innerText = 'Height:' + ' ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    // appending each element to the new div created
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    // appending the newly created div to the div container of the HTML.
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // hide the modal when certain events are performed.
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // adding an event listener for hiding the modal when escape key is pressed
  window.addEventListener('keydown', (e) => {
    let modalContainer =document.querySelector('#modal-container');
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  let modalContainer = document.querySelector('#modal-container');

  // adding an event listener for hiding the modal when a user clicks anywhere out of the modal.
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer) {
      hideModal();
    }
  });


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
