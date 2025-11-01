/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// Approach 1
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let negMap = {};
  let n = nums2.length;
  stack.push(nums2[n - 1]);
  negMap[nums2[n - 1]] = -1;

  for (let i = n - 2; i >= 0; i--) {
    let top = stack[stack.length - 1];
    if (nums2[i] < top) {
      negMap[nums2[i]] = top;
    } else {
      while (stack.length) {
        if (stack[stack.length - 1] < nums2[i]) {
          stack.pop();
        } else {
          negMap[nums2[i]] = stack[stack.length - 1];
          break;
        }
      }
      if (stack.length === 0) {
        negMap[nums2[i]] = -1;
      }
    }
    stack.push(nums2[i]);
  }

  let ans = [];
  for (let i = 0; i < nums1.length; i++) {
    ans.push(negMap[nums1[i]]);
  }
  return ans;
};

// Approach 2
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let negMap = {};
  let n = nums2.length;
  stack.push(nums2[n - 1]);
  negMap[nums2[n - 1]] = -1;

  for (let i = n - 2; i >= 0; i--) {
    while (stack.length) {
      if (stack[stack.length - 1] < nums2[i]) {
        stack.pop();
      } else {
        negMap[nums2[i]] = stack[stack.length - 1];
        break;
      }
    }
    if (stack.length === 0) {
      negMap[nums2[i]] = -1;
    }
    stack.push(nums2[i]);
  }
  return nums1.map((x) => negMap[x]);
};
