import Landing from "~/landing/Landing";

export function meta() {
  return [
    { title: "Eggspose" },
    { name: "description", content: "Welcome to eggspose" },
  ];
}

export default function LandingRoute() {
  return <Landing />;
}
