const btn = document.querySelector("button");
btn.addEventListener("click", game);

function game() {
	let playerScore = 0;
	let computerScore = 0;

	// Get the player choice.

	function playerPlay() {
		const choiceRegex = /^(rock)?(paper)?(scissors)?$/i;
		playerChoice = prompt("Choose your weapon:");

		// If the player choice is not equal to "rock", "paper" or "scissors" (case-insensitive), make him input the choice again and give a hint.

		while (
			(!choiceRegex.test(playerChoice) || playerChoice === "") &&
			playerChoice !== null
		) {
			playerChoice = prompt(
				"Wrong weapon name, please try again: (Hint: rock, paper or scissors)"
			);
		}
		if (playerChoice !== null) {
			console.log(`You chose ${playerChoice.toLowerCase()}.`);
			return playerChoice;
		}
	}

	// Get the random computer choice.

	function computerPlay() {
		const choices = ["rock", "paper", "scissors"];
		const computerChoice = choices[Math.floor(Math.random() * choices.length)];
		console.log(`The computer chose ${computerChoice}.`);
		return computerChoice;
	}

	// Compare the choices and play the round.

	function playRound(playerChoice, computerChoice) {
		const rockRegex = /^rock$/i;
		const paperRegex = /^paper$/i;
		const scissorsRegex = /^scissors$/i;

		if (rockRegex.test(playerChoice) && paperRegex.test(computerChoice)) {
			// Give a point to the winner.

			computerScore++;

			// Output the round winner.

			return "You lost! Paper beats rock.";
		} else if (
			rockRegex.test(playerChoice) &&
			scissorsRegex.test(computerChoice)
		) {
			playerScore++;
			return "You win! Rock beats scissors.";
		} else if (
			paperRegex.test(playerChoice) &&
			rockRegex.test(computerChoice)
		) {
			playerScore++;
			return "You win! Paper beats rock.";
		} else if (
			paperRegex.test(playerChoice) &&
			scissorsRegex.test(computerChoice)
		) {
			computerScore++;
			return "You lost! Scissors beat paper.";
		} else if (
			scissorsRegex.test(playerChoice) &&
			rockRegex.test(computerChoice)
		) {
			computerScore++;
			return "You lost! Rock beats scissors.";
		} else if (
			scissorsRegex.test(playerChoice) &&
			paperRegex.test(computerChoice)
		) {
			playerScore++;
			return "You win! Scissors beat paper.";
		} else {
			return "It's a tie!";
		}
	}

	// Play the rounds until someone's score reaches 5 points.

	while (playerScore < 5 && computerScore < 5) {
		const playerChoice = playerPlay();
		if (playerChoice == null) {
			break;
		} else {
			console.log(playRound(playerChoice, computerPlay()));
			console.log(
				`Player score: ${playerScore} | Computer score: ${computerScore}`
			);
		}
	}
	// Output the game winner.

	if (playerScore === 5) {
		console.log("Congratulations, you won!");
	} else if (computerScore === 5) {
		console.log("The computer won! Press the button to play again.");
	}
}
