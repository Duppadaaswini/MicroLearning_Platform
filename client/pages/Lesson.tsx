import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProgress } from "../contexts/ProgressContext";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { generateMicroLesson } from "../lib/mockApi";
import { ArrowLeft, Loader2, RefreshCw, CheckCircle2 } from "lucide-react";

export default function Lesson() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { topics, lessons, setLesson } = useProgress();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const topic = topics.find((t) => t.id === topicId);
  const lesson = lessons[topicId!];

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  if (!topic) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Topic not found
            </h1>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleGenerateLesson = async () => {
    setLoading(true);
    setError("");
    try {
      const generatedLesson = await generateMicroLesson(topicId!);
      setLesson(topicId!, generatedLesson);
    } catch (err) {
      setError("Failed to generate lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Header */}
        <div className={`${topic.color} text-white py-8 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-white/80 hover:text-white transition mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-4">
              <div className="text-6xl">{topic.icon}</div>
              <div>
                <h1 className="text-4xl font-bold">{topic.name}</h1>
                <p className="text-white/90 mt-2">{topic.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!lesson ? (
            <div className="bg-white rounded-xl shadow-lg border border-border p-8 md:p-12 text-center animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Generate Your Micro Lesson
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Our AI will create a bite-sized lesson specifically for you.
                Click the button below to get started.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
                  {error}
                </div>
              )}

              <Button
                onClick={handleGenerateLesson}
                disabled={loading}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8 py-3 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Lesson...
                  </>
                ) : (
                  <>✨ Generate Micro Lesson</>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-8 animate-slide-up">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-900">
                    Lesson Generated Successfully!
                  </h3>
                  <p className="text-green-700 text-sm mt-1">
                    Read through the lesson below and then take the quiz to test
                    your knowledge.
                  </p>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    {lesson.topicName}
                  </h2>

                  {/* Main Content */}
                  <div className="prose prose-sm max-w-none mb-8">
                    <div className="text-foreground whitespace-pre-wrap leading-relaxed text-base">
                      {lesson.content}
                    </div>
                  </div>

                  {/* Examples */}
                  {lesson.examples.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        💡 Examples
                      </h3>
                      <div className="space-y-3">
                        {lesson.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                          >
                            <code className="text-blue-900 font-mono text-sm">
                              {example}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {lesson.tips.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        🎯 Tips
                      </h3>
                      <ul className="space-y-2">
                        {lesson.tips.map((tip, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-foreground"
                          >
                            <span className="text-accent font-bold mt-0.5">
                              →
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button
                  onClick={handleGenerateLesson}
                  disabled={loading}
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Lesson
                </Button>
                <Button
                  onClick={() => navigate(`/quiz/${topicId}`)}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8"
                >
                  Take Quiz
                  <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
