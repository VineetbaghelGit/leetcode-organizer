# LeetCode Problem Organizer

A simple HTML/CSS/JS project to organize and review your LeetCode practice problems.

## Features

- 📁 Organize problems by concepts (arrays, strings, linked lists, etc.)
- 📝 View problem descriptions in markdown format
- 💡 Review your JavaScript solutions with syntax highlighting
- 🔄 Clean, responsive UI with easy navigation
- 📱 Mobile-friendly design

## Folder Structure

Create your problems in the following structure:

\`\`\`
problems/
├── arrays/
│   ├── two-sum/
│   │   ├── question.md
│   │   └── solution.js
│   └── best-time-to-buy-sell-stock/
│       ├── question.md
│       └── solution.js
├── strings/
│   └── valid-anagram/
│       ├── question.md
│       └── solution.js
└── linked-lists/
    └── reverse-linked-list/
        ├── question.md
        └── solution.js
\`\`\`

## How to Use

1. Open `index.html` in your browser
2. Create concept folders in the `problems/` directory
3. For each problem, create a folder with:
   - `question.md` - Problem description and examples
   - `solution.js` - Your JavaScript solution
4. Click on concepts to expand and view problems
5. Click on problems to view the question and solution

## Sample Data

The project comes with sample problems to demonstrate the structure:
- **Arrays**: Two Sum, Best Time to Buy and Sell Stock
- **Strings**: Valid Anagram  
- **Linked Lists**: Reverse Linked List

## Technologies Used

- HTML5
- CSS3 with Flexbox and Grid
- Vanilla JavaScript
- Marked.js for markdown parsing
- Prism.js for syntax highlighting

## Customization

- Modify the color scheme in `styles.css`
- Add new concept categories by creating folders
- Extend functionality in `script.js`
- Add more sample problems following the existing format
