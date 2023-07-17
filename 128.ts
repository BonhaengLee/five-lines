class Reader {
  private data: string[];
  private current: number;
  nextLine() {
    this.current++;
  }
  readLine() {
    return this.data[this.current] || null;
  }
}

// let br = new Reader();
// for (; br.readLine() !== null; br.nextLine()) {
//   let line = br.readLine();
//   console.log(line);
// }

// 구현을 통제할 수 없어 return을 분리할 수 없는 경우, 캐시를 사용할 수 있다.
// 모든 메서드에서 사용할 수 있고 부수적인 동작을 반환 부분과 분리할 수 있는 범용 캐시를 만들어보자.
class Cacher<T> {
  private data: T;
  constructor(private mutator: () => T) {
    this.data = this.mutator();
  }
  get() {
    return this.data;
  }
  next() {
    this.data = this.mutator();
  }
}

let tmpBr = new Reader();
let br = new Cacher(() => tmpBr.readLine());
for (; br.get() !== null; br.next()) {
  let line = br.get();
  console.log(line);
}
