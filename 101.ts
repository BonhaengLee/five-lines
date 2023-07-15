interface A {
  m1(): void;
}
// 실제로 사용되지 않은 메서드가
class B implements A {
  m1() {
    console.log('m1');
  }
}
let a = new B();
a.m1();
