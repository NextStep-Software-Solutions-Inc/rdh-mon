"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"


const eggLossPerInterval = {
  0: 0,
  7: 20,
  14: undefined,
  21: undefined,
  28: undefined,
}


const chartConfig = {
  eggs: {
    label: "Eggs",
    color: "#0000ff",
  },
  threshold: {
    label: "Threshold",
    color: "#00ff00",
  },
} satisfies ChartConfig

export default function EncubationAreaChart({initialEggCount}: {initialEggCount: number}) {

// Dynamically calculate the eggs count based on the loss per interval
const chartData = Object.keys(eggLossPerInterval).map((key, index) => {
  const days = `${key} ${key === "0" ? "Day" : "Days"}`;
  console.log({days})
  const cumulativeLoss = Object.values(eggLossPerInterval)
    .slice(0, index + 1)
    .reduce((acc, loss) => acc + (loss || 0), 0);
    
  const eggs = initialEggCount - (cumulativeLoss ?? 0);
  return { days, eggs, threshold: 80 };
});
console.log({chartData})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Encubation Realtime Chart</CardTitle>
        <CardDescription>
            This chart shows the realtime encubation data for the last 6 dayss.
            The data is updated every 5 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="days"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="threshold"
              type="natural"
              fill="var(--color-threshold)"
              fillOpacity={0.4}
              stroke="var(--color-threshold)"
            />
            <Area
              dataKey="eggs"
              type="natural"
              fill="var(--color-eggs)"
              fillOpacity={0.4}
              stroke="var(--color-eggs)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Full Encubation Cycle
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
