import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProgress } from "../contexts/ProgressContext";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Award, BookOpen, Target } from "lucide-react";

export default function Progress() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { topics, quizResults, getProgress, getAverageScore } = useProgress();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const progressPercentage = getProgress();
  const averageScore = getAverageScore();
  const completedTopics = topics.filter((t) => t.completed);
  const totalAttempts = quizResults.length;

  // Data for charts
  const topicProgressData = topics.map((topic) => ({
    name: topic.name.substring(0, 8),
    score: topic.quizScore || 0,
    completed: topic.completed ? 1 : 0,
  }));

  const scoreData = quizResults.map((result, idx) => ({
    name: `Quiz ${idx + 1}`,
    score: result.score,
  }));

  const pieData = [
    { name: "Completed", value: completedTopics.length },
    { name: "Not Started", value: topics.length - completedTopics.length },
  ];

  const COLORS = ["#8B5CF6", "#E5E7EB"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Learning Progress 📊
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Track your learning journey and celebrate your achievements.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<Target className="w-8 h-8" />}
              label="Overall Progress"
              value={`${progressPercentage}%`}
              color="from-primary to-blue-500"
            />
            <StatCard
              icon={<Award className="w-8 h-8" />}
              label="Average Score"
              value={`${averageScore}%`}
              color="from-secondary to-cyan-500"
            />
            <StatCard
              icon={<BookOpen className="w-8 h-8" />}
              label="Topics Completed"
              value={`${completedTopics.length}/${topics.length}`}
              color="from-accent to-purple-500"
            />
            <StatCard
              icon={<TrendingUp className="w-8 h-8" />}
              label="Quizzes Taken"
              value={totalAttempts}
              color="from-orange-500 to-red-500"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Quiz Scores Over Time */}
            <div className="bg-white rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Quiz Scores Over Time
              </h2>
              {scoreData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#8b5cf6" />
                    <YAxis stroke="#8b5cf6" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                      }}
                      formatter={(value) => `${value}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: "#8b5cf6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No quiz results yet. Take a quiz to see your progress!
                  </p>
                </div>
              )}
            </div>

            {/* Completion Status */}
            <div className="bg-white rounded-xl shadow-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Completion Status
              </h2>
              <div className="flex items-center justify-center h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 justify-center mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {completedTopics.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {topics.length - completedTopics.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Scores */}
          <div className="bg-white rounded-xl shadow-lg border border-border p-6 mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Topic Scores
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#8b5cf6" />
                <YAxis stroke="#8b5cf6" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                  }}
                  formatter={(value, name) =>
                    name === "score"
                      ? [`${value}%`, "Score"]
                      : [value === 1 ? "Completed" : "Not Started", "Status"]
                  }
                />
                <Bar
                  dataKey="score"
                  fill="#8b5cf6"
                  name="Score"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Topic List */}
          <div className="bg-white rounded-xl shadow-lg border border-border p-6 mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Topic Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Topic
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">
                      Best Score
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">
                      Attempts
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((topic) => (
                    <tr
                      key={topic.id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      <td className="py-4 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{topic.icon}</span>
                          {topic.name}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {topic.completed ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium text-sm">
                            ⏳ In Progress
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center text-foreground font-medium">
                        {topic.quizScore ? `${topic.quizScore}%` : "—"}
                      </td>
                      <td className="py-4 px-4 text-center text-foreground">
                        {topic.attempts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mb-12">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8 py-3 text-lg"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-xl shadow-lg p-6 text-white animate-slide-up`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{label}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/20 text-white/90">{icon}</div>
      </div>
    </div>
  );
}
