import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FilterConfig {
  field: string;
  operator: "equals" | "contains" | "startsWith" | "endsWith" | "greater" | "less" | "between";
  value: string | number;
  value2?: string | number;
}

interface DataFilterProps {
  onFilterChange?: (filters: FilterConfig[]) => void;
  categories?: string[];
  locations?: string[];
}

export const DataFilter = ({
  onFilterChange,
  categories = ["Water Quality", "Health", "Climate", "Sanitation", "Other"],
  locations = ["Nairobi", "Kampala", "Lagos", "Kigali", "Kinshasa"],
}: DataFilterProps) => {
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleAddFilter = (config: FilterConfig) => {
    const newFilters = [...filters, config];
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearAll = () => {
    setFilters([]);
    setSearchText("");
    setSelectedCategory("");
    setSelectedLocation("");
    setDateFrom("");
    setDateTo("");
    onFilterChange?.([]);
  };

  const handleApplyQuickFilter = () => {
    const newFilters: FilterConfig[] = [];

    if (searchText) {
      newFilters.push({
        field: "title",
        operator: "contains",
        value: searchText,
      });
    }

    if (selectedCategory) {
      newFilters.push({
        field: "category",
        operator: "equals",
        value: selectedCategory,
      });
    }

    if (selectedLocation) {
      newFilters.push({
        field: "location",
        operator: "equals",
        value: selectedLocation,
      });
    }

    if (dateFrom) {
      newFilters.push({
        field: "createdAt",
        operator: "greater",
        value: dateFrom,
      });
    }

    if (dateTo) {
      newFilters.push({
        field: "createdAt",
        operator: "less",
        value: dateTo,
      });
    }

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Card className="border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Data Filters
          </CardTitle>
          {filters.length > 0 && (
            <Badge className="bg-blue-500 text-white">{filters.length}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Filters */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Label htmlFor="search" className="text-sm font-semibold text-gray-700">
              Search
            </Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by title or description..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
              Category
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
              Location
            </Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select location..." />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="dateFrom" className="text-sm font-semibold text-gray-700">
                From
              </Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-2 border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="dateTo" className="text-sm font-semibold text-gray-700">
                To
              </Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-2 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleApplyQuickFilter}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Apply Filters
          </Button>
          {(filters.length > 0 || searchText || selectedCategory || selectedLocation || dateFrom || dateTo) && (
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filters */}
        <AnimatePresence>
          {filters.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-2 pt-4 border-t border-gray-200"
            >
              <p className="text-sm font-semibold text-gray-700">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge
                      className={cn(
                        "bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer hover:opacity-80 transition-opacity",
                        "flex items-center gap-1"
                      )}
                      onClick={() => handleRemoveFilter(index)}
                    >
                      {filter.field}: {String(filter.value)}
                      <X className="h-3 w-3" />
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default DataFilter;
