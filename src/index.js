const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

const state = []

const get = () => {
  fetch("http://localhost:3000/pokemons")
    .then(function (resp) {
      console.log("my response", resp);
      return resp.json();
    })

    .then(function (data) {
      console.log("data", data);
      // do something with the people data here

      state.push(data)
  
      console.log("state contains", state)
    })

    // .then(displayPokemon())

    .then(function() {

      state.forEach((item) => {
        let pkmLi = document.createElement('li');
        pkmLi.className = "pokemon"
    
        let pkmName = document.createElement('h2')
        pkmName.innerText = item.name
    
        let pkmImg = document.createElement('img')
        pkmImg.src = item.image
        pkmImg.alt = item.name
    
        pkmLi.append(pkmName, pkmImg)
        pokeList.append(pkmLi);
    
        console.log(pokeList)
      });
    
    })
};

// const displayPokemon = () => {

//   state.forEach((item) => {
//     let pkmLi = document.createElement('li');
//     pkmLi.className = "pokemon"

//     let pkmName = document.createElement('h2')
//     pkmName.innerText = item.name

//     let pkmImg = document.createElement('img')
//     pkmImg.src = item.image
//     pkmImg.alt = item.name

//     pkmLi.append(pkmName, pkmImg)
//     pokeList.append(pkmLi);

//     console.log(pokeList)
//   });

// }

// function addPokemon(pokemon) {
//   const liEl = document.createElement("li");
//   const imgEl = document.createElement("img");
//   const h2El = document.createElement("h2");

//   liEl.classList.add("pokemon");
//   imgEl.src = pokemon.image;

//   h2El.innerText = pokemon.name;

//   liEl.append(imgEl, h2El);
//   pokeList.append(liEl);
// }

// function addPokemons(pokemons) {
//   pokemons.forEach(pokemon => addPokemon(pokemon))
// }

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    };

    // CREATE
    // fetch("http://localhost:3000/pokemons", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(pokemon)
    // })
    //   .then(res =>  res.json())
    //   .then(pokemon => addPokemon(pokemon));
    //   });

    pokeForm.reset();
  });
}

function init() {
  listenToAddPokemonForm();

  // READ
  // fetch("http://localhost:3000/pokemons")
  //   .then(res => res.json());
  //   .then(pokemons => addPokemons(pokemons));
}

init();
get();

console.log(pokeList)