import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileText, Sheet } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface DataExporterProps {
  data: any[];
  filename?: string;
}

export const DataExporter = ({ data, filename = "field-data" }: DataExporterProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      if (!data || data.length === 0) {
        toast({
          title: "No Data",
          description: "There is no data to export",
          variant: "destructive",
        });
        setIsExporting(false);
        return;
      }

      const headers = Object.keys(data[0]);
      const rows = data.map(item =>
        headers.map(header => {
          const value = item[header];
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        })
      );

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      toast({
        title: "Export Success",
        description: "Data exported to CSV successfully",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    setIsExporting(true);
    try {
      if (!data || data.length === 0) {
        toast({
          title: "No Data",
          description: "There is no data to export",
          variant: "destructive",
        });
        setIsExporting(false);
        return;
      }

      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      toast({
        title: "Export Success",
        description: "Data exported to JSON successfully",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to export data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToXLSX = () => {
    setIsExporting(true);
    toast({
      title: "Feature Coming Soon",
      description: "Excel export will be available in the next update",
      variant: "default",
    });
    setIsExporting(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-blue-200 hover:bg-blue-50"
            disabled={isExporting || !data || data.length === 0}
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
          <Sheet className="h-4 w-4 text-green-600" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON} className="gap-2 cursor-pointer">
          <FileJson className="h-4 w-4 text-blue-600" />
          <span>Export as JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToXLSX} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4 text-orange-600" />
          <span>Export as Excel (Soon)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataExporter;
