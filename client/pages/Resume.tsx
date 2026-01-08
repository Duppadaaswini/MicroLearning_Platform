import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProgress } from "../contexts/ProgressContext";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { generateResume } from "../lib/mockApi";
import { Download, Edit2 } from "lucide-react";

export default function Resume() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { topics, completedTopics, quizResults, getAverageScore } =
    useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedTitle, setEditedTitle] = useState(
    "AI-Powered Learning Professional",
  );
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const resumeData = generateResume(
    user?.name || "User",
    completedTopics,
    quizResults,
  );
  const averageScore = getAverageScore();

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    // Use browser's print-to-PDF functionality
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(resumeRef.current.innerHTML);
      printWindow.document.write(`
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #222;
            margin: 0;
            padding: 20px;
          }
          @media print {
            body { margin: 0; padding: 10mm; }
          }
        </style>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Learning Resume 🎓
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Showcase your achievements and skills learned through
              MicroLearnAI.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-end">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-border hover:bg-muted gap-2"
            >
              <Edit2 className="w-4 h-4" />
              {isEditing ? "Done Editing" : "Edit Details"}
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Resume Preview */}
            <div className="lg:col-span-3">
              <div
                ref={resumeRef}
                className="bg-white rounded-xl shadow-2xl border border-border overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="border-b-2 border-primary pb-8 mb-8">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="text-4xl font-bold text-primary mb-2 w-full border-b-2 border-primary pb-2"
                        />
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="text-lg text-secondary w-full border-b border-secondary pb-1"
                        />
                      </>
                    ) : (
                      <>
                        <h1 className="text-4xl font-bold text-primary mb-2">
                          {editedName}
                        </h1>
                        <p className="text-lg text-secondary">{editedTitle}</p>
                      </>
                    )}
                    <p className="text-sm text-muted-foreground mt-4">
                      {user?.email}
                    </p>
                  </div>

                  {/* Professional Summary */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-3">
                      Professional Summary
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      {resumeData.summary}
                    </p>
                  </div>

                  {/* Learning Statistics */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Learning Statistics
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/20">
                        <div className="text-2xl font-bold text-primary">
                          {resumeData.topicsLearned}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Topics Learned
                        </p>
                      </div>
                      <div className="bg-secondary/5 rounded-lg p-4 text-center border border-secondary/20">
                        <div className="text-2xl font-bold text-secondary">
                          {resumeData.quizzesTaken}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Quizzes Taken
                        </p>
                      </div>
                      <div className="bg-accent/5 rounded-lg p-4 text-center border border-accent/20">
                        <div className="text-2xl font-bold text-accent">
                          {resumeData.averageScore}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Average Score
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Skills & Expertise
                    </h2>
                    {resumeData.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">
                        Complete topics to add skills to your resume.
                      </p>
                    )}
                  </div>

                  {/* Courses Completed */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Micro-Courses Completed
                    </h2>
                    {completedTopics.length > 0 ? (
                      <div className="space-y-2">
                        {topics
                          .filter((t) => completedTopics.includes(t.id))
                          .map((topic) => {
                            const result = quizResults.find(
                              (r) => r.topicId === topic.id,
                            );
                            return (
                              <div
                                key={topic.id}
                                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{topic.icon}</span>
                                  <div>
                                    <p className="font-medium text-foreground">
                                      {topic.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {topic.description}
                                    </p>
                                  </div>
                                </div>
                                {result && (
                                  <div className="text-right">
                                    <p className="font-bold text-primary text-lg">
                                      {result.score}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(
                                        result.timestamp,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">
                        Complete topics to add them to your resume.
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-border pt-8 mt-8 text-center text-sm text-muted-foreground">
                    <p>Generated on {resumeData.completionDate}</p>
                    <p>© 2026 MicroLearnAI - Powered by AI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Quick Stats */}
            <div className="lg:col-span-1">
              <div className="space-y-4 sticky top-8">
                {/* Progress Card */}
                <div className="bg-white rounded-xl shadow-lg border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4">
                    Your Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Topics Completed
                      </p>
                      <div className="text-3xl font-bold text-primary">
                        {completedTopics.length}/{topics.length}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Average Score
                      </p>
                      <div className="text-3xl font-bold text-secondary">
                        {averageScore}%
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Quizzes Taken
                      </p>
                      <div className="text-3xl font-bold text-accent">
                        {quizResults.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 mb-4">Next Steps</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">→</span>
                      <span>
                        Complete {topics.length - completedTopics.length} more
                        topics
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">→</span>
                      <span>Improve your average quiz score to 90%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">→</span>
                      <span>Share your resume with others</span>
                    </li>
                  </ul>
                </div>

                {/* Share Section */}
                <div className="bg-white rounded-xl shadow-lg border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4">
                    Share Resume
                  </h3>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                    variant="outline"
                    className="w-full border-border hover:bg-muted text-sm"
                  >
                    📋 Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
