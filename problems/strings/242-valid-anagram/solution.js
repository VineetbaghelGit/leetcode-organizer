/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = (s, t) => {
  if (s.length !== t.length) {
    return false
  }

  const charCount = {}

  // Count characters in s
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1
  }

  // Subtract characters in t
  for (const char of t) {
    if (!charCount[char]) {
      return false
    }
    charCount[char]--
  }

  return true
}

// Alternative solution using sorting
var isAnagramSort = (s, t) => s.split("").sort().join("") === t.split("").sort().join("")

// Time Complexity: O(n)
// Space Complexity: O(1) - at most 26 characters

// Test cases
console.log(isAnagram("anagram", "nagaram")) // true
console.log(isAnagram("rat", "car")) // false
