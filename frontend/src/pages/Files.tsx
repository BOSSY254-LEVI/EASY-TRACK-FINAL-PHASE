import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, FileText, Image, File, Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Files = () => {
  const { toast } = useToast();
  const [files] = useState([
    {
      id: 1,
      name: "Water Quality Report Q3 2025.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Sarah Mitchell",
      date: "2025-10-15",
    },
    {
      id: 2,
      name: "Field Survey Data.xlsx",
      type: "excel",
      size: "1.8 MB",
      uploadedBy: "Ahmed Khan",
      date: "2025-10-14",
    },
    {
      id: 3,
      name: "Site Location Photo.jpg",
      type: "image",
      size: "3.2 MB",
      uploadedBy: "John Doe",
      date: "2025-10-13",
    },
    {
      id: 4,
      name: "Climate Data Analysis.docx",
      type: "document",
      size: "1.1 MB",
      uploadedBy: "Maria Garcia",
      date: "2025-10-12",
    },
  ]);

  const handleUpload = () => {
    toast({
      title: "Upload Initiated",
      description: "Your file is being uploaded to the database.",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="h-5 w-5 text-critical" />;
      case "image":
        return <Image className="h-5 w-5 text-secondary" />;
      default:
        return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Files & Documents</h1>
            <p className="text-muted-foreground mt-1">Manage all project files and uploaded documents</p>
          </div>
          <Button className="gap-2" onClick={handleUpload}>
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-10" />
          </div>
        </div>

        <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle>All Files</CardTitle>
            <CardDescription>Documents, images, and data files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shadow-inset">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">Uploaded by {file.uploadedBy}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{file.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {file.type}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-critical" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Files;
