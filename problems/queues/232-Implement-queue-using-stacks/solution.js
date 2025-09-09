
var MyQueue = function () {
    this.S1 = []
    this.S2 = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.S1.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    if (this.S2.length === 0) {
        while (this.S1.length > 0) {
            this.S2.push(this.S1.pop())
        }
    }
    return this.S2.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {

  if(this.S2.length === 0){
    while(this.S1.length>0){
        this.S2.push(this.S1.pop())
    }
  }
  return this.S2[this.S2.length-1]

};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.S1.length === 0 && this.S2.length === 0;
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */