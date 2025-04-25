import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

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
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
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
            Acquisition needs attention
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
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Hatch Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {hatchRate}%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
