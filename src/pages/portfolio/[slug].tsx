import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getPublishedPortfolio } from "@/lib/portfolio-publishing";

export default function PublicPortfolioPage() {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        if (!slug) {
          setError("Portfolio not found");
          setIsLoading(false);
          return;
        }

        const data = await getPublishedPortfolio(slug);
        setPortfolio(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio");
        setIsLoading(false);
      }
    }

    fetchPortfolio();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-10 text-center">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
        <p className="text-muted-foreground mb-6">
          {error || "The requested portfolio could not be found."}
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-8 text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
          <img
            src={
              portfolio.profiles.avatar_url ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio"
            }
            alt={portfolio.profiles.full_name}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold">{portfolio.profiles.full_name}</h1>
        <p className="text-xl text-muted-foreground">{portfolio.title}</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">About</h2>
          <p>{portfolio.description}</p>
        </section>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.projects.map((project: any) => (
                <div
                  key={project.id}
                  className="border rounded-lg overflow-hidden"
                >
                  {project.image_url && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GitHub Repositories Section */}
        {portfolio.github_repos && portfolio.github_repos.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              GitHub Repositories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.github_repos.map((repo: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h3 className="font-bold">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs">{repo.language}</span>
                    <span className="text-xs">⭐ {repo.stars}</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} {portfolio.profiles.full_name}. All
            rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Created with TechNest Portfolio Builder
          </p>
        </div>
      </footer>
    </div>
  );
}
