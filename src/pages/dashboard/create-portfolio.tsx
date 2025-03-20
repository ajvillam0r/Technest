import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for templates (simplified version)
const templates = [
  {
    id: 1,
    name: "Modern Developer",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    isPremium: false,
  },
  {
    id: 2,
    name: "Minimal Design",
    thumbnail:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&q=80",
    isPremium: false,
  },
  {
    id: 3,
    name: "Professional Portfolio",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
    isPremium: true,
  },
];

export default function CreatePortfolioPage() {
  const navigate = useNavigate();
  const [portfolioName, setPortfolioName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate creating a portfolio
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/portfolio-editor");
    }, 1500);
  };

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Portfolio</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Portfolio Details</CardTitle>
              <CardDescription>
                Enter a name for your portfolio and select a template to get
                started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio-name">Portfolio Name</Label>
                  <Input
                    id="portfolio-name"
                    placeholder="My Professional Portfolio"
                    value={portfolioName}
                    onChange={(e) => setPortfolioName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Select a Template</h2>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate === template.id}
                    onSelect={() => setSelectedTemplate(template.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="free">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates
                  .filter((template) => !template.isPremium)
                  .map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate === template.id}
                      onSelect={() => setSelectedTemplate(template.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="premium">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates
                  .filter((template) => template.isPremium)
                  .map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate === template.id}
                      onSelect={() => setSelectedTemplate(template.id)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!portfolioName || !selectedTemplate || isLoading}
            >
              {isLoading ? "Creating..." : "Continue to Editor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface TemplateProps {
  id: number;
  name: string;
  thumbnail: string;
  isPremium: boolean;
}

function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: TemplateProps;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={onSelect}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>
        {template.isPremium && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Premium
          </Badge>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <Badge className="bg-primary text-primary-foreground text-sm">
              Selected
            </Badge>
          </div>
        )}
      </div>
      <CardFooter className="justify-between">
        <h3 className="font-medium">{template.name}</h3>
        {template.isPremium ? (
          <Badge variant="outline">Premium</Badge>
        ) : (
          <Badge variant="outline">Free</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
