async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

getAPIData("https://pokeapi.co/api/v2/pokemon/ditto").then((data) => {
  console.log(data);
  populatePokeCards(data);
});

const pokeGrid = document.querySelector(".pokeGrid");

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card is-flipped";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singlePokemon);
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeCaption);
  pokeFront.appendChild(pokeImg);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  pokeBack.textContent = "back";
  return pokeBack;
}
