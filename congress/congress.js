import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { removeChildren } from "../utils/index.js";


const members = [...senators, ...representatives]; // combined arrays like a boss

const senatorDiv = document.querySelector(".senators");
const seniorityHeading = document.querySelector(".seniority");
const weaselOrderedList = document.querySelector(".weaselList");


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

populateSenatorDiv(simplifiedMembers());

function populateSenatorDiv(simpleSenators) {
  removeChildren(senatorDiv)
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

//buttons

const republicanButton = document.querySelector(".repub");
republicanButton.addEventListener("click", () => {
  const republicans = simplifiedMembers().filter(
    (member) => member.party === "R"
  );
  populateSenatorDiv(republicans);
});

const democratButton = document.querySelector(".demo");
democratButton.addEventListener("click", () => {
  const democrats = simplifiedMembers().filter(
    (member) => member.party === "D"
  );
  populateSenatorDiv(democrats);
});

// const repButton = document.querySelector(".rep");
// repButton.addEventListener("click", () => {
//   const represent = simplifiedMembers().filter(
//     (member) => member.short_title === "Rep."
//   );
//   populateSenatorDiv(represent);
// });

//seniority filter

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
  (senator) => senator.missedVotesPct >= 50
);

biggestWeasels.forEach((weasel) => {
  let listItem = document.createElement("li");
  listItem.textContent = weasel.name;
  weaselOrderedList.appendChild(listItem);
});
