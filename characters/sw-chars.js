import { people } from "../data/people.js";

const main = document.querySelector("#main");

console.log(people.length);

people.forEach((element) => {
  const personFig = document.createElement('figure');
  const personImg = document.createElement('img');
  let charNum = getLastNumber(element.url)
  personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;
  const personCaption = document.createElement('figcaption');
  personCaption.textContent = element.name

  personFig.appendChild(personImg);
  personFig.appendChild(personCaption);

  main.appendChild(personFig);
})

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
}
