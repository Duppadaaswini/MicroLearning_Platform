import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  quizScore?: number;
  attempts: number;
}

export interface LessonData {
  topicId: string;
  topicName: string;
  content: string;
  examples: string[];
  tips: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export interface QuizResult {
  topicId: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  timestamp: number;
}

interface ProgressContextType {
  topics: Topic[];
  lessons: Record<string, LessonData>;
  quizResults: QuizResult[];
  completedTopics: string[];
  getProgress: () => number;
  markTopicComplete: (topicId: string, score?: number) => void;
  setLesson: (topicId: string, lesson: LessonData) => void;
  addQuizResult: (result: QuizResult) => void;
  getTotalScore: () => number;
  getAverageScore: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

const INITIAL_TOPICS: Topic[] = [
  {
    id: "arrays",
    name: "Arrays",
    description: "Master data structures and array manipulation",
    icon: "📊",
    color: "bg-blue-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "python",
    name: "Python Basics",
    description: "Learn Python programming fundamentals",
    icon: "🐍",
    color: "bg-green-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "ai",
    name: "AI Fundamentals",
    description: "Introduction to artificial intelligence",
    icon: "🤖",
    color: "bg-purple-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "math",
    name: "Math Essentials",
    description: "Essential mathematics for programming",
    icon: "∑",
    color: "bg-orange-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "web",
    name: "Web Development",
    description: "Build web applications with HTML, CSS, JS",
    icon: "🌐",
    color: "bg-red-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "database",
    name: "Databases",
    description: "Learn SQL and database management",
    icon: "🗄️",
    color: "bg-indigo-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "react",
    name: "React",
    description: "Build interactive UIs with React",
    icon: "⚛️",
    color: "bg-cyan-500",
    completed: false,
    attempts: 0,
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Type-safe JavaScript development",
    icon: "📝",
    color: "bg-blue-600",
    completed: false,
    attempts: 0,
  },
];

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);
  const [lessons, setLessons] = useState<Record<string, LessonData>>({});
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedTopics = localStorage.getItem("microlearnai_topics");
    const savedLessons = localStorage.getItem("microlearnai_lessons");
    const savedResults = localStorage.getItem("microlearnai_quizResults");

    if (savedTopics) {
      try {
        setTopics(JSON.parse(savedTopics));
      } catch (err) {
        console.error("Failed to load topics:", err);
      }
    }

    if (savedLessons) {
      try {
        setLessons(JSON.parse(savedLessons));
      } catch (err) {
        console.error("Failed to load lessons:", err);
      }
    }

    if (savedResults) {
      try {
        setQuizResults(JSON.parse(savedResults));
      } catch (err) {
        console.error("Failed to load quiz results:", err);
      }
    }
  }, []);

  // Save topics whenever they change
  useEffect(() => {
    localStorage.setItem("microlearnai_topics", JSON.stringify(topics));
  }, [topics]);

  // Save lessons whenever they change
  useEffect(() => {
    localStorage.setItem("microlearnai_lessons", JSON.stringify(lessons));
  }, [lessons]);

  // Save quiz results whenever they change
  useEffect(() => {
    localStorage.setItem(
      "microlearnai_quizResults",
      JSON.stringify(quizResults),
    );
  }, [quizResults]);

  const getProgress = () => {
    const completed = topics.filter((t) => t.completed).length;
    return Math.round((completed / topics.length) * 100);
  };

  const markTopicComplete = (topicId: string, score?: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              completed: true,
              quizScore: score || topic.quizScore,
              attempts: topic.attempts + 1,
            }
          : topic,
      ),
    );
  };

  const setLesson = (topicId: string, lesson: LessonData) => {
    setLessons((prevLessons) => ({
      ...prevLessons,
      [topicId]: lesson,
    }));
  };

  const addQuizResult = (result: QuizResult) => {
    setQuizResults((prevResults) => [...prevResults, result]);
    markTopicComplete(result.topicId, result.score);
  };

  const completedTopics = topics.filter((t) => t.completed).map((t) => t.id);

  const getTotalScore = () => {
    return quizResults.reduce((sum, result) => sum + result.score, 0);
  };

  const getAverageScore = () => {
    if (quizResults.length === 0) return 0;
    return Math.round(getTotalScore() / quizResults.length);
  };

  return (
    <ProgressContext.Provider
      value={{
        topics,
        lessons,
        quizResults,
        completedTopics,
        getProgress,
        markTopicComplete,
        setLesson,
        addQuizResult,
        getTotalScore,
        getAverageScore,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
};
