// 임시
class Bill {}

class Account {
  getBalance(): number {
    return 0;
  }

  pay(bill: Bill): void {
    // ...
  }
}

class Invoice {
  getAmount(): number {
    return 0;
  }
  isLastDayOfPayment(): boolean {
    return false;
  }
  isApproved(): boolean {
    return false;
  }
}

const today = new Date();
const account = new Account();
const invoice = new Invoice();
const bill = new Bill();

if (
  (today.getDate() === 1 && account.getBalance() > invoice.getAmount()) ||
  (invoice.isLastDayOfPayment() && invoice.isApproved())
) {
  account.pay(bill);
}
