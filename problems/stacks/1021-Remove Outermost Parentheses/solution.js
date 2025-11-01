/**
 * @param {string} s
 * @return {string}
 */

// Approach 1
var removeOuterParentheses = function (s) {
    let stack = []
    let ans = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(s[i])
            if (stack.length > 1) {
                ans = ans + s[i]
            }
        }
        else {
            if (stack.length > 1) {
                ans = ans + s[i]
            }
            stack.pop()

        }

    }
    return ans
};


// Approach 2
var removeOuterParentheses = function(s) {
    let level = 0
    let ans = ''
    for(let i=0; i<s.length; i++){
      if(s[i] ==='('){
        level++
        if(level > 1){
          ans  = ans + s[i] 
        }
      }
      else{
         if(level > 1){
          ans  = ans  + s[i] 
         level--
        }
        
      }
       
    }
    return ans
};