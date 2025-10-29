class LeetCodeOrganizer {
  constructor() {
    this.currentConcept = null;
    this.currentView = "welcome"; // Track current view state
    this.problems = {};
    this.allProblems = []; // Flattened list for search
    this.searchTimeout = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadProblemsFromFileSystem();
  }

  bindEvents() {
    document.getElementById("back-btn").addEventListener("click", () => {
      this.goBackToConcept();
    });

    document
      .getElementById("concept-back-btn")
      .addEventListener("click", () => {
        this.showWelcomeScreen();
      });

    document.getElementById("search-back-btn").addEventListener("click", () => {
      this.showWelcomeScreen();
    });

    // Tab switching for file tabs
    document.addEventListener("click", (e) => {
      if (e.target.closest(".tab-btn")) {
        const tabBtn = e.target.closest(".tab-btn");
        const tabName = tabBtn.dataset.tab;
        if (tabName) {
          this.switchTab(tabName);
        }
      }
    });

    document.getElementById("search-input").addEventListener("input", (e) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.handleSearch(e.target.value.trim());
      }, 300);
    });
  }

  async loadProblemsFromFileSystem() {
    try {
      const conceptFolders = ["strings", "queues", 'stacks'];

      for (const concept of conceptFolders) {
        try {
          this.problems[concept] = {};
          const commonProblems = await this.getProblemsForConcept(concept);

          for (const problemFolder of commonProblems) {
            try {
              const questionResponse = await fetch(
                `problems/${concept}/${problemFolder}/question.md`
              );
              const solutionResponse = await fetch(
                `problems/${concept}/${problemFolder}/solution.js`
              );

              if (questionResponse.ok && solutionResponse.ok) {
                const questionText = await questionResponse.text();
                const solutionText = await solutionResponse.text();

                this.problems[concept][problemFolder] = {
                  question: questionText,
                  solution: solutionText,
                };

                this.allProblems.push({
                  concept,
                  problemKey: problemFolder,
                  title: this.formatProblemName(problemFolder),
                  searchText: `${problemFolder} ${this.formatProblemName(
                    problemFolder
                  )} ${questionText}`.toLowerCase(),
                });
              }
            } catch (error) {
              console.log(
                `[v0] Could not load problem ${problemFolder} in ${concept}:`,
                error
              );
            }
          }
        } catch (error) {
          console.log(`[v0] Could not load concept ${concept}:`, error);
        }
      }

      this.renderConceptList();
    } catch (error) {
      console.error("[v0] Error loading problems from file system:", error);
      // Fallback to empty structure
      this.problems = {};
      this.renderConceptList();
    }
  }

  async getProblemsForConcept(concept) {
    const knownProblems = {
      strings: ["242-valid-anagram"],
      queues: ["232-Implement-queue-using-stacks"],
      stacks:['20-Valid Parentheses','155-Min Stack','1021-Remove Outermost Parentheses']
    };

    return knownProblems[concept] || [];
  }

  handleSearch(query) {
    if (!query) {
      this.showWelcomeScreen();
      return;
    }

    const results = this.searchProblems(query);
    this.showSearchResults(results, query);
  }

  searchProblems(query) {
    const queryLower = query.toLowerCase();

    return this.allProblems.filter((problem) => {
      // Search by problem number (e.g., "232", "1", "121")
      const problemNumber = problem.problemKey.split("-")[0];
      if (problemNumber === queryLower) {
        return true;
      }

      // Search in title and content
      return problem.searchText.includes(queryLower);
    });
  }

  showSearchResults(results, query) {
    this.currentView = "search";

    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("concept-view").style.display = "none";
    document.getElementById("problem-view").style.display = "none";
    document.getElementById("search-results").style.display = "block";

    const list = document.getElementById("search-results-list");
    list.innerHTML = "";

    if (results.length === 0) {
      list.innerHTML = `<div class="error">No problems found for "${query}"</div>`;
      return;
    }

    results.forEach((result) => {
      const problemItem = document.createElement("div");
      problemItem.className = "problem-item";

      const problemNumber = result.problemKey.split("-")[0];
      const problemName = result.title;

      problemItem.innerHTML = `
        <h3><span class="problem-number">${problemNumber}.</span> ${problemName}</h3>
        <p>From ${this.formatConceptName(
          result.concept
        )} • Click to view problem</p>
      `;

      problemItem.addEventListener("click", () => {
        this.showProblem(result.concept, result.problemKey);
      });

      list.appendChild(problemItem);
    });
  }

  switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.remove("active");
    });
    document.getElementById(`${tabName}-tab`).classList.add("active");
  }

  goBackToConcept() {
    if (this.currentConcept && this.currentView === "problem") {
      this.showConceptView(this.currentConcept);
    } else {
      this.showWelcomeScreen();
    }
  }

  showConceptView(concept) {
    this.currentConcept = concept;
    this.currentView = "concept";

    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("problem-view").style.display = "none";
    document.getElementById("concept-view").style.display = "block";

    document.getElementById("concept-title").textContent =
      this.formatConceptName(concept);

    this.renderProblemsList(concept);
  }

  renderConceptList() {
    const conceptList = document.getElementById("concept-list");
    conceptList.innerHTML = "";

    Object.keys(this.problems).forEach((concept) => {
      const conceptItem = document.createElement("div");
      conceptItem.className = "concept-item";

      conceptItem.textContent = this.formatConceptName(concept);

      conceptItem.addEventListener("click", () => {
        document
          .querySelectorAll(".concept-item")
          .forEach((item) => item.classList.remove("active"));
        conceptItem.classList.add("active");
        this.showConceptView(concept);
      });

      conceptList.appendChild(conceptItem);
    });
  }

  renderProblemsList(concept) {
    const list = document.getElementById("problems-list");
    list.innerHTML = "";

    const problems = this.problems[concept];
    if (Object.keys(problems).length === 0) {
      list.innerHTML =
        '<div class="error">No problems found in this concept folder.</div>';
      return;
    }

    Object.keys(problems).forEach((problemKey) => {
      const problemItem = document.createElement("div");
      problemItem.className = "problem-item";

      const problemNumber = problemKey.split("-")[0];
      const problemName = this.formatProblemName(
        problemKey.substring(problemKey.indexOf("-") + 1)
      );

      problemItem.innerHTML = `
        <h3><span class="problem-number">${problemNumber}.</span> ${problemName}</h3>
        <p>Click to view problem description and solution</p>
      `;

      problemItem.addEventListener("click", () => {
        this.showProblem(concept, problemKey);
      });

      list.appendChild(problemItem);
    });
  }

  showProblem(concept, problemKey) {
    this.currentView = "problem";
    const problem = this.problems[concept][problemKey];

    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("concept-view").style.display = "none";
    document.getElementById("problem-view").style.display = "block";

    document.getElementById("search-results").style.display = "none"; // ✅ Add this
    document.getElementById("problem-title").textContent =
      this.formatProblemName(problemKey);
    document.getElementById("breadcrumb-concept").textContent =
      this.formatConceptName(concept);

    // Load question content
    if (problem.question) {
      document.getElementById("question-content").innerHTML =
        this.parseMarkdown(problem.question);
    } else {
      document.getElementById("question-content").innerHTML =
        '<div class="error">⚠️ File not found: question.md</div>';
    }

    // Load solution content
    if (problem.solution) {
      document.getElementById(
        "solution-content"
      ).innerHTML = `<pre><code class="language-javascript">${this.escapeHtml(
        problem.solution
      )}</code></pre>`;
    } else {
      document.getElementById("solution-content").innerHTML =
        '<div class="error">⚠️ File not found: solution.js</div>';
    }

    // Highlight code
    this.highlightCode();

    // Reset to question tab
    this.switchTab("question");
  }

  formatConceptName(concept) {
    return concept
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  formatProblemName(problem) {
    return problem
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  parseMarkdown(text) {
    const marked = window.marked;
    return marked.parse(text);
  }

  highlightCode() {
    const Prism = window.Prism;
    Prism.highlightAll();
  }

  showWelcomeScreen() {
    this.currentView = "welcome";
    this.currentConcept = null;
    document
      .querySelectorAll(".concept-item")
      .forEach((item) => item.classList.remove("active"));
    document.getElementById("problem-view").style.display = "none";
    document.getElementById("concept-view").style.display = "none";
    document.getElementById("search-results").style.display = "none";
    document.getElementById("welcome-screen").style.display = "block";

    document.getElementById("search-input").value = "";
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  new LeetCodeOrganizer();
});
