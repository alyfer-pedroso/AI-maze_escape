const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const DIRECTION_RIGHT = 4;
const DIRECTION_BOTTOM = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_UP = 1;
const oneBlockSize = 35;
const wallSpaceWidth = oneBlockSize / 1.6;
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
const wallInnerColor = "black";

let lastPoss = [];

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const createRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawWalls = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 1) {
        createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, "#3AADCA");
        if (j > 0 && map[i][j - 1] == 1) {
          createRect(j * oneBlockSize, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);
        }

        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);
        }

        if (i < map.length - 1 && map[i + 1][j] == 1) {
          createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);
        }

        if (i > 0 && map[i - 1][j] == 1) {
          createRect(j * oneBlockSize + wallOffset, i * oneBlockSize, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);
        }
      }
      if (map[i][j] == 2) {
        createRect(j * oneBlockSize + oneBlockSize / 3, i * oneBlockSize + oneBlockSize / 3, oneBlockSize / 3, oneBlockSize / 3, "#FEB897");
      }
    }
  }
};

let player = new Player(0, oneBlockSize * 6, oneBlockSize, oneBlockSize, oneBlockSize / 7);

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createRect(0, 0, canvas.width, canvas.height, "black");
  drawWalls();

  // if (lastPoss.length > 0) {
  //   lastPoss.forEach((pos) => {
  //     pos.draw();
  //   });
  // }

  let posX = player.x;
  let posY = player.y;

  if (player.moving) lastPoss.push(new lastPos(posX, posY));

  // if (player.moving) player.drawCircle();
  player.update();
};
gameInterval = setInterval(gameLoop, 1000 / 30);
