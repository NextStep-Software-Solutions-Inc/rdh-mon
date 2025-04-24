import {AlertTriangle, Egg, Thermometer, TrendingDownIcon, TrendingUpIcon} from "lucide-react"

import { Badge } from "~/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import React, {useEffect, useState} from "react";
import {Progress} from "~/components/ui/progress";

export function SectionCards() {
    const femaleEggs = 1324
    const maleEggs = 11108
    const totalEggs = maleEggs + femaleEggs;
    const [aliveFemaleEggs, setAliveFemaleEggs] = useState(360);
    const [aliveEggs, setAliveEggs] = useState(360 + aliveFemaleEggs);
    const [temperature, setTemperature] = useState(37.8);


    useEffect(() => {
        const eggInterval = setInterval(() => {
            setAliveEggs((prev) => {
                const next = prev - (Math.random() < 0.3 ? 1 : 0); // fewer dies
                return next < 0 ? 0 : next;
            });
        }, 3000);

        const tempInterval = setInterval(() => {
            setTemperature((prev) => {
                const change = (Math.random() - 0.5) * 0.4;
                let next = prev + change;
                next = Math.max(36.5, Math.min(39, next)); // clamp within realistic range
                return parseFloat(next.toFixed(2));
            });
        }, 3000);

        return () => {
            clearInterval(eggInterval);
            clearInterval(tempInterval);
        };
    }, []);

    const deadEggs = totalEggs - aliveEggs;
    const mortalityRate = (deadEggs / totalEggs) * 100;

    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card">
                <CardHeader className="relative">

                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        <p className="text-gray-700 text-sm">Total Eggs</p>
                        <h1 className="text-xxl font-semibold mb-2"> {totalEggs}</h1>

                        <p className="text-green-600 text-sm">
                            Eggs Left: {aliveEggs} ({((aliveEggs / totalEggs) * 100).toFixed(1)}%)
                        </p>
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3"/>
                            +12.5%
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
                    <CardDescription>Hatching Eggs</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500"/> Mortality Rate
                        </h2>
                        <p className="text-red-600 text-sm">{mortalityRate.toFixed(1)}% died ({deadEggs} eggs)</p>
                        <Progress value={mortalityRate} className="mt-2 bg-red-100"/>
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3"/>
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

                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        <p className="text-gray-700 text-sm">Female Ducks Hatched</p>
                        <h1 className="text-xxl font-semibold mb-2"> {femaleEggs}</h1>

                        <p className="text-purple-500 text-sm">
                            Female Eggs Left: {aliveFemaleEggs} ({((aliveFemaleEggs / totalEggs) * 100).toFixed(1)}%)
                        </p>
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3"/>
                            +12.5%
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
                    <CardDescription><h2 className="text-xl font-semibold">Temperature</h2></CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        <div className="flex items-center gap-4">
                            <Thermometer className="w-6 h-6"/>
                            <div>

                                <p className="text-gray-500">Current: {temperature.toFixed(2)}°C</p>
                                <Progress value={((temperature - 36.5) / (39 - 36.5)) * 100} className="mt-2"/>
                            </div>
                        </div>
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3"/>
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
        </div>
    )
}
