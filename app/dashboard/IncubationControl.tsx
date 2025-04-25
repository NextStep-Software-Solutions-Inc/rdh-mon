import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import React from "react";

export function IncubationControlCard() {
    return (
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
    );
}

