import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProgress } from "../contexts/ProgressContext";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { generateQuiz } from "../lib/mockApi";
import { ArrowLeft, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export default function Quiz() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { topics, addQuizResult } = useProgress();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const topic = topics.find((t) => t.id === topicId);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!topic) {
      setError("Topic not found");
      return;
    }

    loadQuiz();
  }, [topicId, isLoggedIn, topic, navigate]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const quiz = await generateQuiz(topicId!);
      setQuestions(quiz);
      setSelectedAnswers(new Array(quiz.length).fill(-1));
    } catch (err) {
      setError("Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) return null;

  if (!topic) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {error || "Topic not found"}
            </h1>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium">Loading quiz...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!questions.length) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              No quiz available
            </h1>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = selectedAnswers[currentQuestionIndex];
  const correctCount = selectedAnswers.filter(
    (answer, idx) => answer === questions[idx].correct,
  ).length;
  const score = Math.round((correctCount / questions.length) * 100);

  const handleSelectAnswer = (index: number) => {
    if (!submitted) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestionIndex] = index;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    addQuizResult({
      topicId: topicId!,
      score,
      totalQuestions: questions.length,
      answers: selectedAnswers,
      timestamp: Date.now(),
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Header */}
        <div className={`${topic.color} text-white py-8 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate(`/lesson/${topicId}`)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Lesson
            </button>
            <h1 className="text-3xl font-bold">Quiz: {topic.name}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!submitted ? (
            <div className="animate-slide-up">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {Math.round(
                      ((currentQuestionIndex + 1) / questions.length) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-xl shadow-lg border border-border p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition font-medium ${
                        currentAnswer === idx
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            currentAnswer === idx
                              ? "border-primary bg-primary text-white"
                              : "border-border"
                          }`}
                        >
                          {currentAnswer === idx && "✓"}
                        </span>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
                    {error}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  ← Previous
                </Button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswers.includes(-1)}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8"
                  >
                    Next →
                  </Button>
                )}
              </div>

              {/* Question Indicator */}
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      idx === currentQuestionIndex
                        ? "bg-primary text-white shadow-lg"
                        : selectedAnswers[idx] !== -1
                          ? "bg-green-500 text-white"
                          : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-slide-up">
              {/* Results Card */}
              <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden mb-8">
                {/* Score Header */}
                <div
                  className={`${topic.color} text-white p-8 md:p-12 text-center`}
                >
                  <div className="text-6xl font-bold mb-4">{score}%</div>
                  <h2 className="text-2xl font-bold mb-2">
                    {score >= 80
                      ? "🎉 Excellent!"
                      : score >= 60
                        ? "🌟 Good Job!"
                        : "💪 Keep Learning!"}
                  </h2>
                  <p className="text-white/90">
                    You got {correctCount} out of {questions.length} questions
                    correct
                  </p>
                </div>

                {/* Detailed Results */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Review Your Answers
                  </h3>
                  <div className="space-y-4">
                    {questions.map((question, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 ${
                          selectedAnswers[idx] === question.correct
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {selectedAnswers[idx] === question.correct ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {question.question}
                            </p>
                            <p className="text-sm mt-2">
                              <span className="font-medium text-foreground">
                                Your answer:{" "}
                              </span>
                              <span
                                className={
                                  selectedAnswers[idx] === question.correct
                                    ? "text-green-700"
                                    : "text-red-700"
                                }
                              >
                                {question.options[selectedAnswers[idx]]}
                              </span>
                            </p>
                            {selectedAnswers[idx] !== question.correct && (
                              <p className="text-sm mt-1">
                                <span className="font-medium text-green-700">
                                  Correct answer:{" "}
                                </span>
                                <span className="text-green-700">
                                  {question.options[question.correct]}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers(new Array(questions.length).fill(-1));
                    setSubmitted(false);
                  }}
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  🔄 Retry Quiz
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
