import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";

const members = [...senators, ...representatives]; // combined arrays like a boss

const senatorDiv = document.querySelector(".senators");
const seniorityHeading = document.querySelector(".seniority");
const weaselOrderedList = document.querySelector(".weaselList");

// const republicanButton = document.createElement("button");
// republicanButton.textContent = "Reoublicans";
// republicanButton.addEventListener("click", () => populateDOM(republican));
// mainHeader.appendChild(republicanButton);

// const republican = members.filter((member) => member.party === "R");

function simplifiedMembers(chamberFilter) {
  const filteredArray = members.filter((member) =>
    chamberFilter ? member.short_title === chamberFilter : member
  );

  return filteredArray.map((senator) => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      gender: senator.gender,
      seniority: parseInt(senator.seniority, 10),
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}

populateSenatorDiv(simplifiedMembers("Rep."));

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

// const filterSenators = (prop, value) => simplifiedSenators().filter(senator => senator[prop] === value)

// const republicans = filterSenators("party", "R")
// const femaleSenators = filterSenators("gender", "F")

// console.log(femaleSenators)

const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => {
  return acc.seniority > senator.seniority ? acc : senator;
});

seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name}. They have been a member for more than ${mostSeniorMember.seniority} years.`;

const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
  if (senator.loyaltyPct === 100) {
    acc.push(senator);
  }
  return acc;
}, []);

const biggestWeasel = simplifiedMembers().reduce(
  (acc, senator) =>
    (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator,
  {}
);

const biggestWeasels = simplifiedMembers().filter(
  (senator) => senator.missedVotesPct >= 50)


biggestWeasels.forEach((weasel) => {
  let listItem = document.createElement("li");
  listItem.textContent = weasel.name;
  weaselOrderedList.appendChild(listItem);
});
