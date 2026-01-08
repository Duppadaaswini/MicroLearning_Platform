import { LessonData, QuizQuestion } from "../contexts/ProgressContext";

// Mock AI Lesson Generation
export const generateMicroLesson = async (
  topicId: string,
): Promise<LessonData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lessons: Record<string, LessonData> = {
    arrays: {
      topicId: "arrays",
      topicName: "Arrays",
      content: `Arrays are one of the most fundamental data structures in programming. An array is a collection of elements stored in contiguous memory locations, allowing you to store multiple values of the same type under a single variable name.

Key concepts:
- Zero-based indexing: The first element is at index 0
- Fixed or dynamic size: Some languages allow fixed sizes, others are dynamic
- Access time: O(1) for accessing elements by index
- Insertion/Deletion: Can be O(n) if you need to shift elements

Arrays are used everywhere in programming - from storing user data to implementing complex algorithms. Understanding arrays is crucial for solving most coding problems efficiently.`,
      examples: [
        "Python: my_array = [1, 2, 3, 4, 5]",
        'JavaScript: const arr = ["apple", "banana", "cherry"]',
        "Java: int[] numbers = {10, 20, 30, 40, 50}",
      ],
      tips: [
        "Use arrays when you need fast random access to elements",
        "Be careful with array bounds to avoid index out of range errors",
        "Consider using dynamic arrays (lists) when size is unknown",
        "Learn about multidimensional arrays for matrices and grids",
      ],
    },
    python: {
      topicId: "python",
      topicName: "Python Basics",
      content: `Python is one of the most beginner-friendly programming languages. It emphasizes readability and simplicity, making it perfect for learning programming concepts.

Core concepts:
- Variables: Store data in memory with meaningful names
- Data types: int, float, str, bool, list, dict, tuple, set
- Control flow: if/else statements, loops (for, while)
- Functions: Reusable blocks of code
- Modules: Import and use external libraries

Python's simple syntax allows you to focus on problem-solving rather than fighting with language syntax. It's used in web development, data science, AI/ML, and automation.`,
      examples: [
        'Variables: x = 10, name = "John"',
        'Lists: fruits = ["apple", "banana", "orange"]',
        "Loop: for i in range(5): print(i)",
      ],
      tips: [
        "Use meaningful variable names for clarity",
        "Indentation is crucial in Python - it defines code blocks",
        "Use pip to install packages and libraries",
        "Virtual environments keep your projects organized",
      ],
    },
    ai: {
      topicId: "ai",
      topicName: "AI Fundamentals",
      content: `Artificial Intelligence (AI) is transforming the world. It's the simulation of human intelligence by machines, enabling computers to learn from experience and perform tasks that typically require human intelligence.

Key areas:
- Machine Learning (ML): Systems that learn from data
- Deep Learning (DL): Neural networks with multiple layers
- Natural Language Processing (NLP): Understanding human language
- Computer Vision: Processing and analyzing images
- Reinforcement Learning: Learning through trial and error

AI applications range from recommendation systems, autonomous vehicles, medical diagnosis, to personal assistants like ChatGPT.`,
      examples: [
        "Supervised Learning: Training on labeled data",
        "Unsupervised Learning: Finding patterns in unlabeled data",
        "Transfer Learning: Using pre-trained models for new tasks",
      ],
      tips: [
        "Start with understanding basic probability and statistics",
        "Practice with datasets from Kaggle",
        "Learn libraries like TensorFlow, PyTorch, and Scikit-learn",
        "Understand the ethical implications of AI",
      ],
    },
    math: {
      topicId: "math",
      topicName: "Math Essentials",
      content: `Mathematics is the foundation of computer science and programming. Understanding mathematical concepts helps you write efficient algorithms and solve complex problems.

Essential topics:
- Algebra: Variables, equations, and solving for unknowns
- Geometry: Shapes, coordinates, and spatial relationships
- Calculus: Rates of change and optimization
- Linear Algebra: Vectors, matrices, and transformations
- Discrete Math: Logic, set theory, and combinatorics

From calculating algorithmic complexity to machine learning, math is everywhere in programming.`,
      examples: [
        "Fibonacci sequence: f(n) = f(n-1) + f(n-2)",
        "Linear equations: y = mx + b",
        "Matrix multiplication for graphics and ML",
      ],
      tips: [
        "Practice problems to build intuition",
        "Understand Big O notation for algorithm analysis",
        "Learn about logarithms for understanding complexity",
        "Matrix math is essential for AI and graphics",
      ],
    },
    web: {
      topicId: "web",
      topicName: "Web Development",
      content: `Web development is building applications for the internet. It involves creating the user interface (Frontend) and the server logic (Backend) that powers websites and web applications.

Components:
- HTML: Structure and semantics
- CSS: Styling and layout
- JavaScript: Interactivity and logic
- Backend: Server-side logic and databases
- APIs: Communication between frontend and backend

The web stack has evolved significantly with frameworks like React, Vue, Angular making frontend development more efficient.`,
      examples: [
        "HTML: <button>Click me</button>",
        "CSS: button { background-color: blue; }",
        'JavaScript: document.querySelector("button").addEventListener("click", () => {})',
      ],
      tips: [
        "Master semantic HTML for better SEO and accessibility",
        "Use CSS Grid and Flexbox for responsive layouts",
        "Learn asynchronous programming with async/await",
        "Understand the request-response cycle",
      ],
    },
    database: {
      topicId: "database",
      topicName: "Databases",
      content: `Databases are systems for storing, organizing, and retrieving data efficiently. They're crucial for any application that needs to persist data.

Types:
- Relational (SQL): Structured data with tables and relationships
- NoSQL: Flexible schema (documents, key-value, graphs)
- Time-series: Optimized for time-based data
- Search: Full-text search capabilities

Understanding databases helps you design scalable applications that can handle large amounts of data efficiently.`,
      examples: [
        "SQL: SELECT * FROM users WHERE age > 18",
        "MongoDB: db.users.find({ age: { $gt: 18 } })",
        "Indexes: CREATE INDEX idx_age ON users(age)",
      ],
      tips: [
        "Normalize your database schema to reduce redundancy",
        "Use indexes to improve query performance",
        "Understand transactions and ACID properties",
        "Learn about database optimization and query planning",
      ],
    },
    react: {
      topicId: "react",
      topicName: "React",
      content: `React is a JavaScript library for building user interfaces with reusable components. It makes building interactive UIs fast and efficient.

Core concepts:
- Components: Reusable UI pieces
- JSX: Write HTML-like syntax in JavaScript
- State: Data that changes over time
- Props: Pass data between components
- Hooks: Functions for managing state and effects
- Virtual DOM: Efficient rendering

React powers millions of web applications, from Facebook to Netflix, due to its efficiency and developer experience.`,
      examples: [
        "Function component: function MyButton() { return <button>Click</button> }",
        "useState hook: const [count, setCount] = useState(0)",
        'Props: <MyComponent name="John" age={25} />',
      ],
      tips: [
        "Keep components small and focused",
        "Use custom hooks to share logic between components",
        "Understand the dependency array in useEffect",
        "Use React DevTools for debugging",
      ],
    },
    typescript: {
      topicId: "typescript",
      topicName: "TypeScript",
      content: `TypeScript is a superset of JavaScript that adds static typing. It helps catch bugs at compile-time rather than runtime.

Features:
- Static typing: Define types for variables and functions
- Interfaces: Define object shapes
- Classes: Object-oriented programming
- Generics: Reusable components with flexible types
- Type inference: Automatic type detection
- Enums: Named constants

TypeScript makes large codebases more maintainable and helps catch errors before they reach users.`,
      examples: [
        'Variable type: let name: string = "John"',
        "Function types: function add(a: number, b: number): number { return a + b }",
        "Interface: interface User { name: string; age: number }",
      ],
      tips: [
        "Use strict mode to catch more errors",
        "Learn about generics for flexible, reusable code",
        "Understand type unions and intersection types",
        "Use type guards for safe type narrowing",
      ],
    },
  };

  return lessons[topicId] || lessons.arrays;
};

