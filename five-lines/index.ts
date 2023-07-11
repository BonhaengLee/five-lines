const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum Tile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}

// 3. enum 이름 변경(Input -> RawInput) 후 컴파일러가 발생시킨 오류 확인
// enum RawInput {
//   UP,
//   DOWN,
//   LEFT,
//   RIGHT,
// }

// 1. enum 값에 대한 메서드와 임시 인터페이스 도입
// 6. Input -> Input1으로 변경
interface Input {
  isRight(): boolean;
  isLeft(): boolean;
  isUp(): boolean;
  isDown(): boolean;
  // 4.1.4 - 2. 메서드 선언을 복사하고 약간 다른 이름으로 지정.
  handle(): void;
}
// 2. 4개의 enum 값에 대한 4개의 클래스 생성. 클래스에 해당하는 메서드를 제외하고 모두 false 반환
class Right implements Input {
  isRight() {
    return true;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  // 4.1.4 - 1. handleInput을 모든 클래스에 붙여 넣는다. input은 this로 바꾼다.
  // 4.1.4 - 4. handleInput -> handle로 변경(인터페이스에 반영된 이름)
  handle() {
    // 4.1.4 - 3. is메서드를 인라인하고, if(true)의 본문을 제외한 모든 걸 제거
    moveHorizontal(1);
  }
}

class Left implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  handle() {
    moveHorizontal(-1);
  }
}

class Up implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return true;
  }
  isDown() {
    return false;
  }
  handle() {
    moveVertical(-1);
  }
}

class Down implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return true;
  }
  handle() {
    moveVertical(1);
  }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let inputs: Input[] = [];

function remove(tile: Tile) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tile) {
        map[y][x] = Tile.AIR;
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = Tile.AIR;
  map[newy][newx] = Tile.PLAYER;
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  if (
    map[playery][playerx + dx] === Tile.FLUX ||
    map[playery][playerx + dx] === Tile.AIR
  ) {
    moveToTile(playerx + dx, playery);
  } else if (
    (map[playery][playerx + dx] === Tile.STONE ||
      map[playery][playerx + dx] === Tile.BOX) &&
    map[playery][playerx + dx + dx] === Tile.AIR &&
    map[playery + 1][playerx + dx] !== Tile.AIR
  ) {
    map[playery][playerx + dx + dx] = map[playery][playerx + dx];
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === Tile.KEY1) {
    remove(Tile.LOCK1);
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === Tile.KEY2) {
    remove(Tile.LOCK2);
    moveToTile(playerx + dx, playery);
  }
}

function moveVertical(dy: number) {
  if (
    map[playery + dy][playerx] === Tile.FLUX ||
    map[playery + dy][playerx] === Tile.AIR
  ) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === Tile.KEY1) {
    remove(Tile.LOCK1);
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === Tile.KEY2) {
    remove(Tile.LOCK2);
    moveToTile(playerx, playery + dy);
  }
}
// 이건 4줄처럼 보이지만 8줄이다. 어떻게 해결할까?
// 3번 번경으로 인한 컴파일러 오류 수정
// 1. handleInput을 모든 클래스에 붙여 넣는다. 지우는 게 아님.
// 4.1.4 - 4. handleInput 내용을 새로운 메서드 호출로 변경
function handleInput(input: Input) {
  input.handle();
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    handleInput(current);
  }
}

function updateTile(x: number, y: number) {
  if (
    (map[y][x] === Tile.STONE || map[y][x] === Tile.FALLING_STONE) &&
    map[y + 1][x] === Tile.AIR
  ) {
    map[y + 1][x] = Tile.FALLING_STONE;
    map[y][x] = Tile.AIR;
  } else if (
    (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX) &&
    map[y + 1][x] === Tile.AIR
  ) {
    map[y + 1][x] = Tile.FALLING_BOX;
    map[y][x] = Tile.AIR;
  } else if (map[y][x] === Tile.FALLING_STONE) {
    map[y][x] = Tile.STONE;
  } else if (map[y][x] === Tile.FALLING_BOX) {
    map[y][x] = Tile.BOX;
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x, y);
    }
  }
}

function update() {
  handleInputs();
  updateMap();
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === Tile.FLUX) g.fillStyle = '#ccffcc';
      else if (map[y][x] === Tile.UNBREAKABLE) g.fillStyle = '#999999';
      else if (map[y][x] === Tile.STONE || map[y][x] === Tile.FALLING_STONE)
        g.fillStyle = '#0000cc';
      else if (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX)
        g.fillStyle = '#8b4513';
      else if (map[y][x] === Tile.KEY1 || map[y][x] === Tile.LOCK1)
        g.fillStyle = '#ffcc00';
      else if (map[y][x] === Tile.KEY2 || map[y][x] === Tile.LOCK2)
        g.fillStyle = '#00ccff';

      if (map[y][x] !== Tile.AIR && map[y][x] !== Tile.PLAYER)
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = '#ff0000';
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function createGraphics() {
  let canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
  let g = canvas.getContext('2d');
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}
// 좋은 함수 이름의 속성
// 정직해야 한다. 의도를 설명해야 한다.
// 완전해야 한다. 함수가 하는 모든 걸 담는다.
// 도메인에서 일하는 사람이 이해할 수 있어야 한다.
function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  gameLoop();
};

const LEFT_KEY = 'ArrowLeft';
const UP_KEY = 'ArrowUp';
const RIGHT_KEY = 'ArrowRight';
const DOWN_KEY = 'ArrowDown';
window.addEventListener('keydown', (e) => {
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Right());
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down());
});
