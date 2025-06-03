import React from "react";
import { Search, Filter, X } from "lucide-react";
import { useHR } from "../contexts/HRContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";

const SearchAndFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    employees,
  } = useHR();

  const departments = [...new Set(employees.map((emp) => emp.department))];
  const ratings = [1, 2, 3, 4, 5];

  const handleDepartmentChange = (department, checked) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department]);
    } else {
      setSelectedDepartments(
        selectedDepartments.filter((d) => d !== department)
      );
    }
  };

  const handleRatingChange = (rating, checked) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    }
  };

  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedRatings([]);
    setSearchTerm("");
  };

  const hasActiveFilters =
    selectedDepartments.length > 0 || selectedRatings.length > 0 || searchTerm;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Departments
                {selectedDepartments.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedDepartments.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Filter by Department</h4>
                {departments.map((department) => (
                  <div key={department} className="flex items-center space-x-2">
                    <Checkbox
                      id={department}
                      checked={selectedDepartments.includes(department)}
                      onCheckedChange={(checked) =>
                        handleDepartmentChange(department, checked)
                      }
                    />
                    <label htmlFor={department} className="text-sm">
                      {department}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Ratings
                {selectedRatings.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedRatings.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Filter by Rating</h4>
                {ratings.map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={(checked) =>
                        handleRatingChange(rating, checked)
                      }
                    />
                    <label htmlFor={`rating-${rating}`} className="text-sm">
                      {rating} Star{rating > 1 ? "s" : ""}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedDepartments.map((dept) => (
            <Badge
              key={dept}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {dept}
              <button
                onClick={() => handleDepartmentChange(dept, false)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge
              key={rating}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {rating} Star{rating > 1 ? "s" : ""}
              <button
                onClick={() => handleRatingChange(rating, false)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
