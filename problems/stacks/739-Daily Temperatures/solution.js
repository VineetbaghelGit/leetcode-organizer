/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  let stack = [];
  let n = temperatures.length;
  const ans = new Array(n).fill(0);
  stack.push(n - 1);
  ans[n - 1] = 0;

  for (let i = n - 2; i >= 0; i--) {
    while (stack.length) {
      const top = stack[stack.length - 1];
      if (temperatures[top] <= temperatures[i]) {
        stack.pop();
      } else {
        ans[i] = top - i;
        break;
      }
    }
    if (stack.length === 0) {
      ans[i] = 0;
    }
    stack.push(i);
  }
  return ans;
};
