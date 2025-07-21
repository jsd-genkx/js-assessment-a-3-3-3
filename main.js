// "use strict";
// // JS Assessment: Find Your Hat //
// import promptSync from "prompt-sync";
// import clear from "clear-screen";

// const prompt = promptSync({ sigint: true });


// const hat = "^";
// const hole = "O";
// const fieldCharacter = "░";
// const pathCharacter = "*";

// class Field {
// 	constructor(field = [[]]) {
// 		this.field = field;

// 		// Replace with your own code //
// 		// Set the home position at (0, 0) before the game starts
// 		this.positionRow = 0;
// 		this.positionCol = 0;
// 		this.field[this.positionRow][this.positionCol] = pathCharacter;
// 	}

// 	// Print field //
// 	print() {
// 		clear();

// 		// Replace with your own code //
// 		console.log(this.field); // Please REMOVE this line before you start your code!
// 	}

// 	// Your Code //
// }

// // Game Mode ON
// // Remark: Code example below should be deleted and use your own code.
// const newGame = new Field([
// 	["░", "░", "O"],
// 	["░", "O", "░"],
// 	["░", "^", "░"],
// ]);
// newGame.print();

"use strict";

import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let message = '';

class Field {
	constructor(field, startRow, startCol) {
		this.field = field;
		this.positionRow = startRow;//0;
		this.positionCol = startCol;//0;
		this.gameOver = false;
		this.field[this.positionRow][this.positionCol] = pathCharacter;
	}

	print() {
		clear();
		const displayString = this.field.map(row => row.join("")).join("\n");
		console.log(displayString + "\n" + message);
		message = '';
	}

	moveUp() {
		this.movePlayer(-1, 0);
	}

	moveDown() {
		this.movePlayer(+1, 0)
	}

	moveLeft() {
		this.movePlayer(0, -1);
	}

	moveRight() {
		this.movePlayer(0, +1);
	}

	movePlayer(Row, Col) {
		let newRow = this.positionRow + Row;
		let newCol = this.positionCol + Col;

		// Check bounds
		if (newRow < 0 || newRow >= this.field.length || newCol < 0 || newCol >= this.field[0].length) {
			message = "You fell out of the field. Game Over.";
			this.gameOver = true;
			return;
		} else if (newRow == 0 || newRow == (this.field.length - 1) || newCol == 0 || newCol == (this.field[0].length - 1)) {
			message = "Warning, you are about to fall off the edge.";
		}

		// Check tile
		const tile = this.field[newRow][newCol];
		if (tile === hole) {
			console.log("You fell into a hole. Game Over.");
			this.gameOver = true;
		} else if (tile === hat) {
			console.log("Congratulations! You found your hat!");
			this.gameOver = true;
		} else {
			if (this.field[newRow][newCol] === pathCharacter){
				this.field[this.positionRow][this.positionCol] = fieldCharacter;
			}
			this.positionRow = newRow;
			this.positionCol = newCol;
			this.field[newRow][newCol] = pathCharacter;
		}
	}

	runGame() {
		while (!this.gameOver) {
			this.print();
			const direction = prompt("Which way? (u = up, d = down, l = left, r = right): ");
			switch (direction.toLowerCase()) {
				case "u":
					this.moveUp();
					break;
				case "d":
					this.moveDown();
					break;
				case "l":
					this.moveLeft();
					break;
				case "r":
					this.moveRight();
					break;
				default:
					console.log("Invalid input. Use 'u', 'd', 'l', or 'r'.");
					return;
			}
		}
	}
// }

// // Start the game
// const newGame = new Field([
//     ["░", "░", "O"],
//     ["░", "O", "░"],
//     ["░", "^", "░"],
// ]);

// newGame.runGame();

	static generateField(height, width, holePercentage) {
		const field = [];

		for (let y = 0; y < height; y++) {
			const row = [];
			for (let x = 0; x < width; x++) {
				const random = Math.random();
				row.push(random < holePercentage ? hole : fieldCharacter);
			}
			field.push(row);
		}

		let startRow = Math.floor(Math.random() * height);
        let startCol = Math.floor(Math.random() * width);

		let hatRow, hatCol;
		do {
			hatRow = Math.floor(Math.random() * height);
			hatCol = Math.floor(Math.random() * width);
		} while (hatRow === 0 && hatCol === 0);

		field[startRow][startCol] = pathCharacter;
        field[hatRow][hatCol] = hat;

		return { field, startRow, startCol };
	}
}

const height = 10;
const width = 10;
const holePercentage = 0.2;

const { field: randomField, startRow, startCol } = Field.generateField(height, width, holePercentage);
const game = new Field(randomField, startRow, startCol);
game.runGame();