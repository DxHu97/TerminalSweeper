const Tile = require('./Tiles');

class Board {
    constructor(width,height,minesAmount){
        this.width = width;
        this.height = height;
        this.minesAmount = minesAmount;
        this.tiles = [];
        this.surroundingTiles = {};
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
        console.log(grid);
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
                } else if (tile.isPressed){
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
            tile.isFlagged = !tile.isFlagged; 
        } else if (action === 'press') {
            if (!tile.isFlagged) {
                tile.isPressed = true; 
                if(tile.isMine){
                    console.log('You pressed a bomb')
                } else {
                    tile.value = '5'
                }
            }
        }

        console.log(this.display()); 
    }
}

const boardthing = new Board(9,9);
boardthing.boardLayout();
console.log(boardthing.display());
boardthing.setTileState('B', 1, 'press');


module.exports = Board;