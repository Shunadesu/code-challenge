// using a For Loop
var sum_to_n_a = function(n) {
    // your code here
    n = Math.floor(n);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
console.log(sum_to_n_a(5)); // Output: 15

// using the formula for sum of first n natural numbers
var sum_to_n_b = function(n) {
    // your code here
    if (n <= 0) return 0;
    n = Math.floor(n);
    return (n * (n + 1)) / 2;
};

console.log(sum_to_n_b(5)); // Output: 15

// using recursion
var sum_to_n_c = function(n) {
    // your code here
    if (n <= 1) return n; // Base case
    n = Math.floor(n);
    return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_c(5)); // Output: 15