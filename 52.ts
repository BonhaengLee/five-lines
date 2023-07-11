// 독립된 if문은 check로 간주
// if-else 문은 decision으로 간주
window.addEventListener('keydown', (e) => {
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(Input.LEFT);
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(Input.UP);
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(Input.RIGHT);
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(Input.DOWN);
});

function assertNotEmpty(ar: number[]) {
  if (size(ar) === 0) throw 'Empty array not allowed';
}

function average(ar: number[]) {
  assertNotEmpty(ar);
  return sum(ar) / size(ar);
}
