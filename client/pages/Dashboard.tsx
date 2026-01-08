import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProgress } from "../contexts/ProgressContext";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { topics, getProgress } = useProgress();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const filteredTopics = useMemo(() => {
    return topics.filter(
      (topic) =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, topics]);

  const progressPercentage = getProgress();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mb-6">
              Continue your learning journey with our AI-powered micro-lessons.
              Learn bite-sized concepts, take quizzes, and master any topic in
              minutes.
            </p>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Your Progress</span>
                <span className="font-bold text-xl">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm opacity-80 mt-2">
                {topics.filter((t) => t.completed).length} of {topics.length}{" "}
                topics completed
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative mb-12">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white border-border text-lg"
            />
          </div>

          {/* Topics Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Available Topics
            </h2>

            {filteredTopics.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No topics found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => navigate(`/lesson/${topic.id}`)}
                    className="group cursor-pointer animate-slide-up"
                  >
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border h-full hover:border-primary">
                      {/* Card Header with color */}
                      <div
                        className={`${topic.color} h-24 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        {topic.icon}
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-foreground text-lg mb-2">
                          {topic.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {topic.description}
                        </p>

                        {/* Status */}
                        <div className="space-y-3">
                          {topic.completed ? (
                            <div className="flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-200">
                              <span className="text-sm font-medium text-green-700">
                                ✓ Completed
                              </span>
                              <span className="text-sm font-bold text-green-700">
                                {topic.quizScore}%
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <span className="text-sm font-medium text-blue-700">
                                Not started
                              </span>
                              <span className="text-xs font-medium text-blue-600">
                                {topic.attempts} attempts
                              </span>
                            </div>
                          )}

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/lesson/${topic.id}`);
                            }}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium gap-2"
                          >
                            Start Lesson
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-white rounded-xl border border-border p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {topics.length}
                </div>
                <p className="text-muted-foreground">Topics Available</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">
                  {topics.filter((t) => t.completed).length}
                </div>
                <p className="text-muted-foreground">Topics Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">
                  {progressPercentage}%
                </div>
                <p className="text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
