import { useParams, useSearchParams } from "react-router";
import EncubationAreaChart from "~/components/charts/EncubationAreaChart";
import EncubationCards, { type EncubationCardsProps } from "~/components/EncubationCards";
import EncubationCompleteDialog from "~/components/EncubationCompleteDialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import UpdateEncubationStatusDialog from "~/components/UpdateEncubationStatusDialog";

type Encubation = {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
  survivalThreshold: number;
  eggCount: number;
  eggType: string;
  intervalDays: number;
}

const encubation: Encubation = {
  id: 1,
  startDate: "2025-04-25",
  endDate: "2025-05-22",
  status: "In Progress",
  survivalThreshold: 80,
  eggCount: 100,
  eggType: "duck",
  intervalDays: 7,
}

export default function EncubationsDetials() {
  const {encubationId} = useParams<{encubationId: string}>()
  const [searchParams, setSearchParams] = useSearchParams();

  const complete = searchParams.get("complete") === "true";
   
  const handleCloseComplete = (open: boolean) => {
    setSearchParams(prev => {
      prev.set("complete", open ? "true" : "false");
      return prev;
    });
  }
  

  const encubationStats: EncubationCardsProps = {
    maleChickPrice: 5,
    balotCount: 20,
    balotPrice: 15,
    penoyCount: 10,
    penoyPrice: 7,
    femaleChickPrice: 75,
    initilaEggCount: encubation.eggCount,
    eggPrice: 7
  }

  return (
    <main className="px-4 space-y-4">
      <section>
        <h1 className="text-2xl font-bold">Encubation # {encubationId} Details</h1>
        <p className="text-gray-600">Start date: {encubation.startDate} - End date: {encubation.endDate}</p>
        <div className="space-x-2">
          <Badge variant="destructive">{encubation.status}</Badge>
          <Badge>{encubation.eggType}</Badge>
          <Badge variant="secondary">{encubation.eggCount}</Badge>
        </div>
      </section>
      <section className="">
          <EncubationCards {...encubationStats}/>
      </section>
      <section>
        <EncubationAreaChart/>
      </section>
      <div>
        <UpdateEncubationStatusDialog/>
        <EncubationCompleteDialog open={complete} onOpenChange={handleCloseComplete}/>
      </div>
    </main>
  );
}