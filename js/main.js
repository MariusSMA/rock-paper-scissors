const weapons = document.querySelectorAll(".card");
const WEAPONS = ["sword", "bow", "wand"];

let roundCounter = 0;
let playerLives = 5;
let computerLives = 5;

weapons.forEach((weapon, i) => {
  weapon.addEventListener("click", () => playRound(WEAPONS[i], computerPlay()));
});

const computerPlay = () => WEAPONS[Math.floor(Math.random() * WEAPONS.length)];

const playRound = (player, computer) => {
  const rounds = document.querySelector(".game-rounds-number");
  const enemyIcon = document.querySelector(".enemy-choice");
  const yourLives = document.querySelector(".your-lives");
  const enemyLives = document.querySelector(".enemy-lives");
  const roundResult = document.querySelector(".round-result");
  const gameResult = document.querySelector(".game-result");

  rounds.textContent = `${++roundCounter}`;
  enemyIcon.innerHTML = addEnemyWeaponImg(computer);
  checkWeapons(player, computer, yourLives, enemyLives, roundResult);
  setGameResult(playerLives, computerLives, gameResult);
};

const addEnemyWeaponImg = (compChoice) =>
  `<img src="./images/${compChoice}.png" class="icon" width="192" height="192" alt="${compChoice} icon" />`;

const checkWeapons = (player, computer, yourLives, enemyLives, roundResult) => {
  if (
    (player === "sword" && computer === "bow") ||
    (player === "bow" && computer === "wand") ||
    (player === "wand" && computer === "sword")
  ) {
    yourLives.textContent = --playerLives;
    roundResult.textContent = `You lost! The ${computer} beats the ${player}.`;
  } else if (
    (player === "sword" && computer === "wand") ||
    (player === "bow" && computer === "sword") ||
    (player === "wand" && computer === "bow")
  ) {
    enemyLives.textContent = --computerLives;
    roundResult.textContent = `You won! The ${player} beats the ${computer}.`;
  } else {
    roundResult.textContent = "It's a draw!";
  }
};

const setGameResult = (playerLives, computerLives, gameResult) => {
  const playBtn = document.querySelector(".play-again");
  playBtn.addEventListener("click", () => location.reload());

  if (!playerLives) gameResult.textContent = "You lost the battle!";
  if (!computerLives) gameResult.textContent = "You won the battle!";
  if (!computerLives || !playerLives) {
    playBtn.style.display = "block";
    weapons.forEach((weapon) => {
      weapon.setAttribute("disabled", "");
      weapon.classList.add("disabled-btn");
    });
  }
};
