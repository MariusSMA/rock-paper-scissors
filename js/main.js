const weapons = document.querySelectorAll(".card");
const playBtn = document.querySelector(".play-again");

const WEAPONS = ["sword", "bow", "wand"];

let roundCounter = 0;
let playerLives = 5;
let computerLives = 5;

playBtn.addEventListener("click", () => location.reload());
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
  addEnemyWeaponImg(computer, enemyIcon);
  checkWeapons(player, computer, yourLives, enemyLives, roundResult);

  if (!playerLives) gameResult.textContent = "You lost the battle!";
  if (!computerLives) gameResult.textContent = "You won the battle!";
  if (!computerLives || !playerLives) {
    playBtn.style.display = "block";
    weapons.forEach((weapon) => {
      weapon.setAttribute("disabled", "");
      weapon.style.opacity = "0.35";
      weapon.style.cursor = "initial";
      weapon.style.transform = "none";
    });
  }
};

const addEnemyWeaponImg = (compChoice, enemyIcon) => {
  if (compChoice === "sword") {
    enemyIcon.innerHTML = `<img class="icon" src="../images/sword.png" alt="Sword icon" />`;
  } else if (compChoice === "bow") {
    enemyIcon.innerHTML = `<img class="icon" src="../images/bow.png" alt="Bow icon" />`;
  } else {
    enemyIcon.innerHTML = `<img class="icon" src="../images/wand.png" alt="Wand icon" />`;
  }
};

const checkWeapons = (player, computer, yourLives, enemyLives, roundResult) => {
  if (player === "sword" && computer === "bow") {
    yourLives.textContent = --playerLives;
    roundResult.textContent = "You lost! Bow beats Sword.";
  } else if (player === "sword" && computer === "wand") {
    enemyLives.textContent = --computerLives;
    roundResult.textContent = "You won! Sword beats Wand.";
  } else if (player === "bow" && computer === "sword") {
    enemyLives.textContent = --computerLives;
    roundResult.textContent = "You won! Bow beats Sword.";
  } else if (player === "bow" && computer === "wand") {
    yourLives.textContent = --playerLives;
    roundResult.textContent = "You lost! Wand beats Bow.";
  } else if (player === "wand" && computer === "sword") {
    yourLives.textContent = --playerLives;
    roundResult.textContent = "You lost! Sword beats Wand.";
  } else if (player === "wand" && computer === "bow") {
    enemyLives.textContent = --computerLives;
    roundResult.textContent = "You won! Wand beats Bow.";
  } else {
    roundResult.textContent = "It's a draw!";
  }
};
