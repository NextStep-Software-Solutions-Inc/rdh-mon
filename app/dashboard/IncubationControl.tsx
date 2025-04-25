import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import React from "react";
import { Flame, Droplet, Fan, RefreshCw } from "lucide-react";

export function IncubationControlCard() {
    const controls = [
        {
            id: "heat",
            name: "Heating",
            description: "Keeps chamber warm during incubation",
            icon: <Flame className="w-4 h-4 text-red-600" />,
            statusColor: "green",
            isOn: true,
            status: "Active",
        },
        {
            id: "humidifier",
            name: "Humidifier",
            description: "Maintains optimal moisture level",
            icon: <Droplet className="w-4 h-4 text-sky-500" />,
            statusColor: "gray",
            isOn: false,
            status: "Off",
        },
        {
            id: "fan",
            name: "Ventilation Fan",
            description: "Circulates air to prevent heat concentration",
            icon: <Fan className="w-4 h-4 text-indigo-500" />,
            statusColor: "green",
            isOn: true,
            status: "Active",
        },
    ];

    return (
        <Card className="col-span-full rounded-2xl shadow-xl border border-muted bg-gradient-to-br from-white via-white/60 to-muted/20 dark:from-muted dark:to-background/90 backdrop-blur-md transition-all duration-500">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Incubation Controls
                </h2>
                <Separator className="mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {controls.map(({ id, name, description, icon, status, statusColor, isOn }) => (
                        <Card
                            key={id}
                            className={`group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-xl border bg-white/80 dark:bg-muted/60 backdrop-blur-md`}
                        >
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full shadow bg-white dark:bg-muted border border-muted-foreground">
                                        {icon}
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor={id}
                                            className="text-lg font-semibold text-gray-800 dark:text-white"
                                        >
                                            {name}
                                        </Label>
                                        <p className="text-xs text-muted-foreground leading-tight">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span
                                        className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-700 dark:bg-${statusColor}-900/40 dark:text-${statusColor}-300`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full bg-${statusColor}-500 animate-pulse`}
                                        />
                                        {status}
                                    </span>
                                </div>
                                <Switch id={id} defaultChecked={isOn} />
                            </CardContent>
                        </Card>
                    ))}

                    <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-xl border bg-white/80 dark:bg-muted/60 backdrop-blur-lg">
                        <CardContent className="p-5 flex flex-col items-center justify-center gap-4">
                            <div className="p-2 bg-gray-200 dark:bg-muted rounded-full shadow">
                                <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <Button className="w-full font-semibold" variant="secondary">
                                Reset Timer
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
