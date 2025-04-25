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
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";

export function SectionCards() {
    const femaleEggs = 1324;
    const maleEggs = 11108;
    const totalEggs = femaleEggs + maleEggs;

    const [aliveFemaleEggs, setAliveFemaleEggs] = useState(360);
    const [aliveEggs, setAliveEggs] = useState(totalEggs);
    const [temperature, setTemperature] = useState(37.8);
    const [tempHistory, setTempHistory] = useState<{ time: number; value: number }[]>([]);

    useEffect(() => {
        const eggInterval = setInterval(() => {
            setAliveEggs(prev => Math.max(prev - (Math.random() < 0.3 ? 1 : 0), 0));
        }, 3000);

        const tempInterval = setInterval(() => {
            setTemperature(prev => {
                const next = parseFloat(
                    Math.max(36.5, Math.min(39.0, prev + (Math.random() - 0.5) * 0.4)).toFixed(2)
                );
                setTempHistory(history => {
                    const timestamp = Date.now();
                    const updated = [...history.slice(-19), { time: timestamp, value: next }];
                    return updated;
                });
                return next;
            });
        }, 3000);

        return () => {
            clearInterval(eggInterval);
            clearInterval(tempInterval);
        };
    }, []);

    const deadEggs = totalEggs - aliveEggs;
    const mortalityRate = (deadEggs / totalEggs) * 100;

    const tempColor =
        temperature < 37.0
            ? "text-blue-600"
            : temperature > 38.5
                ? "text-red-600"
                : "text-green-600";

    const mortalityClass =
        mortalityRate > 20 ? "ring-2 ring-red-300 shadow-lg shadow-red-100" : "";
    const [mortalityHistory, setMortalityHistory] = useState<{ time: number; value: number }[]>([]);
    useEffect(() => {
        const eggInterval = setInterval(() => {
            setAliveEggs(prev => {
                const updated = Math.max(prev - (Math.random() < 0.3 ? 1 : 0), 0);
                const currentMortality = ((totalEggs - updated) / totalEggs) * 100;
                setMortalityHistory(history => {
                    const timestamp = Date.now();
                    return [...history.slice(-19), { time: timestamp, value: parseFloat(currentMortality.toFixed(2)) }];
                });
                return updated;
            });
        }, 3000);
        return () => clearInterval(eggInterval);
    }, []);
    return (
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 xl:grid-cols-4 lg:px-6">
            {/* Total Eggs */}
            <Card className="transition-shadow hover:shadow-2xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-1">🥚 Total Eggs</CardTitle>
                    <CardDescription className="text-sm">Based on current hatching rate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h3 className="text-2xl font-bold">+{totalEggs.toLocaleString()}</h3>
                    <p className="text-sm text-green-600">
                        Eggs Left: {aliveEggs} ({((aliveEggs / totalEggs) * 100).toFixed(1)}%)
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Badge className="bg-green-100 text-green-700 flex items-center gap-1 px-2 py-0.5 rounded-md">
                                <TrendingUpIcon className="w-4 h-4" />
                                +12.5%
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent>Compared to last batch</TooltipContent>
                    </Tooltip>
                    <span className="text-muted-foreground text-xs">Updated: {new Date().toLocaleTimeString()}</span>
                </CardFooter>
            </Card>

            <Card className={`relative overflow-hidden transition hover:shadow-2xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md ${mortalityClass}`}>
                <div className="absolute right-3 bottom-3 text-red-100/30 text-6xl pointer-events-none">
                    <AlertTriangle />
                </div>
                <CardHeader className="relative z-10">
                    <CardDescription className="text-sm font-medium">Hatching Eggs</CardDescription>
                    <CardTitle className="flex items-center gap-2 text-red-600 font-semibold">
                        <AlertTriangle className="w-5 h-5" />
                        Mortality Rate
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                    <p className="text-sm">
                        {mortalityRate.toFixed(1)}% died ({deadEggs} eggs)
                    </p>
                    <Progress value={mortalityRate} className="transition-all duration-500 bg-red-100" />
                    <div className="mt-3 h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mortalityHistory}>
                                <XAxis dataKey="time" hide />
                                <YAxis domain={[0, 100]} hide />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#dc2626"
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={true}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <CardFooter className="relative z-10 flex justify-between text-sm">
                    <Badge className="bg-red-100 text-red-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingDownIcon className="w-4 h-4" />
                        -20%
                    </Badge>
                    <span className="text-muted-foreground">Needs action</span>
                </CardFooter>
            </Card>

            {/* Female Eggs */}
            <Card className="transition hover:shadow-2xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-1">♀️ Female Ducks Hatched</CardTitle>
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

            {/* Temperature with Sparkline */}
            <Card className="relative transition hover:shadow-2xl border rounded-2xl bg-white/90 dark:bg-muted/80 backdrop-blur-md">
                <div className="absolute right-3 bottom-3 text-blue-100/30 text-6xl pointer-events-none">
                    <Thermometer />
                </div>
                <CardHeader>
                    <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-1">
                        🌡️ Temperature
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <Thermometer className={`w-5 h-5 ${tempColor}`} />
                        </div>
                        <div>
                            <h2 className="text-sm text-gray-600">
                                Current: {temperature.toFixed(2)}°C
                            </h2>
                            <Progress
                                value={((temperature - 36.5) / (39 - 36.5)) * 100}
                                className="mt-1 transition-all duration-500"
                            />
                        </div>
                    </div>
                    <div className="mt-3 h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tempHistory}>
                                <XAxis dataKey="time" hide />
                                <YAxis domain={[36.5, 39]} hide />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={true}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                    <Badge className="bg-blue-100 text-blue-700 flex gap-1 rounded-md px-2 py-0.5">
                        <TrendingUpIcon className="w-4 h-4" />
                        +12.5%
                    </Badge>
                    <span className="text-muted-foreground text-xs">Stable</span>
                </CardFooter>
            </Card>
        </div>
    );
}
