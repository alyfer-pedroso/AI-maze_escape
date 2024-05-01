class Player {
  constructor(x, y, width, height, speed) {
    // this.x = x;
    // this.y = y;
    // this.width = width;
    // this.height = height;
    this.x = x + 5;
    this.y = y + 5;
    this.width = width - 10;
    this.height = height - 10;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.moving = false;
    this.ignore = false;
    this.prevX = x; // Rastreia a posição X anterior do jogador
    this.prevY = y;
  }

  moveProcess() {
    this.moveForwards();
    if (this.checkCollisions()) this.moveBackwards();
  }

  exit() {
    return map[this.y / oneBlockSize][this.x / oneBlockSize] == 3;
  }

  moveBackwards() {
    switch (this.direction) {
      case 4:
        this.direction = DIRECTION_BOTTOM;
        // setTimeout(() => (this.direction = DIRECTION_BOTTOM), 200);
        break;
      case 3:
        this.direction = DIRECTION_LEFT;
        // setTimeout(() => (this.direction = DIRECTION_LEFT), 200);
        break;
      case 2:
        this.direction = DIRECTION_UP;
        // setTimeout(() => (this.direction = DIRECTION_UP), 200);
        break;
      case 1:
        this.direction = DIRECTION_RIGHT;
        // setTimeout(() => (this.direction = DIRECTION_RIGHT), 200);
        break;
    }
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

  lastPos() {
    const lastX = this.x / this.width;
    const lastY = this.y / this.height;

    setTimeout(() => {
      switch (this.direction) {
        case 4: // right
          map[parseInt(lastY)][parseInt(lastX - 0.9999)] = 2;
          break;
        case 3: // down
          // map[parseInt(lastY - 0.9999)][parseInt(lastX)] = 2;
          break;
        case 2: // left
          // map[parseInt(lastY)][parseInt(lastX + 0.9999)] = 2;
          break;
        case 1: // up
          // map[parseInt(lastY + 0.9999)][parseInt(lastX)] = 2;
          break;
      }
    }, 180);
  }

  checkCollisionIn(map) {
    // Calcula as coordenadas dos blocos que o jogador está colidindo
    const topBlock = Math.floor(this.y / oneBlockSize);
    const bottomBlock = Math.floor((this.y + this.height) / oneBlockSize);
    const leftBlock = Math.floor(this.x / oneBlockSize);
    const rightBlock = Math.floor((this.x + this.width) / oneBlockSize);

    // Verifica a colisão nos quatro lados do jogador
    const topCollision =
      map[topBlock][leftBlock] === 1 || map[topBlock][rightBlock] === 1 || map[topBlock][leftBlock] === 2 || map[topBlock][rightBlock] === 2;
    const bottomCollision =
      map[bottomBlock][leftBlock] === 1 ||
      map[bottomBlock][rightBlock] === 1 ||
      map[bottomBlock][leftBlock] === 2 ||
      map[bottomBlock][rightBlock] === 2;
    const leftCollision =
      map[topBlock][leftBlock] === 1 || map[bottomBlock][leftBlock] === 1 || map[topBlock][leftBlock] === 2 || map[bottomBlock][leftBlock] === 2;
    const rightCollision =
      map[topBlock][rightBlock] === 1 || map[bottomBlock][rightBlock] === 1 || map[topBlock][rightBlock] === 2 || map[bottomBlock][rightBlock] === 2;

    return {
      top: topCollision,
      bottom: bottomCollision,
      left: leftCollision,
      right: rightCollision,
    };
  }

  checkCollisions() {
    const collisions = this.checkCollisionIn(map);
    let isCollided = false;
    console.log(collisions);
    if (collisions.left || collisions.right || collisions.top || collisions.bottom) {
      isCollided = true;
    }

    // switch (this.direction) {
    //   case 4: // right
    //     if (collisions.right) isCollided = true;
    //     break;
    //   case 3: // down
    //     if (collisions.bottom) isCollided = true;
    //     break;
    //   case 2: // left
    //     if (collisions.left) isCollided = true;
    //     break;
    //   case 1: // up
    //     if (collisions.top) isCollided = true;
    //     break;
    // }

    return isCollided;
  }

  isMovingOut() {
    return this.x !== this.prevX && this.y !== this.prevY;
  }

  // Coloca um bloco na última posição do jogador
  placeBlock() {
    let lastX = Math.floor((this.x + this.width / 2) / oneBlockSize);
    let lastY = Math.floor((this.y + this.height / 2) / oneBlockSize);

    if (map[lastY][lastX] === 0 && !this.checkCollisions() && this.isMovingOut()) {
      map[lastY][lastX] = 1;
    }
  }

  // Atualiza a posição anterior do jogador
  updatePrevPosition() {
    this.prevX = this.x;
    this.prevY = this.y;
  }

  draw() {
    createRect(this.x, this.y, this.width, this.height, "red");
  }

  update() {
    this.moveProcess();
    // this.updatePrevPosition();
    // this.placeBlock();
    this.draw();
    console.log("colide", this.checkCollisions());
  }
}
