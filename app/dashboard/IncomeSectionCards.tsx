import {
    AlertTriangle,
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

export function IncomeSectionCards() {
    const femaleEggs = 1324;
    const maleEggs = 11108;
    const totalEggs = femaleEggs + maleEggs;
    const [aliveFemaleEggs, setAliveFemaleEggs] = useState(360);
    const [aliveEggs, setAliveEggs] = useState(femaleEggs + maleEggs);
    const [temperature, setTemperature] = useState(37.8);

    useEffect(() => {
        const eggInterval = setInterval(() => {
            setAliveEggs(prev => Math.max(prev - (Math.random() < 0.3 ? 1 : 0), 0));
        }, 3000);

        const tempInterval = setInterval(() => {
            setTemperature(prev => {
                const next = prev + (Math.random() - 0.5) * 0.4;
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
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 xl:grid-cols-4 lg:px-6">
            {/* Projected Income */}
            <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Total Projected Income</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">At ₱35 per duckling</CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className="text-3xl font-bold text-green-700">
                        ₱{(aliveEggs * 35).toLocaleString("en-PH")}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {aliveEggs.toLocaleString()} ducklings expected
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-green-100 text-green-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingUpIcon className="w-4 h-4" />
                        +15%
                    </Badge>
                    <span className="text-muted-foreground">vs. previous cycle</span>
                </CardFooter>
            </Card>

            {/* Average Income per Duckling */}
            <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Avg Income per Duckling</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">Price per unit remains steady</CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className="text-3xl font-bold text-amber-700">₱35.00</h2>
                    <p className="text-sm text-gray-600">Fixed rate per duckling</p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-yellow-100 text-yellow-800 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingUpIcon className="w-4 h-4" />
                        Stable
                    </Badge>
                    <span className="text-muted-foreground">No price change</span>
                </CardFooter>
            </Card>

            {/* Cost Estimate */}
            <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Estimated Costs</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">Feeds, power, labor</CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className="text-3xl font-bold text-red-600">
                        ₱{(totalEggs * 8).toLocaleString("en-PH")}
                    </h2>
                    <p className="text-sm text-gray-600">
                        ₱8 per egg (all stages)
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-red-100 text-red-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingDownIcon className="w-4 h-4" />
                        +5%
                    </Badge>
                    <span className="text-muted-foreground">Inflation-adjusted</span>
                </CardFooter>
            </Card>

            {/* Net Profit */}
            <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Net Projected Profit</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">Income minus operational costs</CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className="text-3xl font-bold text-emerald-600">
                        ₱{((aliveEggs * 35) - (totalEggs * 8)).toLocaleString("en-PH")}
                    </h2>
                    <p className="text-sm text-gray-600">Net after costs</p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-emerald-100 text-emerald-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingUpIcon className="w-4 h-4" />
                        +9.3%
                    </Badge>
                    <span className="text-muted-foreground">Profitable batch</span>
                </CardFooter>
            </Card>
        </div>
    );
}
