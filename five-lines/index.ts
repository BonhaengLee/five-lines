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
  moveVertical(dy: number): void;
  isStony(): boolean;
  isBoxy(): boolean;
  isFalling(): boolean;
  drop(): void;
  rest(): void;
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(title: Tile, dx: number): void;
}

class Falling implements FallingState {
  isFalling() {
    return true;
  }
  moveHorizontal(title: Tile, dx: number) {}
}

class Resting implements FallingState {
  isFalling() {
    return false;
  }
  moveHorizontal(tile: Tile, dx: number) {
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][playerx + dx].isAir()
    ) {
      map[playery][playerx + dx + dx] = tile;
      moveToTile(playerx + dx, playery);
    }
  }
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isFlux() {
    return false;
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
    return true;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ccffcc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ccffcc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return true;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
}

class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return true;
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#999999';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#999999';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
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
    return false;
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
}

class Stone implements Tile {
  // 생성자 매개변수 앞에 public 또는 private 키워드를 넣으면 자동으로 인스턴스 변수를 만들고 인자의 값을 할당한다.
  constructor(private falling: FallingState) {
    this.falling = falling;
  }

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
    return false;
  }
  isStone() {
    return true;
  }
  isFallingStone() {
    return this.falling.isFalling();
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#0000cc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#0000cc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {
    this.falling.moveHorizontal(this, dx);
  }
  moveVertical(dy: number) {}
  isStony() {
    return true;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return this.falling.isFalling();
  }
  drop() {
    this.falling = new Falling();
  }
  rest() {
    this.falling = new Resting();
  }
}

class Box implements Tile {
  constructor(private falling: FallingState) {
    this.falling = falling;
  }

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
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return true;
  }
  isFallingBox() {
    return this.falling.isFalling();
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#8b4513';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#8b4513';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {
    this.falling.moveHorizontal(this, dx);
  }
  moveVertical(dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return true;
  }
  isFalling() {
    return this.falling.isFalling();
  }
  drop() {}
  rest() {}
}

class Key1 implements Tile {
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
    return true;
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ffcc00';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
}

class Lock1 implements Tile {
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
    return true;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ffcc00';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
}

class Key2 implements Tile {
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
    return true;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#00ccff';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#00ccff';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
}

class Lock2 implements Tile {
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
    return true;
  }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#00ccff';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#00ccff';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
  moveHorizontal(dx: number) {}
  moveVertical(dy: number) {}
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isFalling() {
    return false;
  }
  drop() {}
  rest() {}
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
    map[playery][playerx + 1].moveHorizontal(1);
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
    map[playery][playerx + -1].moveHorizontal(-1);
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
    map[playery + -1][playerx].moveVertical(-1);
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
    map[playery + 1][playerx].moveVertical(1);
  }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][];
function assertExhausted(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.STONE:
      return new Stone(new Falling());
    case RawTile.FALLING_STONE:
      return new Stone(new Resting());
    case RawTile.BOX:
      return new Box(new Resting());
    case RawTile.FALLING_BOX:
      return new Box(new Falling());
    case RawTile.KEY1:
      return new Key1();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

window.onload = () => {
  // 컴파일 가능해짐.
  transformMap();
  gameLoop();
};

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      //특정 인스턴스인지를 확인하지 않고 있다.
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      //특정 인스턴스인지를 확인하지 않고 있다.
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

// 이건 4줄처럼 보이지만 8줄이다. 어떻게 해결할까?
// 3번 번경으로 인한 컴파일러 오류 수정
// 1. handleInput을 모든 클래스에 붙여 넣는다. 지우는 게 아님.
// 4.1.4 - 4. handleInput 내용을 새로운 메서드 호출로 변경
function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

function updateTile(x: number, y: number) {
  if (
    (map[y][x].isStony() && map[y + 1][x].isAir()) ||
    (map[y][x].isBoxy() && map[y + 1][x].isAir())
  ) {
    map[y][x].drop();
    map[y + 1][x] = map[y][x];

    map[y][x] = new Air();
  } else if (map[y][x].isFalling()) {
    map[y][x].rest();
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
