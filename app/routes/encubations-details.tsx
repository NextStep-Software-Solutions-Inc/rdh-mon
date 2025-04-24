import EncubationsDetials from "~/encubations-details/EncubationsDetials";

export function meta() {
  return [
    { title: "Egg Encubation Monitoring" },
    { name: "description", content: "Welcome farmer." },
  ];
}

export default function EncubationsDetialsRoute() {
  return <EncubationsDetials />;
}
