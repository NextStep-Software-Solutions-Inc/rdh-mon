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

export function SectionCards() {
    const femaleEggs = 1324;
    const maleEggs = 11108;
    const totalEggs = femaleEggs + maleEggs;
    const [aliveFemaleEggs, setAliveFemaleEggs] = useState(360);
    const [aliveEggs, setAliveEggs] = useState(femaleEggs + maleEggs);

    useEffect(() => {
        const eggInterval = setInterval(() => {
            setAliveEggs(prev => Math.max(prev - (Math.random() < 0.3 ? 1 : 0), 0));
        }, 3000);

        return () => {
            clearInterval(eggInterval);
        };
    }, []);

    const deadEggs = totalEggs - aliveEggs;
    const mortalityRate = (deadEggs / totalEggs) * 100;

    return (
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 xl:grid-cols-3 lg:px-6">
           <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Total Eggs</CardTitle>
                    <CardDescription>Based on current hatching rate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-2xl font-semibold">+{totalEggs.toLocaleString()}</h3>
                        <p className="text-sm text-green-600">
                            Eggs Left: {aliveEggs} ({((aliveEggs / totalEggs) * 100).toFixed(1)}%)
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-green-100 text-green-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingUpIcon className="w-4 h-4" />
                        +12.5%
                    </Badge>
                    <span className="text-muted-foreground">Last 6 months</span>
                </CardFooter>
            </Card>

            <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardDescription className="text-sm font-medium">Hatching Eggs</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Mortality Rate
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm">
                        {mortalityRate.toFixed(1)}% died ({deadEggs} eggs)
                    </p>
                    <Progress value={mortalityRate} className="bg-red-100" />
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-red-100 text-red-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingDownIcon className="w-4 h-4" />
                        -20%
                    </Badge>
                    <span className="text-muted-foreground">Needs action</span>
                </CardFooter>
            </Card>

            <Card className="transition hover:shadow-xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Female Ducks Hatched</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <h3 className="text-2xl font-semibold text-purple-600">
                        +{femaleEggs.toLocaleString()}
                    </h3>
                    <p className="text-sm text-purple-500">
                        Female Eggs Left: {aliveFemaleEggs} ({((aliveFemaleEggs / totalEggs) * 100).toFixed(1)}%)
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-purple-100 text-purple-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingUpIcon className="w-4 h-4" />
                        +12.5%
                    </Badge>
                    <span className="text-muted-foreground">Last 6 months</span>
                </CardFooter>
            </Card>

            {/* Temperature */}
            

        </div>
    );
}
