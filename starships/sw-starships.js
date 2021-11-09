import { starships } from "../data/starships.js";
import { getLastNumber, removeChildren } from "../utils/index.js";

const nav = document.querySelector(".nav");
const navList = document.querySelector(".navList");
const shipView = document.querySelector(".shipViewer");

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");
const modalBackground = document.querySelector(".modal-background");
const shipMessage = document.querySelector(".shipMessage");

closeButton.addEventListener("click", () =>
  modal.classList.toggle("is-active")
);
modalBackground.addEventListener("click", () =>
  modal.classList.toggle("is-active")
);

function populateNav() {
  starships.forEach((starship) => {
    let anchorWrap = document.createElement("a");
    anchorWrap.href = "#";
    let listItem = document.createElement("li");
    listItem.textContent = starship.name;

    anchorWrap.addEventListener("click", () => populateShipView(starship));

    anchorWrap.appendChild(listItem);
    navList.appendChild(anchorWrap);
  });
}

populateNav();

function populateShipView(shipData) {
  removeChildren(shipView);
  console.log(`You clicked on ${shipData.name}`);
  let shipImage = document.createElement("img");
  let shipNum = getLastNumber(shipData.url);
  shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`;
  shipImage.addEventListener("error", () => {
    shipImage.hidden = true;
    modal.classList.toggle("is-active");
    shipMessage.textContent = `${shipData.name} is not available`;
  });
  shipView.appendChild(shipImage);
}
