import Detection from "~/detection/Detection";

export function meta() {
  return [
    { title: "Egg Encubation Monitoring" },
    { name: "description", content: "Welcome farmer." },
  ];
}

export default function DetectionRoute() {
  return <Detection />;
}
