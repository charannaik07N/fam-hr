import { useQuery } from "@tanstack/react-query";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Design",
  "Operations",
];

const positions = [
  "Developer",
  "Manager",
  "Analyst",
  "Specialist",
  "Coordinator",
  "Director",
];

const generateMockData = (user) => {
  const department =
    departments[Math.floor(Math.random() * departments.length)];
  const position = positions[Math.floor(Math.random() * positions.length)];

  return {
    id: user.id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    phone: user.phone,
    position,
    department,
    performanceRating: Math.floor(Math.random() * 5) + 1,
    address: user.address,
    image: user.image,
    bio: `Experienced ${position.toLowerCase()} with expertise in ${department.toLowerCase()}. Passionate about delivering high-quality results and collaborating with cross-functional teams.`,
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ).toISOString(),
    salary: 50000 + Math.floor(Math.random() * 100000),
    projects: generateProjects(),
    feedback: generateFeedback(),
    performanceHistory: generatePerformanceHistory(),
  };
};

const generateProjects = () => {
  const projectNames = [
    "Website Redesign",
    "Mobile App",
    "Database Migration",
    "Marketing Campaign",
    "Process Optimization",
  ];
  const statuses = ["active", "completed", "pending"];

  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `proj-${i}`,
    name: projectNames[Math.floor(Math.random() * projectNames.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    progress: Math.floor(Math.random() * 100),
    deadline: new Date(
      Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
};

const generateFeedback = () => {
  const reviewers = [
    "John Smith",
    "Sarah Johnson",
    "Mike Brown",
    "Lisa Wilson",
  ];
  const comments = [
    "Excellent work on the recent project delivery.",
    "Shows great leadership skills and team collaboration.",
    "Consistently meets deadlines and quality standards.",
    "Innovative approach to problem-solving.",
  ];

  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `feedback-${i}`,
    from: reviewers[Math.floor(Math.random() * reviewers.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
};

const generatePerformanceHistory = () => {
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const goals = [
    "Improve code quality",
    "Enhance team collaboration",
    "Meet project deadlines",
    "Learn new technologies",
  ];

  return Array.from({ length: 4 }, (_, i) => ({
    id: `perf-${i}`,
    quarter: quarters[i],
    year: 2024,
    rating: Math.floor(Math.random() * 5) + 1,
    goals: goals.slice(0, Math.floor(Math.random() * 3) + 1),
    achievements: [
      "Successfully completed assigned projects",
      "Mentored junior team members",
    ],
  }));
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/users?limit=20");
      const data = await response.json();
      return data.users.map(generateMockData);
    },
  });
};
