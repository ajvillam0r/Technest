import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAccessToken, initGitHub } from "@/lib/github";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function GitHubCallbackPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    async function handleGitHubCallback() {
      try {
        // Get the code from the URL
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");

        if (!code) {
          setError("No authorization code received from GitHub");
          setIsLoading(false);
          return;
        }

        // Exchange the code for an access token
        const accessToken = await getAccessToken(code);

        // Initialize GitHub API with the token
        await initGitHub(accessToken);

        // Store the token in localStorage
        localStorage.setItem("github_token", accessToken);

        toast({
          title: "GitHub Connected",
          description: "Your GitHub account has been successfully connected.",
        });

        // Redirect to the dashboard or portfolio creation page
        navigate("/dashboard/create-portfolio");
      } catch (err) {
        console.error("GitHub authentication error:", err);
        setError("Failed to authenticate with GitHub. Please try again.");
        setIsLoading(false);
      }
    }

    handleGitHubCallback();
  }, [location, navigate, toast]);

  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔄</div>
          <h1 className="mb-4 text-2xl font-bold">Connecting to GitHub...</h1>
          <p className="text-muted-foreground">
            Please wait while we connect your GitHub account.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">❌</div>
          <h1 className="mb-4 text-2xl font-bold">Connection Failed</h1>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
