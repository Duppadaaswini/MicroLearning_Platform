import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export default function Layout({ children, hideNav }: LayoutProps) {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      {isLoggedIn && !hideNav && (
        <header className="border-b border-border bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                  ✨
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">
                    MicroLearnAI
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Your AI-powered learning companion
                  </p>
                </div>
              </Link>

              <nav className="hidden md:flex gap-1">
                <NavLink
                  to="/dashboard"
                  label="Dashboard"
                  isActive={isActive("/dashboard")}
                />
                <NavLink
                  to="/progress"
                  label="Progress"
                  isActive={isActive("/progress")}
                />
                <NavLink
                  to="/resume"
                  label="Resume"
                  isActive={isActive("/resume")}
                />
              </nav>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>

            {/* Mobile nav */}
            <nav className="md:hidden flex gap-2 mt-4 flex-wrap">
              <NavLink
                to="/dashboard"
                label="Dashboard"
                isActive={isActive("/dashboard")}
                mobile
              />
              <NavLink
                to="/progress"
                label="Progress"
                isActive={isActive("/progress")}
                mobile
              />
              <NavLink
                to="/resume"
                label="Resume"
                isActive={isActive("/resume")}
                mobile
              />
            </nav>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">MicroLearnAI</h3>
              <p className="text-sm text-muted-foreground">
                Your AI-powered learning companion for bite-sized education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 MicroLearnAI | Hackathon Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  mobile?: boolean;
}

function NavLink({ to, label, isActive, mobile }: NavLinkProps) {
  const className = mobile
    ? `px-3 py-1 rounded-md text-sm font-medium transition ${
        isActive
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-secondary hover:text-white"
      }`
    : `px-3 py-2 rounded-md text-sm font-medium transition ${
        isActive
          ? "bg-primary text-white"
          : "text-foreground hover:bg-secondary/20"
      }`;

  return (
    <Link to={to} className={className}>
      {label}
    </Link>
  );
}
