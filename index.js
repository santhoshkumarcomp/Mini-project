let totalCards = 8;
let symbols = ["@", "#", "$", "*"];
let clickedSymbol = "";
let twoSymbols = [];
let insert = document.getElementById("insert");
let firstCard = null;
let secondCard = null;
let canFlip = true;
const numberCounts = new Map();
function createCard(i) {
  // overall card
  let card = document.createElement("div");
  card.setAttribute("id", `${i}`);
  card.setAttribute("role", "button");
  card.className = "flip-card";

  // Add event listener for the click event
  card.addEventListener("click", myFunction);

  insert.appendChild(card);

  let cardInner = document.createElement("div");
  cardInner.className = "flip-card-inner";

  // Front of card
  let cardFront = document.createElement("div");
  cardFront.className = "flip-card-front";
  let cardImage = new Image();
  cardImage.setAttribute("src", "flowerBG.jpg");
  cardFront.appendChild(cardImage);
  cardInner.appendChild(cardFront);

  // Back of card
  let cardBack = document.createElement("div");
  cardBack.className = "flip-card-back";
  let para = document.createElement("p");
  para.innerHTML = symbols[shuffleCards()];
  cardBack.appendChild(para); // Add symbol from array

  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
}

for (let i = 0; i < totalCards; i++) {
  createCard(i);
}

function shuffleCards() {
  const x = Math.floor(Math.random() * 4);
  const currentCount = numberCounts.get(x) || 0;

  if (currentCount < 2) {
    numberCounts.set(x, currentCount + 1);
    return x;
  }

  let allNumbersUsedTwice = true;
  for (let i = 0; i < 4; i++) {
    const count = numberCounts.get(i) || 0;
    if (count < 2) {
      allNumbersUsedTwice = false;
      break;
    }
  }

  if (allNumbersUsedTwice) {
    numberCounts.clear();
    return shuffleCards();
  }

  return shuffleCards();
}

function myFunction(event) {
  if (!canFlip) return;
  const clickedCard = event.currentTarget;

  if (clickedCard.classList.contains("flipped")) return;

  clickedCard.classList.add("flipped");

  const cardBack = clickedCard.querySelector(".flip-card-back");
  const symbol = cardBack.querySelector("p").innerHTML;

  if (!firstCard) {
    firstCard = {
      element: clickedCard,
      symbol: symbol,
    };
    return;
  }

  secondCard = {
    element: clickedCard,
    symbol: symbol,
  };

  if (firstCard.symbol === secondCard.symbol) {
    firstCard = null;
    secondCard = null;
  } else {
    canFlip = false;
    setTimeout(() => {
      firstCard.element.classList.remove("flipped");
      secondCard.element.classList.remove("flipped");

      firstCard = null;
      secondCard = null;
      canFlip = true;
    }, 1000);
  }
}
