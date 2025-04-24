import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Thermometer, Egg, Timer, List, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const survivalData = [
    { day: 1, quality: 50 },
    { day: 5, quality: 70 },
    { day: 10, quality: 85 },
    { day: 14, quality: 95 },
    { day: 16, quality: 98 },
    { day: 18, quality: 96 },
    { day: 21, quality: 90 },
];

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
    const totalEggs = 3600;
    const [aliveEggs, setAliveEggs] = useState(360);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Card className="shadow-lg">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Egg Count</h2>
                    <p className="text-gray-700 text-sm">Total Eggs: {totalEggs}</p>
                    <p className="text-green-600 text-sm">
                        Eggs Left: {aliveEggs} ({((aliveEggs / totalEggs) * 100).toFixed(1)}%)
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" /> Mortality Rate
                    </h2>
                    <p className="text-red-600 text-sm">{mortalityRate.toFixed(1)}% died ({deadEggs} eggs)</p>
                    <Progress value={mortalityRate} className="mt-2 bg-red-100" />
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <Thermometer className="w-6 h-6" />
                        <div>
                            <h2 className="text-xl font-semibold">Temperature</h2>
                            <p className="text-gray-500">Current: {temperature.toFixed(2)}°C</p>
                            <Progress value={((temperature - 36.5) / (39 - 36.5)) * 100} className="mt-2" />
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card className="shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <Egg className="w-6 h-6" />
                        <div>
                            <h2 className="text-xl font-semibold">Humidity</h2>
                            <p className="text-gray-500">Current: 60%</p>
                            <Progress value={60} className="mt-2" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Egg Turning</h2>
                            <p className="text-gray-500">Auto-mode</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <Timer className="w-6 h-6" />
                        <div>
                            <h2 className="text-xl font-semibold">Incubation Timer</h2>
                            <p className="text-gray-500">Day 14 of 21</p>
                            <Progress value={66} className="mt-2" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-full shadow-lg">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Survival Peak Chart</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={survivalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="day" label={{ value: "Days", position: "insideBottomRight", offset: -5 }} />
                            <YAxis label={{ value: "Quality (%)", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="quality" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-full shadow-lg">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Activities Log</h2>
                    <Separator className="mb-4" />
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                        {activityLog.map((entry, idx) => (
                            <li key={idx}>{entry}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="col-span-full shadow-lg">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Controls</h2>
                    <Separator className="mb-4" />
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <Label htmlFor="heat">Heating</Label>
                            <Switch id="heat" defaultChecked />
                        </div>
                        <div>
                            <Label htmlFor="humidifier">Humidifier</Label>
                            <Switch id="humidifier" />
                        </div>
                        <div>
                            <Label htmlFor="fan">Ventilation Fan</Label>
                            <Switch id="fan" defaultChecked />
                        </div>
                        <div>
                            <Button>Reset Timer</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
