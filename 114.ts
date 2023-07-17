import { Car, TrafficColor } from './types';

function nextColor(t: TrafficColor) {
  if (t.color() === 'red') return new Red('green');
  else if (t.color() === 'green') return new Red('yellow');
  else if (t.color() === 'yellow') return new Red('red');
}

class Red implements TrafficColor {
  constructor(private col: string) {}
  // 기준 메서드는 color인데 클래스마다 다른 상수를 반환하므로 check 메서드를 동일하게 만든다.
  color() {
    return this.col;
  }
  check(car: Car) {
    if (this.color() === 'red') {
      car.stop();
    } else if (this.color() === 'yellow') {
      car.stop();
    } else if (this.color() === 'green') {
      car.drive();
    }
  }
}
