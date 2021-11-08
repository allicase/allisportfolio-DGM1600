import { starships } from "../data/starships.js";

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.shipViewer')

function populateNav() {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        let listItem = document.createElement('li')
        listItem.textContent = starship.name
        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

populateNav()