## **Implementation Details**

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
```

- `WalletBalance`: Represents the raw data for each wallet balance.
- `FormattedWalletBalance`: Extends `WalletBalance` with additional fields for display.
- `Props`: Extends `BoxProps` for flexibility in component usage.

```typescript
const priorityMap: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};
```

// Moved `getPriority` outside the useMemo hook for better reusability and to prevent it from being recreated on every render.

```typescript
const getPriority = (blockchain: string): number =>
  priorityMap[blockchain] ?? -99;
```

// Combined filtering, formatting, and sorting into a single useMemo hook to minimize redundant operations and improve performance.

```typescript
const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
  return balances
    .filter((balance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0; // Only positive and invited blockchains allowed
    })
    .map((balance) => {
      const usdValue = (prices[balance.currency] || 0) * balance.amount;
      return {
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue,
      };
    })
    .sort(
      (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
    );
}, [balances, prices]);
```

// Refactored `rows` to directly map over `formattedBalances` and ensure unique keys for React reconciliation.

```typescript
const rows = formattedBalances.map((balance) => (
  <WalletRow
    className="row"
    key={balance.currency} // Using something unique as key
    amount={balance.amount}
    usdValue={balance.usdValue}
    formattedAmount={balance.formatted}
  />
));
```

// Simplified return statement by rendering `rows` directly within the container.

```typescript
return <div {...rest}>{rows}</div>;
```
