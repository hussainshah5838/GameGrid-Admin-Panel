export const users = [
  { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "John Doe", email: "john@example.com", role: "Moderator", status: "Active" },
];

export const subscriptions = [
  { id: 1, plan: "Basic", price: "$10/mo", users: 120 },
  { id: 2, plan: "Pro", price: "$25/mo", users: 80 },
  { id: 3, plan: "Enterprise", price: "$60/mo", users: 25 },
];

export const games = [
  { id: 1, title: "Counter Strike 2", status: "Live", players: 10 },
  { id: 2, title: "Valorant", status: "Upcoming", players: 20 },
  { id: 3, title: "PUBG Mobile", status: "Finished", players: 100 },
];

export const research = [
  { id: 1, topic: "Market Growth 2025", status: "Draft" },
  { id: 2, topic: "Esports Player Stats", status: "Published" },
];

export const tickets = [
  { id: 1, user: "Ali Khan", subject: "Payment Issue", status: "Open" },
  { id: 2, user: "Sara Ahmed", subject: "Login Problem", status: "Closed" },
  { id: 3, user: "John Doe", subject: "Bug Report", status: "In Progress" },
];

export const notifications = [
  { id: 1, title: "New Update Released", message: "Version 1.2 is live!", date: "2025-08-20" },
  { id: 2, title: "Maintenance Alert", message: "Servers down at midnight.", date: "2025-08-22" },
];

export const trends = [
  { month: "Jan", users: 400, revenue: 240 },
  { month: "Feb", users: 300, revenue: 221 },
  { month: "Mar", users: 500, revenue: 329 },
];


export const rowsData = [
  { userId: "#CM9801", name: "Natali Craig",  avatar: "https://i.pravatar.cc/64?img=47", email: "natali.craig@example.com",  date: "2023-01-15",  status: "Active",      subscription: "Premium",  plan: "Premium",  amount: "$99/month", joinDate: "2023-01-15" },
  { userId: "#CM9802", name: "Ali Khan",      avatar: "https://i.pravatar.cc/64?img=12", email: "ali.khan@example.com",      date: "A minute ago",status: "Pending",     subscription: "Standard", plan: "Standard", amount: "$29/month", joinDate: "2023-05-12" },
  { userId: "#CM9803", name: "Sophia Lee",    avatar: "https://i.pravatar.cc/64?img=32", email: "sophia.lee@example.com",    date: "1 hour ago",  status: "Approved",    subscription: "Free",     plan: "Free",     amount: "$0",        joinDate: "2023-06-20" },
  { userId: "#CM9804", name: "David Chen",    avatar: "https://i.pravatar.cc/64?img=5",  email: "david.chen@example.com",    date: "Yesterday",   status: "Approved",    subscription: "Premium",  plan: "Premium",  amount: "$99/month", joinDate: "2023-02-10" },
  { userId: "#CM9805", name: "Emma Watson",   avatar: "https://i.pravatar.cc/64?img=45", email: "emma.watson@example.com",   date: "Feb 2, 2023", status: "In Progress", subscription: "Standard", plan: "Standard", amount: "$29/month", joinDate: "2023-04-14" },
  { userId: "#CM9806", name: "Mohammed Rizwan", avatar: "https://i.pravatar.cc/64?img=23", email: "rizwan.m@example.com",   date: "Just now",    status: "Active",      subscription: "Premium",  plan: "Premium",  amount: "$99/month", joinDate: "2023-03-18" },
];

export const roles = ["Admin", "Manager", "Customer"];

export const UserData = [
  {
    userId: "#CM9801", name: "Natali Craig",
    avatar: "https://i.pravatar.cc/64?img=47",
    email: "natali.craig@example.com", date: "2023-01-15",
    status: "Active", subscription: "Premium", plan: "Premium",
    amount: "$99/month", joinDate: "2023-01-15", role: "Manager",
  },
  {
    userId: "#CM9802", name: "Ali Khan",
    avatar: "https://i.pravatar.cc/64?img=12",
    email: "ali.khan@example.com", date: "A minute ago",
    status: "Pending", subscription: "Standard", plan: "Standard",
    amount: "$29/month", joinDate: "2023-05-12", role: "Customer",
  },
  {
    userId: "#CM9803", name: "Sophia Lee",
    avatar: "https://i.pravatar.cc/64?img=32",
    email: "sophia.lee@example.com", date: "1 hour ago",
    status: "Approved", subscription: "Free", plan: "Free",
    amount: "$0", joinDate: "2023-06-20", role: "Customer",
  },
  {
    userId: "#CM9804", name: "David Chen",
    avatar: "https://i.pravatar.cc/64?img=5",
    email: "david.chen@example.com", date: "Yesterday",
    status: "Approved", subscription: "Premium", plan: "Premium",
    amount: "$99/month", joinDate: "2023-02-10", role: "Admin",
  },
  {
    userId: "#CM9805", name: "Emma Watson",
    avatar: "https://i.pravatar.cc/64?img=45",
    email: "emma.watson@example.com", date: "Feb 2, 2023",
    status: "In Progress", subscription: "Standard", plan: "Standard",
    amount: "$29/month", joinDate: "2023-04-14", role: "Customer",
  },
  {
    userId: "#CM9806", name: "Mohammed Rizwan",
    avatar: "https://i.pravatar.cc/64?img=23",
    email: "rizwan.m@example.com", date: "Just now",
    status: "Active", subscription: "Premium", plan: "Premium",
    amount: "$99/month", joinDate: "2023-03-18", role: "Customer",
  },
];


// Sample feedback data
export const feedbackRows = [
  {
    id: "FBK-1001",
    user: { name: "Ali Khan", email: "ali.khan@example.com", avatar: "https://i.pravatar.cc/64?img=12" },
    subject: "Feature request: dark theme schedule",
    message: "It would be great to have an option to auto-switch the theme at sunset.",
    type: "Feature",
    rating: 4,
    status: "Open",
    date: "2025-08-25",
  },
  {
    id: "FBK-1002",
    user: { name: "Sara Malik", email: "sara.malik@example.com", avatar: "https://i.pravatar.cc/64?img=33" },
    subject: "Bug: cannot update profile picture",
    message: "Upload works but the preview never changes after saving.",
    type: "Bug",
    rating: 2,
    status: "In Review",
    date: "2025-08-28",
  },
  {
    id: "FBK-1003",
    user: { name: "Hamza Yousaf", email: "hamza.yousaf@example.com", avatar: "https://i.pravatar.cc/64?img=23" },
    subject: "Loving the new payments dashboard!",
    message: "The charts look clean and the export works nicely. Thanks!",
    type: "Praise",
    rating: 5,
    status: "Resolved",
    date: "2025-08-29",
  },
  {
    id: "FBK-1004",
    user: { name: "David Chen", email: "david.chen@example.com", avatar: "https://i.pravatar.cc/64?img=5" },
    subject: "Billing mismatch on invoice",
    message: "My last invoice shows an extra $10 fee. Can you check?",
    type: "Bug",
    rating: 3,
    status: "Open",
    date: "2025-09-01",
  },
];
