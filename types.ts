export interface Car {
  color: string;
  drive(): void;
  stop(): void;
}

export interface TrafficColor {
  color(): string;
  check(car: Car): void;
}
