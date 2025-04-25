import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { faker } from '@faker-js/faker';
import NewDetectionDialog from "~/components/NewDetectionDialog";

const generateDetectionCards = (type: "gender"|"life") => {

  const eggCount = faker.number.int({ min: 1000, max: 10000 });
  const alive = faker.number.int({ min: 1000, max: eggCount });
  const dead = eggCount - alive;
  return {
    date: faker.date.recent().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    eggType: faker.helpers.arrayElement(["Duck", "Chicken", "Quail"]),
    eggCount,
    alive,
    dead,
    image: type === "gender"? "/gender.jpg" : "/life.jpg",
  }
}

const randomDetectionCounts = faker.number.int({ min: 6, max: 10 });
const genderDetectionCards = Array.from({ length: randomDetectionCounts }, () => generateDetectionCards("gender"));
const lifeDetectionCards = Array.from({ length: randomDetectionCounts }, () => generateDetectionCards("life"));

export default function Detection() {
  return (
    <main className="px-4 relative">
      <section>
        <h1 className="text-2xl font-bold">Detection</h1>
        <p className="text-gray-600">
          Early detection of egg gender and health is crucial for successful incubation and hatching.
        </p>
      </section>
      <section className="mt-4">
        <Tabs defaultValue="gender" className="w-full">
          <TabsList className="sticky top-0 z-10 bg-gray-500/10 backdrop-blur-md border-b border-gray-200 w-full">
            <TabsTrigger value="gender">Gender</TabsTrigger>
            <TabsTrigger value="life">Life</TabsTrigger>
          </TabsList>
          <TabsContent value="gender">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {
                genderDetectionCards.map((card, index) => (
                    <GenderDetectionCard key={index} {...card}/>
                ))
              }
            </div>
          </TabsContent>
          <TabsContent value="life">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {
                lifeDetectionCards.map((card, index) => (
                    <LifeDetectionCard key={index} {...card}/>
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="fixed top-10 right-0 p-4 z-20">
        <NewDetectionDialog/>
      </section>
    </main>
  );
}

const LifeDetectionCard = ({ date, eggType, eggCount, alive, dead, image }: ReturnType<typeof generateDetectionCards>) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start space-y-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-4">{eggType} <Badge variant="outline">{eggCount} pcs</Badge></CardTitle>
        <CardDescription className="text-sm text-gray-500">{date}</CardDescription>
      </CardHeader>
      <img src={image ? image: "eggspose.png"} alt={`${eggType} egg`} className="object-center h-[300px]" />
      <div className="flex justify-between mt-4 mx-4">
        <span>Alive: {alive}</span>
        <span>Dead: {dead}</span>
      </div>
    </Card>
  )
}

const GenderDetectionCard = ({ date, eggType, eggCount, alive, dead, image }: ReturnType<typeof generateDetectionCards>) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start">
        <CardTitle className="text-lg font-semibold flex items-center gap-4">{eggType} <Badge variant="outline">{eggCount} pcs</Badge></CardTitle>
        <CardDescription className="text-sm text-gray-500">{date}</CardDescription>
      </CardHeader>
      <img src={image ? image: "eggspose.png"} alt={`${eggType} egg`} className="object-center h-[300px]" />
      <div className="flex justify-between mt-2 mx-4">
        <span>Male: {alive}</span>
        <span>Female: {dead}</span>
      </div>
    </Card>
  )
}