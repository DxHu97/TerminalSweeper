const Tile = require('./Tiles');

class Board {
    constructor(width,height,minesAmount){
        this.width = width;
        this.height = height;
        this.minesAmount = minesAmount;
        this.tiles = [];
    }

    boardLayout(){
        const grid = [];
        for (let i = 0; i < this.height; i++){
            const row = [];
            for (let j = 0; j < this.width; j++){
                row.push(new Tile(String.fromCharCode(65+i), j + 1));
            }
            grid.push(row);
        }
        this.tiles = grid;
        this.insertMines();
        this.countMines();
        console.log(this.tiles);
    }

    display(){
        let header = '  '
        for (let i = 0; i < this.width; i++){
            header += String.fromCharCode(65 + i) + ' ';
        }
        let rows = [];
        for (let i = 0; i < this.width; i++){
            let rowVal = (i + 1) + ' ';
            for (let j = 0; j < this.width; j++){
                let tile = this.tiles[j][i];
                if (tile.isFlagged){
                    rowVal += '⚑ ';
                } else if (tile.isPressed && tile.isMine){
                    rowVal += '💣 ';
                } else if (tile.isPressed && !tile.isMine){
                    rowVal += (tile.value || ' ') + ' ';
                } else {
                    rowVal += '☐ ';
                }
            }
            rows.push(rowVal.trim());
        }
        return header + '\n' + rows.join('\n') ;
    }

    getIndex(letter, num) {
        const row = letter.charCodeAt(0) - 65; 
        //finds character code of the letter in parameter, so for A it will be
        //65-65 since letter.charCodeAt(0) returns the first val of index 
        //Not important until the string is more than 1 letter
        const col = num - 1; 
        return { row, col };
    }

    setTileState(letter, number, action) {
        const { row, col } = this.getIndex(letter, number);
        const tile = this.tiles[row][col];

        if (action === 'flag') {
            tile.flagged(); 
        } else if (action === 'press') {
            let tileVal = tile.pressed();
            if (tileVal !== null) {
                if(tile.isMine){
                    console.log('You pressed a bomb')
                } else {
                    tileVal = tile.value;
                }
            }
        }
        console.log(this.display()); 
    }

    insertMines() {
        let count = 0;
        while (count < this.minesAmount) {
            const row = Math.floor(Math.random() * this.height);
            const col = Math.floor(Math.random() * this.width);
            if (!this.tiles[row][col].isMine) {
                this.tiles[row][col].isMine = true;
                count++;
            }
        }
    }

    countMines(){
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.tiles[row][col].isMine) {
                    continue;
                }
                let mineCount = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        const newRow = row + i;
                        const newCol = col + j;
                        if (newRow >= 0 && newRow < this.height && newCol >= 0 && newCol < this.width) {
                            if (this.tiles[newRow][newCol].isMine) {
                                mineCount++;
                            }
                        }
                    }
                }
                this.tiles[row][col].value = mineCount;
            }
        }
   }
}

const boardthing = new Board(3,3,5);
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


module.exports = Board;