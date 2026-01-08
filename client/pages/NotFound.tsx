import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout hideNav>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 px-4">
        <div className="text-center animate-slide-up">
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Page not found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. Let's get you
            back on track with your learning journey.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-8 py-3 text-lg">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
