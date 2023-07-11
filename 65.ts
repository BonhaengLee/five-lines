interface TrafficLight {
  isRed(): boolean;
  isYellow(): boolean;
  isGreen(): boolean;
  udpateCar(): void;
}
// 모든 값에 대한 메서드를 갖는 건 스멜이고, is가 붙은 메서드 대부분이 일시적인 것이다.
class Red implements TrafficLight {
  isRed() {
    return true;
  }
  isYellow() {
    return false;
  }
  isGreen() {
    return false;
  }
  updateCar() {
    car.stop();
  }
}

class Yellow implements TrafficLight {
  isRed() {
    return false;
  }
  isYellow() {
    return true;
  }
  isGreen() {
    return false;
  }
  updateCar() {
    car.drive();
  }
}

class Green implements TrafficLight {
  isRed() {
    return false;
  }
  isYellow() {
    return false;
  }
  isGreen() {
    return true;
  }
  updateCar() {
    car.drive();
  }
}

const CYCLE = [new Red(), new Yellow(), new Green()];
function updateCarForLight(current: TrafficLight) {
  current.udpateCar();
}
