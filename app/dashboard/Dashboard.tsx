"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import {SectionCards} from "~/dashboard/SectionCards";
import {IncubationChartCard} from "~/dashboard/IncubationCard";
import { IncubatorPerformanceTable} from "~/dashboard/IncubatorPerformance";
import {IncubationControlCard} from "~/dashboard/IncubationControl";
import {IncomeSectionCards} from "~/dashboard/IncomeSectionCards";

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
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState("30d");

    useEffect(() => {
        if (isMobile) setTimeRange("7d");
    }, [isMobile]);


    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <IncomeSectionCards/>
                    <SectionCards/>


                    <div
                        className="*:data-[slot=card]:shadow-xs  @5xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
                        <IncubationChartCard/>
                        <IncubatorPerformanceTable/>
                    </div>

                    <div
                        className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
                        <IncubationControlCard/>
                    </div>
                    </div>
                </div>
            </div>
            );
            }
