/**
 * @param {string[]} tokens
 * @return {number}
 */

// Approach 1

var evalRPN = function (tokens) {
    let stack = []

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] !== "+" && tokens[i] !== "-" && tokens[i] !== "*" && tokens[i] !== "/") {
            stack.push(Number(tokens[i]))
        }
        else {
            let prev1 = stack.pop()
            let prev2 = stack.pop()

            let operation
            switch (tokens[i]) {
                case '+':
                    operation = prev1 + prev2
                    break;
                case '-':
                    operation = prev2 - prev1
                    break;
                case '*':
                    operation = prev1 * prev2
                    break;
                case '/':
                    operation = Math.trunc(prev2 / prev1)
                    break;
                default:
                // code
            }
            stack.push(operation)
        }
    }

    return stack[0]
};