import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  publishPortfolio,
  unpublishPortfolio,
} from "@/lib/portfolio-publishing";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Globe, Share2, Download, Copy, Check } from "lucide-react";

export default function PublishPortfolioPage() {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPortfolio() {
      if (!portfolioId || !user) return;

      try {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .eq("id", portfolioId)
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        setPortfolio(data);
        if (data.is_published && data.slug) {
          setPublishedUrl(`${window.location.origin}/p/${data.slug}`);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        toast({
          title: "Error",
          description: "Failed to load portfolio details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolio();
  }, [portfolioId, user, toast]);

  const handlePublish = async () => {
    if (!portfolioId || !user) return;

    setIsPublishing(true);
    try {
      const result = await publishPortfolio(portfolioId, user.id);
      setPublishedUrl(result.url);
      setPortfolio({ ...portfolio, is_published: true, slug: result.slug });
      toast({
        title: "Portfolio Published",
        description:
          "Your portfolio is now live and can be shared with others.",
      });
    } catch (error) {
      console.error("Error publishing portfolio:", error);
      toast({
        title: "Publishing Failed",
        description: "Failed to publish your portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!portfolioId || !user) return;

    setIsUnpublishing(true);
    try {
      await unpublishPortfolio(portfolioId, user.id);
      setPublishedUrl(null);
      setPortfolio({ ...portfolio, is_published: false });
      toast({
        title: "Portfolio Unpublished",
        description: "Your portfolio is no longer publicly accessible.",
      });
    } catch (error) {
      console.error("Error unpublishing portfolio:", error);
      toast({
        title: "Unpublishing Failed",
        description: "Failed to unpublish your portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUnpublishing(false);
    }
  };

  const copyToClipboard = () => {
    if (!publishedUrl) return;

    navigator.clipboard.writeText(publishedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "URL Copied",
      description: "Portfolio URL copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-10 text-center">
        <p>Loading portfolio details...</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The requested portfolio could not be found.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{portfolio.title}</h1>
          <p className="text-muted-foreground">
            Publish and share your portfolio with the world
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(`/dashboard/portfolio-editor/${portfolioId}`)}
        >
          Edit Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>
                Control how your portfolio is shared and accessed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="publish">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="publish">Publish</TabsTrigger>
                  <TabsTrigger value="share">Share</TabsTrigger>
                </TabsList>
                <TabsContent value="publish" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Portfolio Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {portfolio.is_published
                        ? "Your portfolio is currently published and accessible to the public."
                        : "Your portfolio is currently private and only visible to you."}
                    </p>
                  </div>

                  {portfolio.is_published ? (
                    <Button
                      variant="destructive"
                      onClick={handleUnpublish}
                      disabled={isUnpublishing}
                    >
                      {isUnpublishing
                        ? "Unpublishing..."
                        : "Unpublish Portfolio"}
                    </Button>
                  ) : (
                    <Button onClick={handlePublish} disabled={isPublishing}>
                      {isPublishing ? "Publishing..." : "Publish Portfolio"}
                    </Button>
                  )}
                </TabsContent>
                <TabsContent value="share" className="space-y-4 pt-4">
                  {portfolio.is_published && publishedUrl ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-url">Public URL</Label>
                        <div className="flex">
                          <Input
                            id="portfolio-url"
                            value={publishedUrl}
                            readOnly
                            className="rounded-r-none"
                          />
                          <Button
                            variant="secondary"
                            className="rounded-l-none"
                            onClick={copyToClipboard}
                          >
                            {copied ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => window.open(publishedUrl, "_blank")}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          View Published Portfolio
                        </Button>
                        <Button variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share on Social Media
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        Your portfolio needs to be published before it can be
                        shared.
                      </p>
                      <Button onClick={handlePublish} disabled={isPublishing}>
                        {isPublishing ? "Publishing..." : "Publish Now"}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
              <CardDescription>
                Download your portfolio as a standalone website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download your portfolio as a ZIP file containing HTML, CSS, and
                JavaScript files that can be hosted anywhere.
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download as ZIP
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Portfolio Statistics</CardTitle>
              <CardDescription>
                Track views and interactions with your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              {portfolio.is_published ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Views</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Unique Visitors</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Viewed</span>
                    <span className="font-medium">Never</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">
                  Statistics will be available after publishing your portfolio.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
