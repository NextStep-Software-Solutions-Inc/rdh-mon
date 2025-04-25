"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import {SectionCards} from "~/dashboard/SectionCards";
import {IncubationChartCard} from "~/dashboard/IncubationCard";
import { IncubatorPerformanceTable} from "~/dashboard/IncubatorPerformance";
import {IncubationControlCard} from "~/dashboard/IncubationControl";
import {IncomeSectionCards} from "~/dashboard/IncomeSectionCards";


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
