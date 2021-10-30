import { people } from '../data/people.js'

const main = document.querySelector('#main')

const personFig = document.createElement('figure')
const personImg = document.createElement('img')
personImg.src = `https://starwars-visualguide.com/assets/img/characters/1.jpg`;
const personCaption = document.createElement('figcaption')
personCaption.textContent = 'person name goes here'

personFig.appendChild(personImg)
personFig.appendChild(personCaption)

main.appendChild(personFig)

