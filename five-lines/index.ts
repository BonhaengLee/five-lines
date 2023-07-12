const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
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

interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;

  color(g: CanvasRenderingContext2D): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  isEdible(): boolean;
  isPushable(): boolean;
  moveHorizontal(dx: number): void;
}

class Box implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][playerx + dx].isAir()
    ) {
      // map[playery][playerx + dx + dx] = this;
      moveToTile(playerx + dx, playery);
    }
  }
}

class Key1 implements Tile {
  isKey1() {
    return true;
  }
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }

  moveHorizontal(dx: number) {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
}

class Lock1 implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {}
}

class Key2 implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
}

class Flux implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ccffcc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ccffcc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {}
}

class FallingStone implements Tile {
  isAir() {
    return true;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return true;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {}
}

class Stone implements Tile {
  isAir() {
    return true;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return true;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {}
}
class FallingBox implements Tile {
  isAir() {
    return true;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return true;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {}
}

class Player implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return true;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {}
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

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  if (
    map[playery + dy][playerx].isFlux() ||
    map[playery + dy][playerx].isAir()
  ) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey1()) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey2()) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
}
// 이건 4줄처럼 보이지만 8줄이다. 어떻게 해결할까?
// 3번 번경으로 인한 컴파일러 오류 수정
// 1. handleInput을 모든 클래스에 붙여 넣는다. 지우는 게 아님.
// 4.1.4 - 4. handleInput 내용을 새로운 메서드 호출로 변경
function handleInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();
    input.handle();
  }
}

function updateTile(x: number, y: number) {
  if (
    (map[y][x].isStone() || map[y][x].isFallingStone()) &&
    map[y + 1][x] === new Air()
  ) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if (
    (map[y][x].isBox() || map[y][x].isFallingBox()) &&
    map[y + 1][x].isAir()
  ) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone();
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new Box();
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

function drawTile(g: CanvasRenderingContext2D, x: number, y: number) {
  map[y][x].color(g);

  if (!map[y][x].isAir() && !map[y][x].isPlayer())
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
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
