// 무언가 확인하는 것도 한가지 일이다.
// 따라서 함수에 if가 있는 경우 함수의 첫번째 항목이어야 한다.
// 그 후에는 아무것도 해서는 안된다. if문이 그 메서드가 하는 유일한 일이라는 것은
// 그 본문을 추출할 필요가 없으며, else문과 분리해서는 안된다는 뜻이다.
function isPrime(n: number) {
  for (let i = 2; i < n; i++) if (n % i === 0) return false;
  return n > 1;
}

// 적어도 두가지 일이 존재한다.
// 숫자를 반복한다, 숫자가 소수인지 확인한다.
function reportPrimes(n: number) {
  for (let i = 2; i < n; i++) if (isPrime(i)) console.log(`${i} is prime`);
}

function reportIfPrimes(n: number) {
  if (isPrime(n)) console.log(`${n} is prime`);
}
