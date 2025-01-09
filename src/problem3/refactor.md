```typescript
interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}

const priorityMap: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number =>
  priorityMap[blockchain] ?? -99;

const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
  return balances
    .filter(
      (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
    )
    .map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
      usdValue: (prices[balance.currency] || 0) * balance.amount,
    }))
    .sort(
      (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
    );
}, [balances, prices]);

const rows = formattedBalances.map((balance) => (
  <WalletRow
    className="row"
    key={balance.currency}
    amount={balance.amount}
    usdValue={balance.usdValue}
    formattedAmount={balance.formatted}
  />
));

return <div {...rest}>{rows}</div>;
```