// Mock Quiz Generation
export const generateQuiz = async (
  topicId: string,
): Promise<QuizQuestion[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const quizzes: Record<string, QuizQuestion[]> = {
    arrays: [
      {
        id: "q1",
        question:
          "In a zero-indexed array, what is the index of the first element?",
        options: ["0", "1", "-1", "First"],
        correct: 0,
      },
      {
        id: "q2",
        question:
          "What is the time complexity of accessing an element by index in an array?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correct: 1,
      },
      {
        id: "q3",
        question: "Which of the following is NOT a common array operation?",
        options: ["Insert", "Delete", "Photosynthesis", "Sort"],
        correct: 2,
      },
      {
        id: "q4",
        question:
          "What happens when you try to access an array index that does not exist?",
        options: [
          "The array automatically expands",
          "It returns undefined or throws an error",
          "The program crashes",
          "It returns the first element",
        ],
        correct: 1,
      },
      {
        id: "q5",
        question:
          "In JavaScript, can array elements have different data types?",
        options: [
          "No, all elements must be the same type",
          "Yes, arrays are dynamic",
          "Only in some cases",
          "No information provided",
        ],
        correct: 1,
      },
    ],
    python: [
      {
        id: "q1",
        question: "What keyword is used to create a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
      },
      {
        id: "q2",
        question: "Which of these is NOT a valid Python data type?",
        options: ["int", "string", "boolean", "char"],
        correct: 3,
      },
      {
        id: "q3",
        question: "How do you create a comment in Python?",
        options: ["// comment", "/* comment */", "# comment", "-- comment"],
        correct: 2,
      },
      {
        id: "q4",
        question: "What will print(type(5.0)) output?",
        options: [
          '<class "int">',
          '<class "float">',
          '<class "number">',
          '<class "decimal">',
        ],
        correct: 1,
      },
      {
        id: "q5",
        question: "How do you get the length of a list in Python?",
        options: ["size(list)", "length(list)", "len(list)", "list.length()"],
        correct: 2,
      },
    ],
    ai: [
      {
        id: "q1",
        question: "What is Machine Learning?",
        options: [
          "Programming a computer explicitly",
          "Systems that learn from data without being explicitly programmed",
          "Using machines for learning",
          "Writing code for learning purposes",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question: "Which is a supervised learning task?",
        options: [
          "Clustering",
          "Dimensionality reduction",
          "Classification",
          "Anomaly detection",
        ],
        correct: 2,
      },
      {
        id: "q3",
        question: "What does NLP stand for?",
        options: [
          "Natural Language Processing",
          "Neural Learning Protocol",
          "Network Layer Protocol",
          "New Learning Pattern",
        ],
        correct: 0,
      },
      {
        id: "q4",
        question: "Which technique uses multiple layers of neural networks?",
        options: [
          "Shallow learning",
          "Deep learning",
          "Surface learning",
          "Linear learning",
        ],
        correct: 1,
      },
      {
        id: "q5",
        question: "What is a neural network inspired by?",
        options: [
          "Computer networks",
          "Biological neurons in the brain",
          "Network protocols",
          "Data networks",
        ],
        correct: 1,
      },
    ],
    // Add more quizzes as needed
    math: [
      {
        id: "q1",
        question: "What is the slope of the line y = 2x + 3?",
        options: ["2", "3", "5", "-2"],
        correct: 0,
      },
      {
        id: "q2",
        question:
          "What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "12", "13", "14"],
        correct: 2,
      },
      {
        id: "q3",
        question: "What is the derivative of x² with respect to x?",
        options: ["x", "2x", "x³", "1"],
        correct: 1,
      },
      {
        id: "q4",
        question: "How many degrees are in a circle?",
        options: ["180", "270", "360", "400"],
        correct: 2,
      },
      {
        id: "q5",
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correct: 2,
      },
    ],
    web: [
      {
        id: "q1",
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correct: 0,
      },
      {
        id: "q2",
        question: "What is the purpose of CSS?",
        options: [
          "To structure web pages",
          "To add styling and layout to web pages",
          "To handle server-side logic",
          "To store data",
        ],
        correct: 1,
      },
      {
        id: "q3",
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<h1>", "<heading>", "<title>"],
        correct: 1,
      },
      {
        id: "q4",
        question: "What is the purpose of JavaScript in web development?",
        options: [
          "To replace CSS",
          "To add interactivity and dynamic behavior",
          "To handle all backend logic",
          "To structure web pages",
        ],
        correct: 1,
      },
      {
        id: "q5",
        question: "What does DOM stand for?",
        options: [
          "Document Object Model",
          "Data Object Management",
          "Dynamic Output Model",
          "Document Output Manager",
        ],
        correct: 0,
      },
    ],
    database: [
      {
        id: "q1",
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Language",
          "Special Query Language",
        ],
        correct: 0,
      },
      {
        id: "q2",
        question: "Which database type uses tables with rows and columns?",
        options: [
          "NoSQL",
          "Graph Database",
          "Relational Database",
          "Document Database",
        ],
        correct: 2,
      },
      {
        id: "q3",
        question: "What is a primary key?",
        options: [
          "The first column in a table",
          "A unique identifier for each row",
          "The password to access the database",
          "The main table in a database",
        ],
        correct: 1,
      },
      {
        id: "q4",
        question: "What does ACID stand for in database transactions?",
        options: [
          "Accuracy, Consistency, Integrity, Durability",
          "Atomicity, Consistency, Isolation, Durability",
          "Authorization, Control, Integrity, Design",
          "Accessibility, Compatibility, Integration, Distribution",
        ],
        correct: 1,
      },
      {
        id: "q5",
        question: "What is normalization in databases?",
        options: [
          "Making all data lowercase",
          "Organizing data to reduce redundancy",
          "Creating a database",
          "Backing up data",
        ],
        correct: 1,
      },
    ],
    react: [
      {
        id: "q1",
        question: "What is React?",
        options: [
          "A Python library",
          "A JavaScript library for building UIs",
          "A database management system",
          "A server-side framework",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question: "What does JSX stand for?",
        options: [
          "Java Syntax Extension",
          "JavaScript XML",
          "JavaScript Syntax Extra",
          "Java and XML",
        ],
        correct: 1,
      },
      {
        id: "q3",
        question: "What is state in React?",
        options: [
          "The app status",
          "Data that changes over time",
          "A static variable",
          "A component property",
        ],
        correct: 1,
      },
      {
        id: "q4",
        question: "What is props in React?",
        options: [
          "Properties passed from parent to child components",
          "Program properties",
          "Properties of the server",
          "Python properties",
        ],
        correct: 0,
      },
      {
        id: "q5",
        question: "What are React Hooks?",
        options: [
          "Ways to hook into React features",
          "Server endpoints",
          "Database hooks",
          "CSS styling hooks",
        ],
        correct: 0,
      },
    ],
    typescript: [
      {
        id: "q1",
        question: "What is TypeScript?",
        options: [
          "A new programming language",
          "A superset of JavaScript with static typing",
          "A type of JavaScript library",
          "A database language",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question:
          "How do you define a variable with a string type in TypeScript?",
        options: [
          'var name = "John"',
          'let name: string = "John"',
          'const name: String = "John"',
          'name: string = "John"',
        ],
        correct: 1,
      },
      {
        id: "q3",
        question: "What is an interface in TypeScript?",
        options: [
          "A user interface",
          "A contract that defines the shape of an object",
          "A visual design",
          "A communication protocol",
        ],
        correct: 1,
      },
      {
        id: "q4",
        question: "What are generics in TypeScript?",
        options: [
          "Generic variables",
          "Types that are reusable for multiple data types",
          "General programming concepts",
          "Default values",
        ],
        correct: 1,
      },
      {
        id: "q5",
        question: "When is TypeScript code compiled to?",
        options: ["Java", "C++", "JavaScript", "Python"],
        correct: 2,
      },
    ],
  };

  return quizzes[topicId] || quizzes.arrays;
};

// Resume data generator
export const generateResume = (
  userName: string,
  completedTopics: string[],
  quizResults: any[],
) => {
  const topicNames: Record<string, string> = {
    arrays: "Arrays & Data Structures",
    python: "Python Programming",
    ai: "Artificial Intelligence",
    math: "Mathematics & Algorithms",
    web: "Web Development",
    database: "Database Design & SQL",
    react: "React & Frontend Frameworks",
    typescript: "TypeScript & Type Safety",
  };

  const skills = completedTopics.map((id) => topicNames[id] || id);
  const totalScore = quizResults.reduce(
    (sum: number, r: any) => sum + r.score,
    0,
  );
  const averageScore =
    quizResults.length > 0 ? Math.round(totalScore / quizResults.length) : 0;

  return {
    name: userName,
    title: "AI-Powered Learning Professional",
    summary: `Dedicated learner who has completed comprehensive micro-courses in ${skills.length} technology areas. Demonstrates strong grasp of fundamental concepts with an average quiz score of ${averageScore}%.`,
    skills,
    topicsLearned: completedTopics.length,
    quizzesTaken: quizResults.length,
    averageScore,
    completionDate: new Date().toLocaleDateString(),
  };
};
