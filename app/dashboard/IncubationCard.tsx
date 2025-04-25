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
    { day: 1, quality: 50, temperature: 37.1 },
    { day: 5, quality: 70, temperature: 37.5 },
    { day: 10, quality: 85, temperature: 37.6 },
    { day: 14, quality: 95, temperature: 37.8 },
    { day: 16, quality: 98, temperature: 38.0 },
    { day: 18, quality: 96, temperature: 37.9 },
    { day: 21, quality: 90, temperature: 37.7 },
    { day: 28, quality: 100, temperature: 37.6 },
];

const chartConfig = {
    quality: {
        label: "Egg Viability",
        color: "#c89237",
    },
    temperature: {
        label: "Temperature (°C)",
        color: "#4caf50",
    },
};

export function IncubationChartCard() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState("30d");

    useEffect(() => {
        if (isMobile) setTimeRange("7d");
    }, [isMobile]);

    return (
        <Card className="rounded-2xl shadow-md border border-muted">
            <CardHeader className="relative pb-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                    Incubation Egg Viability
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground">
                    Your hatch rate is on track compared to previous cycles
                </CardDescription>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="flex gap-2"
                    >
                        <ToggleGroupItem value="90d" className="h-8 px-3">90 Days</ToggleGroupItem>
                        <ToggleGroupItem value="30d" className="h-8 px-3">30 Days</ToggleGroupItem>
                        <ToggleGroupItem value="7d" className="h-8 px-3">7 Days</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-40 h-8">
                            <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="90d">Last 3 months</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillQuality" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#c89237" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="#c89237" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#4caf50" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => `Day ${value}`}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(label) => `Day ${label}`}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            type="monotone"
                            dataKey="quality"
                            stroke="#c89237"
                            fill="url(#fillQuality)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temperature"
                            stroke="#4caf50"
                            fill="url(#fillTemperature)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-1 text-sm px-4 sm:px-6 pb-4">
                <div className="font-medium text-green-600 flex items-center gap-2">
                    Up by 8.6% compared to previous cycle <TrendingUpIcon className="h-4 w-4" />
                </div>
                <p className="text-muted-foreground">
                    Egg viability and internal temperature trends over a 28-day incubation cycle.
                </p>
            </CardFooter>
        </Card>
    );
}
