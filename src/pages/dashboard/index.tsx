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
import { Plus, Edit, Download, Trash2, Github } from "lucide-react";

// Mock data for portfolios
const portfolios = [
  {
    id: 1,
    name: "Developer Portfolio",
    template: "Modern Developer",
    lastUpdated: "2023-06-15T10:30:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
  },
  {
    id: 2,
    name: "UX Designer Portfolio",
    template: "Minimal Design",
    lastUpdated: "2023-07-20T14:45:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&q=80",
  },
];

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/dashboard/create-portfolio">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Portfolio
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{portfolios.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Templates Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              GitHub Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <Button variant="outline" size="sm" className="mt-2 gap-2">
              <Github className="h-4 w-4" />
              Connect GitHub
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Portfolios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={portfolio.thumbnail}
                alt={portfolio.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{portfolio.name}</CardTitle>
              <CardDescription>
                Template: {portfolio.template}
                <br />
                Last updated:{" "}
                {new Date(portfolio.lastUpdated).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Create New Portfolio</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Build a new portfolio to showcase your skills and projects
          </p>
          <Link to="/dashboard/create-portfolio">
            <Button>Get Started</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
