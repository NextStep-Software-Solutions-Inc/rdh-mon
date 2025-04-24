import Landing from "~/landing/Landing";

export function meta() {
  return [
    { title: "Egg Encubation Monitoring" },
    { name: "description", content: "Welcome farmer." },
  ];
}

export default function LandingRoute() {
  return <Landing />;
}
