"use client";

import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "~/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { useIsMobile } from "~/hooks/use-mobile";
import {SectionCards} from "~/dashboard/SectionCards";
import {Separator} from "~/components/ui/separator";
import {Label} from "~/components/ui/label";
import {Switch} from "~/components/ui/switch";
import {Button} from "~/components/ui/button";
import {TrendingUpIcon} from "lucide-react";

const chartData = [
    { day: 1, quality: 50 },
    { day: 5, quality: 70 },
    { day: 10, quality: 85 },
    { day: 14, quality: 95 },
    { day: 16, quality: 98 },
    { day: 18, quality: 96 },
    { day: 21, quality: 90 },
    { day: 28, quality: 100 },
];


const chartConfig = {
    hatchRate: {
        label: "Hatch Rate",
        color: "#c89237",
    },
    temperature: {
        label: "Temperature",
        color: "#c89237",
    },
};
const activityLog = [
    "Day 1: Eggs loaded into incubator",
    "Day 3: Temperature check and calibration",
    "Day 7: Egg turning verified",
    "Day 10: Humidity adjusted to 60%",
    "Day 14: Start of Survival Peak",
    "Day 16: Highest viability recorded",
    "Day 18: Preparing for hatching phase"
];

export default function EggIncubatorDashboard() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState("30d");

    useEffect(() => {
        if (isMobile) setTimeRange("7d");
    }, [isMobile]);

    const filteredData = chartData; // for demo, use all data

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards/>

                    <div
                        className="*:data-[slot=card]:shadow-xs  @5xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
                        <Card className="">
                            <CardHeader className="relative">
                                <CardTitle>Incubation Egg Viability</CardTitle>
                                <CardDescription>
          <span className="@[540px]/card:block hidden">
            Your hatch rate is on track compared to previous cycles
          </span>
                                    <span className="@[540px]/card:hidden">Last 7 days</span>
                                </CardDescription>
                                <div className="absolute right-4 top-4">
                                    <ToggleGroup
                                        type="single"
                                        value={timeRange}
                                        onValueChange={setTimeRange}
                                        variant="outline"
                                        className="@[767px]/card:flex hidden"
                                    >
                                        <ToggleGroupItem value="90d" className="h-8 px-2.5">
                                            Last 3 months
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="30d" className="h-8 px-2.5">
                                            Last 30 days
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="7d" className="h-8 px-2.5">
                                            Last 7 days
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                    <Select value={timeRange} onValueChange={setTimeRange}>
                                        <SelectTrigger className="@[767px]/card:hidden flex w-40">
                                            <SelectValue placeholder="Last 3 months"/>
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="90d" className="rounded-lg">
                                                Last 3 months
                                            </SelectItem>
                                            <SelectItem value="30d" className="rounded-lg">
                                                Last 30 days
                                            </SelectItem>
                                            <SelectItem value="7d" className="rounded-lg">
                                                Last 7 days
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                                <ChartContainer
                                    config={chartConfig}
                                    className="aspect-auto h-[250px] w-full"
                                >
                                    <AreaChart data={filteredData}>
                                        <defs>
                                            <linearGradient id="fillQuality" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-quality)" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="var(--color-hatchRate)"
                                                      stopOpacity={0.1}/>
                                            </linearGradient>
                                            <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-temperature)"
                                                      stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="var(--color-temperature)"
                                                      stopOpacity={0.1}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false}/>
                                        <XAxis
                                            dataKey="day"
                                            tickLine={true}
                                            axisLine={true}
                                            tickMargin={8}
                                            minTickGap={32}
                                            tickFormatter={(value) => `Day ${value}`}
                                        />
                                        <YAxis/>
                                        <ChartTooltip
                                            cursor={false}
                                            content={
                                                <ChartTooltipContent
                                                    labelFormatter={(value) => {
                                                        return value;
                                                    }}
                                                    indicator="dot"
                                                />
                                            }
                                        />
                                        <Area
                                            dataKey="quality"
                                            type="monotone"
                                            fill="url(#fillHatchRate)"
                                            stroke="#c89237"
                                            stackId="a"
                                            dot={true}
                                        />
                                        <Area
                                            dataKey="day"
                                            type="monotone"
                                            fill="url(#fillHatchRate)"
                                            stroke="#c89237"
                                            stackId="a"
                                            dot={true}
                                        />

                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Up by 8.6% compared to previous cycle <TrendingUpIcon className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                   Showing egg viability over the 28-day cycle (weekly checks: Days 7,14,21,28 )
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="">
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-2">Activities Log</h2>
                                <Separator className="mb-4"/>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                    {activityLog.map((entry, idx) => (
                                        <li key={idx}>{entry}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div
                        className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
                        <Card className="col-span-full shadow-lg">
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-2">Controls</h2>
                                <Separator className="mb-4"/>
                                <div className="flex flex-wrap gap-4">
                                    <div>
                                        <Label htmlFor="heat">Heating</Label>
                                        <Switch id="heat" defaultChecked/>
                                    </div>
                                    <div>
                                        <Label htmlFor="humidifier">Humidifier</Label>
                                        <Switch id="humidifier"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="fan">Ventilation Fan</Label>
                                        <Switch id="fan" defaultChecked/>
                                    </div>
                                    <div>
                                        <Button>Reset Timer</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    </div>
                </div>
            </div>
            );
            }
