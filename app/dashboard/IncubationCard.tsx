"use client";

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
    CardDescription,
    CardFooter,
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
import { TrendingUpIcon } from "lucide-react";
import { useIsMobile } from "~/hooks/use-mobile";
import React, { useEffect, useState } from "react";

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

export function IncubationChartCard() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState("30d");

    useEffect(() => {
        if (isMobile) setTimeRange("7d");
    }, [isMobile]);

    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle>Incubation Egg Viability</CardTitle>
                <CardDescription>
                    <div className="flex justify-between flex-wrap gap-2">
                        <span>Your hatch rate is on track compared to previous cycles</span>
                        <span>Last 7 days</span>
                    </div>
                </CardDescription>
                <CardDescription className="relative">
                    <div
                        className="flex justify-between flex-wrap gap-2">
                        <ToggleGroup
                            type="single"
                            value={timeRange}
                            onValueChange={setTimeRange}
                            variant="outline"
                            className="flex"
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
                            <SelectTrigger className="flex w-40">
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
                </CardDescription>

            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillQuality" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-quality)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-hatchRate)" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0.1}/>
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
                                    labelFormatter={(value) => value}
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
                            stroke="hsl(141 53% 53%)"
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
    );
}
