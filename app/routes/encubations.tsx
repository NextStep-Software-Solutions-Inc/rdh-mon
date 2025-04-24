import Encubations from "~/encubations/Encubations";

export function meta() {
  return [
    { title: "Egg Encubation Monitoring" },
    { name: "description", content: "Welcome farmer." },
  ];
}

export default function EncubationRoute() {
  return <Encubations />;
}
