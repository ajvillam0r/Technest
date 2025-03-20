import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthUrl, getUserRepositories, initGitHub } from "@/lib/github";
import { useToast } from "@/components/ui/use-toast";
import { Github, ExternalLink, Search } from "lucide-react";

export default function GitHubImportPage() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function checkGitHubConnection() {
      const token = localStorage.getItem("github_token");

      if (token) {
        try {
          await initGitHub(token);
          setIsConnected(true);
          fetchRepositories();
        } catch (error) {
          console.error("Error initializing GitHub:", error);
          setIsConnected(false);
          setIsLoading(false);
        }
      } else {
        setIsConnected(false);
        setIsLoading(false);
      }
    }

    async function fetchRepositories() {
      try {
        const repos = await getUserRepositories();
        setRepositories(repos);
        setFilteredRepos(repos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        toast({
          title: "Error",
          description:
            "Failed to fetch GitHub repositories. Please try reconnecting.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }

    checkGitHubConnection();
  }, [toast]);

  useEffect(() => {
    if (repositories.length > 0) {
      const filtered = repositories.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description &&
            repo.description.toLowerCase().includes(searchQuery.toLowerCase())),
      );
      setFilteredRepos(filtered);
    }
  }, [searchQuery, repositories]);

  const handleConnectGitHub = async () => {
    try {
      const authUrl = await getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error getting GitHub auth URL:", error);
      toast({
        title: "Error",
        description: "Failed to connect to GitHub. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleRepo = (repoId: string) => {
    setSelectedRepos((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId],
    );
  };

  const handleImportSelected = () => {
    if (selectedRepos.length === 0) {
      toast({
        title: "No repositories selected",
        description: "Please select at least one repository to import.",
        variant: "destructive",
      });
      return;
    }

    const selectedRepoData = repositories.filter((repo) =>
      selectedRepos.includes(repo.id.toString()),
    );

    // Store selected repos in session storage to use in portfolio creation
    sessionStorage.setItem(
      "imported_github_repos",
      JSON.stringify(selectedRepoData),
    );

    toast({
      title: "Repositories imported",
      description: `Successfully imported ${selectedRepos.length} repositories.`,
    });

    navigate("/dashboard/create-portfolio");
  };

  if (isLoading) {
    return (
      <div className="container py-10 text-center">
        <p>Loading GitHub repositories...</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">GitHub Repository Import</h1>
          <p className="text-muted-foreground">
            Import your GitHub repositories to showcase in your portfolio
          </p>
        </div>
      </div>

      {!isConnected ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect to GitHub</CardTitle>
            <CardDescription>
              Connect your GitHub account to import your repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Github className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">
              You need to connect your GitHub account to import repositories.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleConnectGitHub}>
              <Github className="h-4 w-4 mr-2" />
              Connect GitHub Account
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleImportSelected}
              disabled={selectedRepos.length === 0}
            >
              Import Selected ({selectedRepos.length})
            </Button>
          </div>

          {filteredRepos.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No repositories match your search."
                  : "No repositories found in your GitHub account."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredRepos.map((repo) => (
                <Card key={repo.id} className="overflow-hidden">
                  <div className="p-6 flex items-start gap-4">
                    <Checkbox
                      id={`repo-${repo.id}`}
                      checked={selectedRepos.includes(repo.id.toString())}
                      onCheckedChange={() =>
                        handleToggleRepo(repo.id.toString())
                      }
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label
                            htmlFor={`repo-${repo.id}`}
                            className="text-lg font-medium cursor-pointer"
                          >
                            {repo.name}
                          </Label>
                          {repo.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {repo.description}
                            </p>
                          )}
                        </div>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center"
                        >
                          View on GitHub
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        {repo.language && (
                          <span className="text-xs bg-primary/10 px-2 py-1 rounded">
                            {repo.language}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          ⭐ {repo.stars}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Updated{" "}
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleImportSelected}
              disabled={selectedRepos.length === 0}
            >
              Import Selected ({selectedRepos.length})
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
