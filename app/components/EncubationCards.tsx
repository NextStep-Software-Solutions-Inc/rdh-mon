import { Power, Thermometer, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"


export interface EncubationCardsProps {
    maleChickPrice: number
    femaleChickPrice: number
    penoyCount: number
    balotCount: number
    initilaEggCount: number
    penoyPrice: number
    balotPrice: number
    eggPrice: number
}


export default function EncubationCards({eggPrice, initilaEggCount, maleChickPrice, femaleChickPrice, penoyCount,penoyPrice, balotCount, balotPrice}: EncubationCardsProps) {


    // compute the hatch rate
    // the hatch rate is the percentage of eggs that hatch into chicks
    // total hatch eggs = initial egg count - (penoyCount + balotCount)
    const hatchedEggCount = initilaEggCount - (penoyCount + balotCount)
    const hatchRate = (hatchedEggCount / initilaEggCount) * 100

    const totalPenoyRevenue = penoyCount * penoyPrice
    const totalBalotRevenue = balotCount * balotPrice
    // the count of male and female chicks is unknown, so we
    // assume that the revenue is equally split to male and female chicks
    // add the balot and penoy revenue
    const totalChickRevenue = ((initilaEggCount * hatchRate) / 100 * (maleChickPrice + femaleChickPrice))
    const totalPotentialRevenue = totalChickRevenue + totalPenoyRevenue + totalBalotRevenue
    
    const capital = initilaEggCount * eggPrice
    const opex = 2500

    // compute the gain percentage
    const gainPercentage = ((totalPotentialRevenue - (capital + opex)) / (capital + opex)) * 100

    // make the number in money formatted with commas
    const formattedToMoney = (value: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(value)
    }

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card ">
      <Card className="~container/card">
        <CardHeader className="relative">
          <CardDescription>Total Potential Revenue</CardDescription>
          <CardTitle className="~[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {formattedToMoney(totalPotentialRevenue)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +{gainPercentage.toFixed(2)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this period <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Combine male, female chicks, penoy and balot revenue
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Penoy Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
           {formattedToMoney(totalPenoyRevenue)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Non hatching eggs revenue
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Balot Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {formattedToMoney(totalBalotRevenue)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Non hatching eggs revenue
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Hatch Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {hatchRate.toFixed(2)}%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
      <TemperatureCard/>
      <EnergyCard/>
    </div>
    </>
  )
}


const TemperatureCard = () => {
  
    const [temperature, setTemperature] = useState(37.8);

    useEffect(() => {
        const tempInterval = setInterval(() => {
            setTemperature(prev => {
                const next = prev + (Math.random() - 0.5) * 0.4;
                return parseFloat(Math.max(36.5, Math.min(39.0, next)).toFixed(2));
            });
        }, 3000);

        return () => {
            clearInterval(tempInterval);
        };
      }, []);

  return (
    <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
        <CardHeader>
            <CardTitle className="text-lg font-bold">Temperature</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-full">
                    <p className="text-xl font-semibold text-gray-600 flex justify-between">
                        <span>{temperature.toFixed(2)}</span> <span>°C</span>
                    </p>
                    <Progress
                        value={((temperature - 36.5) / (39 - 36.5)) * 100}
                        className="mt-1"
                    />
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
            <Badge className="bg-blue-100 text-blue-700 flex gap-1 rounded-md px-2 py-0.5">
                <TrendingUpIcon className="w-4 h-4" />
                +12.5%
            </Badge>
            <span className="text-muted-foreground">Stable conditions</span>
        </CardFooter>
    </Card>
  )
}

const EnergyCard = () => {
  const [power, setPower] = useState(0.234);

  useEffect(() => {
    const eneryInterval = setInterval(() => {
      setPower((prev) => {
        const next = prev + (Math.random() - 0.2) * 0.5;
        // Fix: Correct the range clamping
        return parseFloat(Math.max(0.215, Math.min(0.494, next)).toFixed(4));
      });
    }, 1000);

      return () => {
          clearInterval(eneryInterval);
      };
  }, []);
return (
<Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
    <CardHeader>
        <CardTitle className="text-lg font-bold">Energy</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Power className="w-5 h-5 text-blue-600" />
            </div>
            <div className="w-full">
                <p className="text-gray-600 text-xl font-semibold flex justify-between">
                    <span>{power.toFixed(3)}</span> <span>kWH</span>
                </p>
                <Progress
                    value={((power - 0.234) / (1 - 0.234)) * 100}
                    className="mt-1 "
                />
            </div>
        </div>
    </CardContent>
    <CardFooter className="flex justify-between text-sm">
        <Badge className="bg-blue-100 text-blue-700 flex gap-1 rounded-md px-2 py-0.5">
            <TrendingUpIcon className="w-4 h-4" />
            +12.5%
        </Badge>
        <span className="text-muted-foreground">Stable conditions</span>
    </CardFooter>
</Card>
)
}