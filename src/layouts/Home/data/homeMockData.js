/**
 * Mock data for Home page.
 * Replace with API calls when backend is ready.
 */

export const QUICK_ACTIONS = [
  { id: 1, icon: "work", label: "Jobs" },
  { id: 2, icon: "event", label: "Events" },
  { id: 3, icon: "school", label: "Learning" },
  { id: 4, icon: "description", label: "Documents" },
  { id: 5, icon: "people", label: "Directory" },
];

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/1.png",
    title: "Welcome to Meena Intranet",
    subtitle: "Your hub for news, updates, and resources",
  },
  {
    id: 2,
    image: "/2.png",
    title: "Stay Connected",
    subtitle: "Access announcements and updates",
  },
];

export const JOBS = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Information Technology",
    location: "Riyadh",
    type: "Full-time",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "HR Specialist",
    department: "Human Resources",
    location: "Jeddah",
    type: "Full-time",
    postedDate: "2 days ago",
  },
];

export const FEATURED_EVENT = {
  id: 1,
  title: "Saudi national day",
  date: "Sep 23, 2025",
  isFeatured: true,
};

export const EVENTS = [
  {
    id: 2,
    title: "Team Building Workshop",
    date: "Sep 23",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Annual Health Check",
    date: "Sep 23",
    isFeatured: false,
  },
  {
    id: 4,
    title: "Training Session",
    date: "Sep 23",
    isFeatured: false,
  },
];

export const HIGHLIGHTED_CATEGORY = {
  label: "Learning & Development",
  icon: "school",
};
