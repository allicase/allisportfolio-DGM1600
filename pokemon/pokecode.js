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
  loadPokemon(100, 50);
  setTimeout(() => loadPokemon(100, 50), 3000)
});

const moreButton = document.querySelector(".morePokemon");
moreButton.addEventListener("click", () => {
  let limit = prompt("How many more Pokemon would you like?");
  let offset = prompt("Which Pokemon ID would you like to start at?");
  loadPokemon(offset, limit);
});

const allPokemon = await getAllSimplePokemon()

async function getAllSimplePokemon() {
  const allPokemon = []
  await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`,
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) => {
        const mappedPokemon = {
          abilities: pokeData.abilities,
          height: pokeData.height,
          id: pokeData.id,
          name: pokeData.name,
          types: pokeData.types,
          weight: pokeData.weight,
        }
        allPokemon.push(mappedPokemon)
      })
    }
  })
  return allPokemon
}

function getAllPokemonByType(type) {
  return allPokemon.filter((pokemon) => pokemon.types[0].type.name == type)
}

const typeSelector = document.querySelector('#typeSelector')
typeSelector.addEventListener('change', (event) => {
  const usersTypeChoice = event.target.value.toLowerCase()
  const allByType = getAllPokemonByType(usersTypeChoice)
  removeChildren(pokeGrid)
  allByType.forEach((item) => populatePokeCard(item))
})








const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon?");
  let pokeHeight = prompt("What is the Pokemon's height?");
  let pokeWeight = prompt("What is the Pokemon's weight?");
  let pokeAbilities = prompt(
    "What are your Pokemon's abilities? (seperate each by a comma)"
  );
  let pokeTypes = prompt(
    "What are your Pokemon's types? (up to 2 types, separated by a space)"
  );
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities),
    getTypesArray(pokeTypes)
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

function getTypesArray(spacedString) {
  let tempArray = spacedString.split(" ");
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName,
      },
    };
  });
}

class Pokemon {
  constructor(name, height, weight, abilities, types) {
    (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types);
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
  if (pokemon.id === 9001) {
    pokeImg.src = "../images/pokeball.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");

  //pokeCaption.textContent = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);

  typesBackground(pokemon, pokeFront);
  return pokeFront;
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name;
  let pokeType2 = pokemon.types[1]?.type.name;
  console.log(pokeType1, pokeType2);
  if (!pokeType2) {
    card.style.setProperty("background", getPokeTypeColor(pokeType1));
  } else {
    card.style.setProperty(
      "background",
      `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(
        pokeType2
      )})`
    );
  }
}

function getPokeTypeColor(pokeType) {
  let color;
  switch (pokeType) {
    case "grass":
      color = "#7cc96d";
      break;
    case "fire":
      color = "#8c0101";
      break;
    case "water":
      color = "#1d43a3";
      break;
    case "bug":
      color = "#96bf69";
      break;
    case "normal":
      color = "#dedede";
      break;
    case "flying":
      color = "#8edade";
      break;
    case "poison":
      color = "#dab8ff";
      break;
    case "electric":
      color = "#e6ff99";
      break;
    case "psychic":
      color = "pink";
      break;
    case "ground":
      color = "#a18f85";
      break;
    default:
      color = "#888888";
  }
  return color;
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

  const typeslist = document.createElement("ol");
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement("li");
    typeItem.textContent = pokeType.type.name;
    typeslist.appendChild(typeItem);
  });
  
  pokeBack.appendChild(abilityList);
  const typeLabel = document.createElement("h4");
  typeLabel.textContent = `Type:`;
  pokeBack.appendChild(typeLabel);
  pokeBack.appendChild(typeslist);
  if (pokemon.stats) {
    const pokeHP = document.createElement("h4");
    pokeHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;
    pokeBack.appendChild(pokeHP);
  }
  const pokeHeight = document.createElement("h5");
  pokeHeight.textContent = `Height: ${pokemon.height}`;

  const pokeWeight = document.createElement("h5");
  pokeWeight.textContent = `Weight: ${pokemon.weight}`;


  pokeBack.appendChild(pokeHeight);
  pokeBack.appendChild(pokeWeight);
  return pokeBack;
}
