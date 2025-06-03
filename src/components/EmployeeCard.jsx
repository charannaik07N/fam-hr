import React from "react";
import { Link } from "react-router-dom";
import { Star, Bookmark, TrendingUp, Eye } from "lucide-react";
import { useHR } from "../contexts/HRContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { useToast } from "../hooks/use-toast";

const EmployeeCard = ({ employee }) => {
  const { bookmarkedIds, toggleBookmark, promoteEmployee } = useHR();
  const { toast } = useToast();
  const isBookmarked = bookmarkedIds.has(employee.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    toggleBookmark(employee.id);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `${employee.firstName} ${employee.lastName}`,
    });
  };

  const handlePromote = (e) => {
    e.preventDefault();
    promoteEmployee(employee.id);
    toast({
      title: "Employee promoted!",
      description: `${employee.firstName} ${employee.lastName} has been promoted.`,
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getDepartmentColor = (department) => {
    const colors = {
      Engineering:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Marketing:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Sales:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      HR: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      Finance:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Design:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      Operations:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={employee.image}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {employee.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {employee.position} • Age {employee.age}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-2 ${
              isBookmarked ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </Button>
        </div>

        <div className="mb-4">
          <Badge className={getDepartmentColor(employee.department)}>
            {employee.department}
          </Badge>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
            Performance:
          </span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= employee.performanceRating
                    ? `${getRatingColor(
                        employee.performanceRating
                      )} fill-current`
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            {employee.performanceRating}/5
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex space-x-2">
        <Link to={`/employee/${employee.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={handlePromote}>
          <TrendingUp className="h-4 w-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
