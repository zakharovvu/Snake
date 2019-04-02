class Game {
  constructor({ element }) {
      this.arrSquare = Array(20).fill('').map(el => Array(20).fill(''));
      this.arrSnake = Array(20).fill('').map(el => Array(20).fill(''));
      this.element = element
      this.currentDirection = 'top'
      this.speedGame = 100;
      this.lengthSnake = 1;
      this.arrTorns = [];
      this.pause = false;
      this.positionX = 20;
      this.positionY = 10;
      this.playGame;
      this.arrSnake[7][10] = true;

      this.render();

      document.addEventListener('click', event => {
        if (event.target.id === 'newgame') {
          this.currentDirection = 'top'
          this.pause = true;
          this.lengthSnake = 1;
          this.arrTorns = [];
          this.positionX = 20;
          this.positionY = 10;
            this.startGame();
           
         
        }
      })
      
      document.addEventListener('keydown', event => {
          switch(event.keyCode) {
            case 38: this.currentDirection = 'top'
              break;
            case 40: this.currentDirection = 'bottom'
              break;
            case 39: this.currentDirection = 'right'
              break;
            case 37: this.currentDirection = 'left'
              break;
            case 32: 
              if (this.pause === false) {
                  this.startGame();
                  this.pause = true;
              } else {
                  this.pause = false;
                clearInterval(this.playGame);
              }
              break;
          }
          
      })
  }

  startGame() {
      this.playGame = setInterval(() => {
      this.configDirection();
      if (this.positionX > 19 || this.positionX < 0 || this.positionY > 19 
        || this.positionY < 0) {
           clearInterval(this.playGame);
           return;
      }
      this.updateLengthSnake();
      this.positionSnake();
      this.render();
      }, this.speedGame)
    }
  
  render() {
    let string = `<span>Score: ${this.lengthSnake}</span><button id="newgame">New game</button><div id="game">`;
    for (let i = 0; i < this.arrSquare.length; i++) {
        for (let ii = 0; ii < this.arrSquare[i].length; ii++) {
        string += this.arrSquare[i][ii] || this.arrSnake[i][ii]
            ? `<div class="square mark"></div>`
            : `<div class="square"></div>`
        }
    }
    this.element.innerHTML = string + `</div>`
  }

  updateLengthSnake() {
    
      if (this.arrSnake[this.positionX][this.positionY] === true) {
          this.arrTorns.push(this.positionX + ' ' + this.positionY);
          this.arrTorns.push(this.positionX + ' ' + this.positionY);
          this.setOneSnake();
          this.lengthSnake++;
      } else {
          this.arrTorns.push(this.positionX + ' ' + this.positionY)
      }
  }

  positionSnake() {
      
      this.arrSquare = Array(20).fill('').map(_ => Array(20).fill(''))
      this.arrSquare[this.positionX][this.positionY] = true;
      this.arrTorns.map(el => {
        let [x, y] = el.split(' ');
        this.arrSquare[x][y] = true;
      })
      this.arrTorns.shift();
  }

  configDirection() {
    
      switch(this.currentDirection) {
        case 'top': this.positionX--
          break;
        case 'bottom': this.positionX++
          break;
        case 'right': this.positionY++
          break;
        case 'left': this.positionY--
          break;
      }
  }
  
  setOneSnake() {
      this.arrSnake = Array(20).fill('').map(el => Array(20).fill(''));
      let x = Math.floor(0 + Math.random() * (19 + 1 - 0));
      let y = Math.floor(0 + Math.random() * (19 + 1 - 0));
      this.arrSnake[x][y] = true;
  }
}

let game = new Game({element: document.querySelector('#root')})
