class lastPos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    createRect(this.x - 5 + oneBlockSize / 2, this.y - 5 + oneBlockSize / 2, oneBlockSize / 3, oneBlockSize / 3, "#FEB897");
  }
}

class Player {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.count = 0;
    this.moving = false;
    // setInterval(() => {
    //   this.changeRandomDirection();
    // }, 1000);
  }

  changeRandomDirection() {
    // let addition = 1;
    // this.randomTargetIndex += addition;
    // this.randomTargetIndex = this.randomTargetIndex % 4;
  }

  moveProcess() {
    if (this.exit()) return; // Saiu?
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
      return;
    }
  }

  exit() {
    return map[this.y / oneBlockSize][this.x / oneBlockSize] == 3;
  }

  moveBackwards() {
    switch (this.direction) {
      case 4: // Right
        this.x -= this.speed;
        break;
      case 1: // Up
        this.y += this.speed;
        break;
      case 2: // Left
        this.x += this.speed;
        break;
      case 3: // Bottom
        this.y -= this.speed;
        break;
    }
    this.moving = false;
  }

  moveForwards() {
    switch (this.direction) {
      case 4: // Right
        this.x += this.speed;
        break;
      case 1: // Up
        this.y -= this.speed;
        break;
      case 2: // Left
        this.x -= this.speed;
        break;
      case 3: // Bottom
        this.y += this.speed;
        break;
    }
    this.moving = true;
  }

  checkCollisions() {
    let isCollided = false;
    if (
      map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 1 ||
      map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize)] == 1 ||
      map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize + 0.9999)] == 1 ||
      map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize + 0.9999)] == 1
    ) {
      isCollided = true;
    }

    console.log("frente", map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize + 0.9999)] == 1);
    console.log("baixo", map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize + 0.9999)] == 1);
    console.log("atras", map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize)] == 1);
    console.log("frente", map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 1);

    return isCollided;
  }

  changeDirectionIfPossible() {
    // let tempDirection = this.direction;
    // this.direction = this.calculateNewDirection(map, parseInt(this.target.x / oneBlockSize), parseInt(this.target.y / oneBlockSize));
    // if (typeof this.direction == "undefined") {
    //   this.direction = tempDirection;
    //   return;
    // }
    // if (this.getMapY() != this.getMapYRightSide() && (this.direction == DIRECTION_LEFT || this.direction == DIRECTION_RIGHT)) {
    //   this.direction = DIRECTION_UP;
    // }
    // if (this.getMapX() != this.getMapXRightSide() && this.direction == DIRECTION_UP) {
    //   this.direction = DIRECTION_LEFT;
    // }
    // this.moveForwards();
    // if (this.checkCollisions()) {
    //   this.moveBackwards();
    //   this.direction = tempDirection;
    // } else {
    //   this.moveBackwards();
    // }
  }

  calculateNewDirection(map, destX, destY) {
    //   let mp = [];
    //   for (let i = 0; i < map.length; i++) {
    //     mp[i] = map[i].slice();
    //   }
    //   let queue = [
    //     {
    //       x: this.getMapX(),
    //       y: this.getMapY(),
    //       rightX: this.getMapXRightSide(),
    //       rightY: this.getMapYRightSide(),
    //       moves: [],
    //     },
    //   ];
    //   while (queue.length > 0) {
    //     let poped = queue.shift();
    //     if (poped.x == destX && poped.y == destY) {
    //       return poped.moves[0];
    //     } else {
    //       mp[poped.y][poped.x] = 1;
    //       let neighborList = this.addNeighbors(poped, mp);
    //       for (let i = 0; i < neighborList.length; i++) {
    //         queue.push(neighborList[i]);
    //       }
    //     }
    //   }
    //   return 1; // direction
  }

  addNeighbors(poped, mp) {
    // let queue = [];
    // let numOfRows = mp.length;
    // let numOfColumns = mp[0].length;
    // if (poped.x - 1 >= 0 && poped.x - 1 < numOfRows && mp[poped.y][poped.x - 1] != 1) {
    //   let tempMoves = poped.moves.slice();
    //   tempMoves.push(DIRECTION_LEFT);
    //   queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
    // }
    // if (poped.x + 1 >= 0 && poped.x + 1 < numOfRows && mp[poped.y][poped.x + 1] != 1) {
    //   let tempMoves = poped.moves.slice();
    //   tempMoves.push(DIRECTION_RIGHT);
    //   queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
    // }
    // if (poped.y - 1 >= 0 && poped.y - 1 < numOfColumns && mp[poped.y - 1][poped.x] != 1) {
    //   let tempMoves = poped.moves.slice();
    //   tempMoves.push(DIRECTION_UP);
    //   queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
    // }
    // if (poped.y + 1 >= 0 && poped.y + 1 < numOfColumns && mp[poped.y + 1][poped.x] != 1) {
    //   let tempMoves = poped.moves.slice();
    //   tempMoves.push(DIRECTION_BOTTOM);
    //   queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
    // }
    // return queue;
  }

  getMapX() {
    let mapX = parseInt(this.x / oneBlockSize);
    return mapX;
  }

  getMapY() {
    let mapY = parseInt(this.y / oneBlockSize);
    return mapY;
  }

  getMapXRightSide() {
    let mapX = parseInt((this.x * 0.99 + oneBlockSize) / oneBlockSize);
    return mapX;
  }

  getMapYRightSide() {
    let mapY = parseInt((this.y * 0.99 + oneBlockSize) / oneBlockSize);
    return mapY;
  }

  draw() {
    createRect(this.x, this.y, this.width, this.height, "red");
  }

  update() {
    this.moveProcess();
    this.draw();
  }
}
