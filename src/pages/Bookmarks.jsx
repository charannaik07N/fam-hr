import React from "react";
import { useHR } from "../contexts/HRContext";
import EmployeeCard from "../components/EmployeeCard";
import { Bookmark } from "lucide-react";

const Bookmarks = () => {
  const { employees, bookmarkedIds } = useHR();

  const bookmarkedEmployees = employees.filter((emp) =>
    bookmarkedIds.has(emp.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Bookmark className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bookmarked Employees
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {bookmarkedEmployees.length} employee
            {bookmarkedEmployees.length !== 1 ? "s" : ""} bookmarked
          </p>
        </div>
      </div>

      {bookmarkedEmployees.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No bookmarked employees
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start bookmarking employees from the dashboard to keep track of them
            here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
