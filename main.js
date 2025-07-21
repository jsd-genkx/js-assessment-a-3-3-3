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

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.positionRow = startRow;//0;
        this.positionCol = startCol;//0;
        this.gameOver = false;
        this.field[this.positionRow][this.positionCol] = pathCharacter;
    }

    print() {
        clear();
        const displayString = this.field.map(row => row.join("")).join("\n");
        console.log(displayString);
    }

    movePlayer(direction) {
        let newRow = this.positionRow;
        let newCol = this.positionCol;

        switch (direction.toLowerCase()) {
            case "u":
                newRow--;
                break;
            case "d":
                newRow++;
                break;
            case "l":
                newCol--;
                break;
            case "r":
                newCol++;
                break;
            default:
                console.log("Invalid input. Use 'u', 'd', 'l', or 'r'.");
                return;
        }

        // Check bounds
        if (newRow < 0 || newRow >= this.field.length || newCol < 0 || newCol >= this.field[0].length) {
            console.log("You fell out of the field. Game Over.");
            this.gameOver = true;
            return;
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
            this.positionRow = newRow;
            this.positionCol = newCol;
            this.field[newRow][newCol] = pathCharacter;
        }
    }

    runGame() {
        while (!this.gameOver) {
            this.print();
            const direction = prompt("Which way? (u = up, d = down, l = left, r = right): ");
            this.movePlayer(direction);
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