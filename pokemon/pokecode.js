import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData)
      );
    }
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  loadPokemon(100, 5);
});

const moreButton = document.querySelector('.morePokemon')
moreButton.addEventListener('click', () => {
  let limit = prompt('How many more Pokemon would you like:')
  let offset = prompt('Which Pokemon ID would you like to start at:')
  loadPokemon(offset, limit)
})

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon:");
  let pokeHeight = prompt("What is the Pokemon's height:");
  let pokeWeight = prompt("What is the Pokemon's weight:");
  let pokeAbilities = prompt(
    "What are your Pokemon's Abilities (seperate by commas):"
  );
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities)
  );
  populatePokeCard(newPokemon);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(",");
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    };
  });
}

class Pokemon {
  constructor(name, height, weight, abilities) {
    (this.id = 100),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities);
  }
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
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
  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);
  return pokeBack;
}
