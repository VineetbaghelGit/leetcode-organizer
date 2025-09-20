/**
 * @param {string} s
 * @return {boolean}
 */
// Approach 1

var isValid = function (s) {
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '{' || s[i] === '(' || s[i] === '[') {
            stack.push(s[i])
        }
        else {
            let top = stack.pop()
            if (!top || (top === '{' && s[i] !== '}') || (top === '(' && s[i] !== ')') || (top === '[' && s[i] !== ']')) {
                return false
            }
        }
    }
    return stack.length === 0
};

// Approach 2
var isValid = function (s) {
    let stack = []
    let map ={
        "{":"}",
        "(":")",
        "[":']'
    }
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            stack.push(s[i])
        }
        else {
            let top = stack.pop()
            if (!top || s[i] !== map[top]) {
                return false
            }
        }
    }
    return stack.length === 0
};