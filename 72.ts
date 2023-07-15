// 임시
const database = {
  find: (to: string) => to,
  updateOne: (accountId: string, update: { $inc: { balance: number } }) => {
    console.log(accountId, update);
  },
};

// 계좌에서 돈 인출하고 다른 계좌에 입금하는 은행 거래를 두 부분으로 분할
// 그러나 실수로 deposit 메서드를 잘못 호출하면 출금 없이 돈을 입금할 수도 있다. 따라서 메서드 인라인화 진행
function transfer(from: string, to: string, amount: number) {
  // deposit(from, -amount);
  let fromAccountId = database.find(from);
  database.updateOne(fromAccountId, { $inc: { balance: -amount } });

  let toAccountId = database.find(to);
  database.updateOne(toAccountId, { $inc: { balance: amount } });
}
