import { senators } from "../data/senators.js";

const senatorDiv = document.querySelector(".senators");

function simplifiedSenators(senatorArray) {
  return senatorArray.map((senator) => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      gender: senator.gender,
      seniority: "later",
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}

populateSenatorDiv(simplifiedSenators(senators));

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach((senator) => {
    let senFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figCaption");

    figImg.src = senator.imgURL;

    figCaption.textContent = senator.name;
    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senatorDiv.appendChild(senFigure);
  });
}

const filterSenators = (prop, value) => {
    return simplifiedSenators(senators).filter(senator => senator[prop] === value)
}

const republicans = filterSenators("party", "R")
const femaleSenators = filterSenators("gender", "F")

console.log(femaleSenators)
