const Tile = require("./Tiles");

class Board {
  constructor(width, height, minesAmount) {
    this.width = width;
    this.height = height;
    this.minesAmount = minesAmount;
    this.tiles = [];
    this.lose = false;
    this.win = false;
    this.pressedAmount = 0;
    this.firstClick = true;
  }
  //Initializes board with a grid array and row subarrays and tile objects indentified by letter(row) and number(col)
  boardLayout() {
    const grid = [];
    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Tile(String.fromCharCode(65 + i), j + 1));
      }
      grid.push(row);
    }
    this.tiles = grid;
    console.log(this.tiles);
  }

  display() {
    let header = "  ";
    for (let i = 0; i < this.width; i++) {
      header += String.fromCharCode(65 + i) + " ";
    }
    let rows = [];
    for (let i = 0; i < this.width; i++) {
      let rowVal = i + 1 + " ";
      for (let j = 0; j < this.width; j++) {
        let tile = this.tiles[j][i];
        if (this.lose && tile.isMine) {
          rowVal += " 💣";
        } else if (tile.isFlagged && !tile.isPressed) {
          rowVal += "⚑ ";
        } else if (tile.isPressed && !tile.isMine) {
          rowVal += (tile.value || " ") + " ";
        } else {
          rowVal += "☐ ";
        }
      }
      rows.push(rowVal.trim());
    }
    return header + "\n" + rows.join("\n");
  }
  // Converts letter and number coordinates to row and column indices
  getIndex(letter, num) {
    const row = letter.charCodeAt(0) - 65;
    //finds character code of the letter in parameter, so for A it will be
    //65-65 since letter.charCodeAt(0) returns the first val of index
    //Not important until the string is more than 1 letter
    const col = num - 1;
    return { row, col };
  }
  // Sets the state of a tile based on user action (press or flag)
  setTileState(letter, number, action) {
    const { row, col } = this.getIndex(letter, number);
    const tile = this.tiles[row][col];

    if (action === "flag") {
      tile.flagged();
    } else if (action === "press") {
      if (this.firstClick) {
        this.insertMines(row, col);
        this.countMines();
        this.firstClick = false;
      }

      if (!tile.isPressed && !tile.isFlagged) {
        this.revealTiles(row, col);
      }

      if (tile.isMine) {
        this.lose = true;
      } else if (
        this.pressedAmount ===
        this.width * this.height - this.minesAmount
      ) {
        this.win = true;
      }
    }

    console.log(this.display());
  }
  // Randomly inserts mines into the board, excluding the first clicked tile
  insertMines(firstRow, firstCol) {
    let count = 0;
    while (count < this.minesAmount) {
      const row = Math.floor(Math.random() * this.height);
      const col = Math.floor(Math.random() * this.width);
      if (
        (row !== firstRow || col !== firstCol) &&
        !this.tiles[row][col].isMine
      ) {
        this.tiles[row][col].isMine = true;
        count++;
      }
    }
  }
  // Counts the number of mines surrounding each tile and sets the value of each tile
  countMines() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.tiles[row][col].isMine) {
          continue;
        }
        let mineCount = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const adjacentRow = row + i;
            const adjacentCol = col + j;
            if (
              adjacentRow >= 0 &&
              adjacentRow < this.height &&
              adjacentCol >= 0 &&
              adjacentCol < this.width
            ) {
              if (this.tiles[adjacentRow][adjacentCol].isMine) {
                mineCount++;
              }
            }
          }
        }
        this.tiles[row][col].value = mineCount;
      }
    }
  }
  // Reveals a tile and, if the tile has a value of 0, recursively reveals surrounding tiles
  revealTiles(row, col) {
    const tile = this.tiles[row][col];
    if (!tile.isPressed && !tile.isMine) {
      tile.isPressed = true;
      this.pressedAmount++;
      if (tile.value === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const adjacentRow = row + i;
            const adjacentCol = col + j;
            if (
              adjacentRow >= 0 &&
              adjacentRow < this.height &&
              adjacentCol >= 0 &&
              adjacentCol < this.width
            ) {
              this.revealTiles(adjacentRow, adjacentCol);
            }
          }
        }
      }
    }
  }
}

/*const boardthing = new Board(3,3,5);
boardthing.boardLayout();
console.log(boardthing.display());
boardthing.setTileState('B', 1, 'press');
boardthing.setTileState('B', 2, 'press');
boardthing.setTileState('B', 3, 'press');
boardthing.setTileState('A', 1, 'press');
boardthing.setTileState('C', 1, 'press');
boardthing.setTileState('C', 2, 'press');
boardthing.setTileState('C', 3, 'press');
boardthing.setTileState('A', 2, 'press');
boardthing.setTileState('A', 3, 'press');
*/
module.exports = Board;
