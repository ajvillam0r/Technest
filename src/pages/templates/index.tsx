import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

// Mock data for templates
const templates = [
  {
    id: 1,
    name: "Modern Developer",
    description:
      "A clean, modern template for developers with a focus on projects and skills.",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    category: "developer",
    isPremium: false,
  },
  {
    id: 2,
    name: "Minimal Design",
    description: "A minimalist template perfect for designers and creatives.",
    thumbnail:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&q=80",
    category: "designer",
    isPremium: false,
  },
  {
    id: 3,
    name: "Professional Portfolio",
    description: "A professional template suitable for all tech professionals.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
    category: "professional",
    isPremium: true,
  },
  {
    id: 4,
    name: "Creative Showcase",
    description: "A bold template to showcase creative work and projects.",
    thumbnail:
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&q=80",
    category: "designer",
    isPremium: true,
  },
  {
    id: 5,
    name: "Tech Resume",
    description: "A resume-focused template for tech professionals.",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    category: "developer",
    isPremium: false,
  },
  {
    id: 6,
    name: "Project Showcase",
    description:
      "A template focused on showcasing detailed project information.",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    category: "developer",
    isPremium: true,
  },
];

export default function TemplatesPage() {
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Portfolio Templates</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose from our collection of professionally designed templates to
          showcase your work and skills.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
            <TabsTrigger value="designer">Designer</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="developer" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => template.category === "developer")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="designer" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => template.category === "designer")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="professional" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => template.category === "professional")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="free" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => !template.isPremium)
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="premium" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => template.isPremium)
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TemplateProps {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  isPremium: boolean;
}

function TemplateCard({ template }: { template: TemplateProps }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        {template.isPremium && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Premium
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <div className="flex gap-2 w-full">
          <Link to={`/templates/${template.id}`} className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          {template.isPremium ? (
            <Link
              to={`/payment/checkout`}
              state={{
                template: {
                  id: template.id,
                  name: template.name,
                  price: 19.99,
                  description: template.description,
                },
              }}
              className="flex-1"
            >
              <Button className="w-full">Purchase</Button>
            </Link>
          ) : (
            <Link
              to={`/dashboard/create-portfolio?template=${template.id}`}
              className="flex-1"
            >
              <Button className="w-full">Use Template</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
