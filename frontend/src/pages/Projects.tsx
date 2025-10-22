import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, FolderOpen, Users, Calendar } from "lucide-react";
import { useState } from "react";

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "Water Quality Monitoring - North Region",
      status: "active",
      team: 5,
      deadline: "2025-11-15",
      progress: 75,
    },
    {
      id: 2,
      name: "Climate Data Collection - Coastal Areas",
      status: "active",
      team: 8,
      deadline: "2025-12-01",
      progress: 45,
    },
    {
      id: 3,
      name: "Health Survey - Rural Communities",
      status: "pending",
      team: 3,
      deadline: "2025-11-30",
      progress: 20,
    },
    {
      id: 4,
      name: "Environmental Impact Assessment",
      status: "completed",
      team: 6,
      deadline: "2025-10-01",
      progress: 100,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your field projects</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">All Projects</Button>
            <Button variant="outline">Active</Button>
            <Button variant="outline">Completed</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="card-neumorphic hover:shadow-elevated transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="mt-1">Project #{project.id}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      project.status === "active"
                        ? "default"
                        : project.status === "completed"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.team} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
