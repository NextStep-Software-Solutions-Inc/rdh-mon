import Dashboard from "~/dashboard/Dashboard";

export function meta() {
  return [
    { title: "Egg Encubation Monitoring" },
    { name: "description", content: "Welcome farmer." },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
