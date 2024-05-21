class Tiles {
  constructor(letter, num, value, isMine) {
    this.value = value;
    this.isPressed = false;
    this.isMine = isMine;
    this.isFlagged = false;
    this.letter = letter;
    this.num = num;
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

  setValue() {
    return 0
  }
}

module.exports = Tiles;