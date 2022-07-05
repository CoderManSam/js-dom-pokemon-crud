const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

const state = []

const setStateAndRender = () => {
  fetch("http://localhost:3000/pokemons")
    .then(function (resp) {
      console.log("my response", resp);
      return resp.json();
    })

    .then(function (data) {
      console.log("data", data);

      data.forEach((element) => {

        state.push(element)
      })
    })

    .then(function() {

      state.forEach((item) => {
        let pkmLi = document.createElement('li');
        pkmLi.className = "pokemon"
    
        let pkmName = document.createElement('h2')
        pkmName.innerText = item.name
    
        let pkmImg = document.createElement('img')
        pkmImg.src = item.image
        pkmImg.alt = item.name

        let pkmDelete = document.createElement('button')
        pkmDelete.innerText = "Delete"

        pkmDelete.addEventListener("click", function(event) {
          event.preventDefault();
      
          // DELETE
          fetch("http://localhost:3000/pokemons/" + `${item.id}`, {
            method: "DELETE"
          })
      
        })

        let pkmLike = document.createElement('img')
        pkmLike.src = "./assets/heart-thin.svg"
        pkmLike.alt = "like button"
        pkmLike.style.width = "2rem"
        pkmLike.style.marginLeft = "3.5rem"

        pkmLike.addEventListener("click", function(event) {
          event.preventDefault();

          if (pkmLike.src ===  "http://127.0.0.1:5500/assets/heart-thin.svg") {

            pkmLike.src = "./assets/red-heart.svg"
          }

          else pkmLike.src = "./assets/heart-thin.svg"
        })
    
        pkmLi.append(pkmName, pkmImg, pkmDelete, pkmLike)
        pokeList.append(pkmLi);
    
        console.log(pokeList)
      });
    })
};

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value
    };

    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    })
      .then(res =>  res.json())
      .then(pokemon => addPokemon(pokemon));
      });
}     

pokeForm.reset();

function init() {
  listenToAddPokemonForm();
}

init();
setStateAndRender();

console.log("state contains", state)
console.log(pokeList)