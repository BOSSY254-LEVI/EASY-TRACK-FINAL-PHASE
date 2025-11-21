import { FileText, Download, Filter, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fieldDataAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [fieldData, setFieldData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFieldData();
  }, []);

  const fetchFieldData = async () => {
    try {
      const data = await fieldDataAPI.getAll();
      setFieldData(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load field data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Process data for charts
  const monthlyData = fieldData.reduce((acc: any[], item) => {
    const month = new Date(item.created_at).toLocaleString('default', { month: 'short' });
    const existing = acc.find(m => m.month === month);
    if (existing) {
      existing[item.category] = (existing[item.category] || 0) + 1;
    } else {
      acc.push({ month, [item.category]: 1 });
    }
    return acc;
  }, []);

  const categoryData = [
    { name: "Water Quality", value: fieldData.filter(d => d.category === 'water').length, color: "hsl(var(--secondary))" },
    { name: "Health Screening", value: fieldData.filter(d => d.category === 'health').length, color: "hsl(var(--destructive))" },
    { name: "Climate Monitoring", value: fieldData.filter(d => d.category === 'climate').length, color: "hsl(var(--success))" },
    { name: "Environmental", value: fieldData.filter(d => d.category === 'environment').length, color: "hsl(var(--primary))" },
  ];

  const regionData = [
    { region: "Nairobi", reports: 125, alerts: 8 },
    { region: "Kampala", reports: 98, alerts: 5 },
    { region: "Dar es Salaam", reports: 112, alerts: 12 },
    { region: "Kigali", reports: 87, alerts: 4 },
    { region: "Lagos", reports: 145, alerts: 15 },
  ];

  const filteredReports = fieldData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentReports = filteredReports.slice(0, 5).map((item, index) => ({
    id: item.id,
    title: item.title,
    date: new Date(item.created_at).toLocaleDateString(),
    status: "Completed",
    type: item.category.charAt(0).toUpperCase() + item.category.slice(1),
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h2>
            <p className="text-muted-foreground">Comprehensive insights from field operations</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Monthly Report Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="water" fill="hsl(var(--secondary))" name="Water" />
                  <Bar dataKey="health" fill="hsl(var(--destructive))" name="Health" />
                  <Bar dataKey="climate" fill="hsl(var(--success))" name="Climate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Reports by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regional Performance */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Regional Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="region" type="category" className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="reports" fill="hsl(var(--primary))" name="Reports" />
                  <Bar dataKey="alerts" fill="hsl(var(--destructive))" name="Alerts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cumulative Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Cumulative Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="water" stroke="hsl(var(--secondary))" strokeWidth={3} name="Water" />
                  <Line type="monotone" dataKey="health" stroke="hsl(var(--destructive))" strokeWidth={3} name="Health" />
                  <Line type="monotone" dataKey="climate" stroke="hsl(var(--success))" strokeWidth={3} name="Climate" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.type === 'Water' ? 'bg-secondary/10 text-secondary' :
                      report.type === 'Health' ? 'bg-destructive/10 text-destructive' :
                      'bg-success/10 text-success'
                    }`}>
                      {report.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Completed' ? 'bg-success/10 text-success' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {report.status}
                    </span>
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

export default Reports;
