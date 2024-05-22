const Board = require('./Board.js');
const prompt = require('prompt-sync')();

function main() {
    const width = 2;  
    const height = 2; 
    const minesAmount = 3; 

    const board = new Board(width, height, minesAmount);
    board.boardLayout();

    console.log(board.display());
    console.log('Enter command (press or flag) and coordinates (e.g. A1)')
    while (true) {
        const input = prompt('What would you like to do? ').toLowerCase();
        const [action, coords] = input.split(' ');

        if (action === 'quit') {
            console.log('Quitting');
            break;
        }

        if (!['press', 'flag'].includes(action) || !coords || coords.length < 2) {
            console.log('Invalid command. Use "press" or "flag" followed by coordinates (e.g., press A1).');
            continue;
        }

        const letter = coords[0].toUpperCase();
        const number = parseInt(coords.slice(1), 10);

        if (isNaN(number) || number < 1 || number > height || letter.charCodeAt(0) < 65 || letter.charCodeAt(0) >= 65 + width) {
            console.log('Invalid coordinates. Please enter valid coordinates (e.g., A1).');
            continue;
        }

        board.setTileState(letter, number, action);
        if (board.lose){
            console.log('You pressed a bomb, game over!');
            break;
        } else if (board.win){
            console.log('Congratulations, you have won!');
            break;
        }

    }
}

main();