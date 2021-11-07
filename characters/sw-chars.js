import { people } from "../data/people.js";

const main = document.querySelector("#main");

const mainHeader = document.createElement("header");
document.body.insertBefore(mainHeader, main);

const maleButton = document.createElement("button");
maleButton.textContent = "Male Characters";

maleButton.addEventListener("click", () => console.log('Thanks for clicking'));

mainHeader.appendChild(maleButton);

const femaleButton = document.createElement("button");
femaleButton.textContent = "Female Characters";
mainHeader.appendChild(femaleButton);

const othersButton = document.createElement("button");
othersButton.textContent = "Other Characters";
mainHeader.appendChild(othersButton);

const maleCharacters = people.filter((person) => person.gender === "male");

const femaleCharacters = people.filter((person) => person.gender === "female");

const otherCharacters = people.filter((person) => {
  if (person.gender === "n/a" || person.gender === "hermaphrodite") {
    return person;
  }
});

people.forEach((element) => {
  const personFig = document.createElement("figure");
  const personImg = document.createElement("img");
  let charNum = getLastNumber(element.url);
  personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;
  const personCaption = document.createElement("figcaption");
  personCaption.textContent = element.name;

  personFig.appendChild(personImg);
  personFig.appendChild(personCaption);

  main.appendChild(personFig);
});

function getLastNumber(url) {
  let end = url.lastIndexOf("/");
  let start = end - 2;
  if (url.charAt(start) === "/") {
    start++;
  }
  return url.slice(start, end);
}
