import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTemplates, deleteTemplate } from "@/lib/api";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AdminTemplatesList() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleAddTemplate = (formData: any) => {
    // In a real app, you would call an API to add the template
    console.log("Add template:", formData);
    setIsAddDialogOpen(false);
  };

  const handleEditTemplate = (templateId: string, formData: any) => {
    // In a real app, you would call an API to edit the template
    console.log(`Edit template with ID: ${templateId}`, formData);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteTemplate(templateId);
        setTemplates(
          templates.filter((template) => template.id !== templateId),
        );
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading templates...</div>;
  }

  // If no real templates are available, show mock data
  const mockTemplates = [
    {
      id: "1",
      name: "Modern Developer",
      description:
        "A clean, modern template for developers with a focus on projects and skills.",
      category: "developer",
      is_premium: false,
      price: 0,
      downloads_count: 120,
    },
    {
      id: "2",
      name: "Minimal Design",
      description: "A minimalist template perfect for designers and creatives.",
      category: "designer",
      is_premium: false,
      price: 0,
      downloads_count: 85,
    },
    {
      id: "3",
      name: "Professional Portfolio",
      description:
        "A professional template suitable for all tech professionals.",
      category: "professional",
      is_premium: true,
      price: 19.99,
      downloads_count: 45,
    },
  ];

  const displayTemplates = templates.length > 0 ? templates : mockTemplates;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Templates Management</CardTitle>
            <CardDescription>
              Manage all portfolio templates on the platform
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Template</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input id="category" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="is_premium" className="text-right">
                    Premium
                  </Label>
                  <Input
                    id="is_premium"
                    type="checkbox"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input id="price" type="number" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleAddTemplate({})}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="capitalize">
                    {template.category}
                  </TableCell>
                  <TableCell>
                    {template.is_premium ? (
                      <Badge>Premium</Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {template.is_premium
                      ? `$${template.price.toFixed(2)}`
                      : "Free"}
                  </TableCell>
                  <TableCell>{template.downloads_count || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Template</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                defaultValue={template.name}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="edit-category"
                                className="text-right"
                              >
                                Category
                              </Label>
                              <Input
                                id="edit-category"
                                defaultValue={template.category}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="edit-description"
                                className="text-right"
                              >
                                Description
                              </Label>
                              <Textarea
                                id="edit-description"
                                defaultValue={template.description}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="edit-is_premium"
                                className="text-right"
                              >
                                Premium
                              </Label>
                              <Input
                                id="edit-is_premium"
                                type="checkbox"
                                defaultChecked={template.is_premium}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="edit-price"
                                className="text-right"
                              >
                                Price ($)
                              </Label>
                              <Input
                                id="edit-price"
                                type="number"
                                defaultValue={template.price}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              onClick={() =>
                                handleEditTemplate(template.id, {})
                              }
                            >
                              Save
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
