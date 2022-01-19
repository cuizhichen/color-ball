const makeMoney: () => number[] = () => {
  const moneySet = new Set<number>();

  while (moneySet.size < 6) {
    moneySet.add(Math.ceil(Math.random() * 33));
  }
  const sortMoney = Array.from(moneySet).sort((a, b) => a - b);
  sortMoney.push(Math.ceil(Math.random() * 16));

  return sortMoney;
};

export default makeMoney;
