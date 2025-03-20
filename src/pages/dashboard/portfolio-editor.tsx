import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Github, Save, Sparkles, Eye } from "lucide-react";

export default function PortfolioEditorPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [previewMode, setPreviewMode] = useState(false);

  // Mock data for the portfolio
  const [portfolio, setPortfolio] = useState({
    name: "My Professional Portfolio",
    personal: {
      fullName: "John Doe",
      title: "Full Stack Developer",
      email: "john.doe@example.com",
      location: "San Francisco, CA",
      bio: "Passionate full stack developer with 5 years of experience building web applications with React, Node.js, and TypeScript.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
      },
    },
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description:
          "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
        image:
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        link: "https://github.com/johndoe/ecommerce",
      },
      {
        title: "Task Management App",
        description:
          "A task management application with drag-and-drop functionality.",
        image:
          "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&q=80",
        tags: ["React", "TypeScript", "Firebase"],
        link: "https://github.com/johndoe/task-manager",
      },
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        year: "2015 - 2019",
        description:
          "Graduated with honors. Focused on software engineering and web development.",
      },
    ],
    experience: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Frontend Developer",
        year: "2020 - Present",
        description:
          "Developing and maintaining web applications using React and TypeScript. Leading a team of 3 frontend developers.",
      },
      {
        company: "Web Solutions LLC",
        position: "Junior Developer",
        year: "2019 - 2020",
        description:
          "Worked on various client projects using JavaScript, HTML, and CSS.",
      },
    ],
  });

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      personal: {
        ...portfolio.personal,
        [name]: value,
      },
    });
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      personal: {
        ...portfolio.personal,
        socialLinks: {
          ...portfolio.personal.socialLinks,
          [name]: value,
        },
      },
    });
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    alert("Portfolio saved successfully!");
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a ZIP file
    alert("Portfolio downloaded as ZIP!");
  };

  const handleAISuggestions = () => {
    // In a real app, this would call an AI service for suggestions
    alert("AI suggestions feature would be implemented here!");
  };

  const handleGithubImport = () => {
    // In a real app, this would connect to GitHub API
    alert("GitHub import feature would be implemented here!");
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{portfolio.name}</h1>
          <p className="text-muted-foreground">
            Edit your portfolio information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Edit Mode" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleAISuggestions}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI Suggestions
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={portfolio.personal.fullName}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={portfolio.personal.title}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={portfolio.personal.email}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={portfolio.personal.location}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={portfolio.personal.bio}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <Separator className="my-4" />
              <h3 className="text-lg font-medium mb-2">Social Links</h3>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  value={portfolio.personal.socialLinks.github}
                  onChange={handleSocialLinkChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={portfolio.personal.socialLinks.linkedin}
                  onChange={handleSocialLinkChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={portfolio.personal.socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Skills</h3>
                <Button size="sm" variant="outline">
                  Add Skill
                </Button>
              </div>
              {portfolio.skills.map((skill, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{skill.name}</div>
                      <Badge>{skill.level}%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Projects</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleGithubImport}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Import from GitHub
                  </Button>
                  <Button size="sm" variant="outline">
                    Add Project
                  </Button>
                </div>
              </div>
              {portfolio.projects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <h4 className="font-medium text-lg">{project.title}</h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Project
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Education</h3>
                <Button size="sm" variant="outline">
                  Add Education
                </Button>
              </div>
              {portfolio.education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{edu.institution}</h4>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm">{edu.degree}</div>
                      <Badge variant="outline">{edu.year}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {edu.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Experience</h3>
                <Button size="sm" variant="outline">
                  Add Experience
                </Button>
              </div>
              {portfolio.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{exp.company}</h4>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm">{exp.position}</div>
                      <Badge variant="outline">{exp.year}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {exp.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 border rounded-lg overflow-hidden bg-card">
          <div className="p-4 border-b bg-muted/50 flex justify-between items-center">
            <h3 className="font-medium">Preview</h3>
            <Badge variant="outline">
              {previewMode ? "Live Preview" : "Editor Preview"}
            </Badge>
          </div>
          <div className="p-6 h-[800px] overflow-auto">
            {/* This would be replaced with the actual portfolio preview */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={portfolio.personal.avatar}
                  alt={portfolio.personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold">
                {portfolio.personal.fullName}
              </h1>
              <p className="text-xl text-muted-foreground">
                {portfolio.personal.title}
              </p>
              <p className="text-sm mt-2">{portfolio.personal.location}</p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href={portfolio.personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                About Me
              </h2>
              <p>{portfolio.personal.bio}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Skills</h2>
              <div className="space-y-4">
                {portfolio.skills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.projects.map((project, index) => (
                  <Card key={index}>
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Education
              </h2>
              {portfolio.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <div className="flex justify-between">
                    <p>{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Experience
              </h2>
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{exp.company}</h3>
                  <div className="flex justify-between">
                    <p>{exp.position}</p>
                    <p className="text-sm text-muted-foreground">{exp.year}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
              <p className="mb-2">{portfolio.personal.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
