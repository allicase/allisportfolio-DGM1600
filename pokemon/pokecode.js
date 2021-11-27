async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

getAPIData("https://pokeapi.co/api/v2/pokemon/ditto")
.then((data) => {
    console.log(data)
    populatePokeCards(data)
})

const pokeGrid = document.querySelector('.pokeGrid')

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement('div')
  pokeScene.className = "scene"
  const pokeCard = document.createElement('div')
  pokeCard.className = "card"
  const pokeFront= document.createElement('div')
  pokeFront.className = "cardFace front"
  const pokeBack = document.createElement('div')
  pokeBack.className = "cardFace back"

  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}