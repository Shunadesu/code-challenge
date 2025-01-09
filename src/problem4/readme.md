While my primary role is front-end development, I understand that this specific task, implementing the sum_to_n function, is typically associated with back-end development. However, I am capable of completing this task effectively.

## **1. Iterative Approach**

```typescript
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

### **Complexity**

- **Time Complexity:** \(O(n)\) - Iterates through numbers from 1 to `n`.
- **Space Complexity:** \(O(1)\) - Uses a single variable to store the sum.

### **Efficiency**

- Straightforward and efficient for small to moderately large values of `n`.
- May be slower for very large values of `n` due to linear iteration.

---

## **2. Mathematical Formula**

```typescript
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
```

### **Complexity**

- **Time Complexity:** \(O(1)\) - Performs a constant number of operations.
- **Space Complexity:** \(O(1)\) - No additional memory usage.

### **Efficiency**

- Most efficient implementation since it calculates the result in constant time.
- Ideal for large values of `n`, as it avoids iteration altogether.

---

## **3. Recursive Approach**

```typescript
function sum_to_n_c(n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}
```

### **Complexity**

- **Time Complexity:** \(O(n)\) - Makes `n` recursive calls.
- **Space Complexity:** \(O(n)\) - Each recursive call adds a frame to the call stack.

### **Efficiency**

- Elegant but less efficient due to recursive overhead.
- May cause stack overflow for very large values of `n`.

---

## **Comparison**

| **Approach** | **Time Complexity** | **Space Complexity** | **Efficiency for Large `n`** |
| ------------ | ------------------- | -------------------- | ---------------------------- |
| Iterative    | \(O(n)\)            | \(O(1)\)             | Moderate                     |
| Mathematical | \(O(1)\)            | \(O(1)\)             | Best                         |
| Recursive    | \(O(n)\)            | \(O(n)\)             | Poor (due to stack usage)    |
