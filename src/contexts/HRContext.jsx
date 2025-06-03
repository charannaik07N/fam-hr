import React, { createContext, useContext, useState, useEffect } from "react";
// import { Employee } from "../types/employee";

const HRContext = createContext(undefined);

export function HRProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedIds");
    if (saved) {
      setBookmarkedIds(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify([...bookmarkedIds]));
  }, [bookmarkedIds]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const promoteEmployee = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, position: `Senior ${emp.position}` } : emp
      )
    );
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      !searchTerm ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(employee.department);

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.includes(employee.performanceRating);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  return (
    <HRContext.Provider
      value={{
        employees,
        bookmarkedIds,
        searchTerm,
        selectedDepartments,
        selectedRatings,
        setEmployees,
        toggleBookmark,
        setSearchTerm,
        setSelectedDepartments,
        setSelectedRatings,
        promoteEmployee,
        filteredEmployees,
      }}
    >
      {children}
    </HRContext.Provider>
  );
}

export function useHR() {
  const context = useContext(HRContext);
  if (context === undefined) {
    throw new Error("useHR must be used within an HRProvider");
  }
  return context;
}
