import {
    AlertTriangle,
    Egg,
    Thermometer,
    TrendingDownIcon,
    TrendingUpIcon
} from "lucide-react";

import { Badge } from "~/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

import React, { useEffect, useState } from "react";

export function SectionCards() {
    const femaleEggs = 1324;
    const maleEggs = 11108;
    const totalEggs = femaleEggs + maleEggs;
    const [aliveFemaleEggs, setAliveFemaleEggs] = useState(360);
    const [aliveEggs, setAliveEggs] = useState(femaleEggs + maleEggs);
    const [temperature, setTemperature] = useState(37.8);

    useEffect(() => {
        const eggInterval = setInterval(() => {
            setAliveEggs((prev) => Math.max(prev - (Math.random() < 0.3 ? 1 : 0), 0));
        }, 3000);

        const tempInterval = setInterval(() => {
            setTemperature((prev) => {
                let next = prev + (Math.random() - 0.5) * 0.4;
                return parseFloat(Math.max(36.5, Math.min(39.0, next)).toFixed(2));
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
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {/* Projected Income Card */}
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardTitle>Projected Income</CardTitle>
                    <CardDescription>Based on current hatching rate</CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className="text-3xl font-bold">
                        {new Intl.NumberFormat("en-PH", {
                            style: "currency",
                            currency: "PHP"
                        }).format(360 * 35)}
                    </h1>
                    <p className="text-muted-foreground text-sm">₱35 per duckling</p>
                    <div className="mt-4">
                        <p className="text-sm text-gray-700">Total Eggs</p>
                        <h2 className="text-2xl font-semibold">+{totalEggs.toLocaleString()}</h2>
                        <p className="text-green-600 text-sm">Eggs Left: {aliveEggs} ({((aliveEggs / totalEggs) * 100).toFixed(1)}%)</p>
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                        <TrendingDownIcon className="w-3 h-3" />
                        +12.5%
                    </Badge>
                    <div className="text-sm text-muted-foreground">Visitors for the last 6 months</div>
                </CardFooter>
            </Card>

            {/* Mortality Rate Card */}
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Hatching Eggs</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Mortality Rate
                    </CardTitle>
                    <p className="text-sm">{mortalityRate.toFixed(1)}% died ({deadEggs} eggs)</p>
                    <Progress value={mortalityRate} className="mt-2 bg-red-100" />
                    <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                            <TrendingDownIcon className="w-3 h-3" />
                            -20%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="text-sm text-muted-foreground">
                    Down 20% this period – Acquisition needs attention
                </CardFooter>
            </Card>

            {/* Female Ducklings Card */}
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardTitle className="text-2xl font-semibold">Female Ducks Hatched</CardTitle>
                    <p className="text-xl font-semibold text-purple-600">
                        +{femaleEggs.toLocaleString()}
                    </p>
                    <p className="text-purple-500 text-sm">
                        Female Eggs Left: {aliveFemaleEggs} ({((aliveFemaleEggs / totalEggs) * 100).toFixed(1)}%)
                    </p>
                    <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                            <TrendingUpIcon className="w-3 h-3" />
                            +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="text-sm text-muted-foreground">
                    Visitors for the last 6 months
                </CardFooter>
            </Card>

            {/* Temperature Card */}
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription><h2 className="text-xl font-semibold">Temperature</h2></CardDescription>
                    <div className="flex items-center gap-3 mt-2">
                        <Thermometer className="w-6 h-6 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-600">Current: {temperature.toFixed(2)}°C</p>
                            <Progress value={((temperature - 36.5) / (39 - 36.5)) * 100} className="mt-2" />
                        </div>
                    </div>
                    <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                            <TrendingUpIcon className="w-3 h-3" />
                            +12.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="text-sm text-muted-foreground">
                    Strong user retention – Engagement exceeded targets
                </CardFooter>
            </Card>
        </div>
    );
}
