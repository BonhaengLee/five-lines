// 전문화된 메서드는 더 적은 위치에서 호출되어 필요성이 없어지면 더 빨리 제거할 수 있다.
// 임시
interface Tile {
  x: number;
  y: number;
}

function canMove(start: Tile, end: Tile, dx: number, dy: number) {
  return (
    dx * Math.abs(start.x - end.x) === dy * Math.abs(start.y - end.y) ||
    dy * Math.abs(start.x - end.x) === dx * Math.abs(start.y - end.y)
  );
}

// rook은 어차피 dx가 1이고, dy가 0이다.
function rookCanMove(start: Tile, end: Tile) {
  return Math.abs(start.x - end.x) === 0 || 0 === Math.abs(start.y - end.y);
}

const start = { x: 0, y: 0 };
const end = { x: 1, y: 2 };

// ...
// x가 0이거나 y가 0이면 룩이 이동할 수 있다. 더 단순화하려면 abs 제거도 가능하다.
if (rookCanMove(start, end))
  if (canMove(start, end, 1, 1))
    if (canMove(start, end, 1, 2)) {
      //룩
      //비숍
    } //나이트
