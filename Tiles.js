class Tiles {
  constructor(value, isPressed, isNumber, isMine, isFlagged, letter, num) {
    this.value = value;
    this.isPressed = false;
    this.isNumber = isNumber;
    this.isMine = isMine;
    this.isFlagged = false;
    this.letter = letter;
    this.num = num;
    this.surroundingTiles = {};
  }

  pressed() {
    if (!this.isPressed && !this.isFlagged){
        this.isPressed = true;
        return this.value;
    } 
    return null;
  }

  flagged() {
    if(!this.isFlagged){
        this.isFlagged = true;
    } else {
        this.isFlagged = false;
    }
  }

  setSurroundingTiles(letter, num, isPressed, value){
  }

  setValue() {
    count = 0;
    this.value;
  }
}

export default CalculateArea;
