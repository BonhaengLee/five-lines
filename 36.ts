function minimum(arr: number[][]) {
  let result = Number.POSITIVE_INFINITY;
  for (let x = 0; x < arr.length; x++)
    for (let y = 0; y < arr[x].length; y++) result = min(result, arr, x, y);

  return result;
}

function min(result: number, arr: number[][], x: number, y: number) {
  if (result > arr[x][y]) result = arr[x][y];
  return result;
}
// 규칙 : 호출 또는 전달 한 가지만 할 것.
// function average(arr: number[]) {
//   return sum(arr) / arr.length; // 높은 수준의 추상화와 낮은 수준의 arr.length
// }
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const size = (arr: number[]) => arr.length;
function average(arr: number[]) {
  return sum(arr) / size(arr);
}
