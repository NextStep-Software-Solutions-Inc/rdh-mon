"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Cookie,
  EggIcon,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Magnet,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "~/components/MainNav"
import { NavProjects } from "~/components/NavProjects"
import { NavUser } from "~/components/NavUser"
import { TeamSwitcher } from "~/components/TeamSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@ficco.org",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "FICCO - Rice Duck Hatchery",
      logo: Cookie,
      plan: "Enterprise",
    },
    {
      name: "ORO - Egg Blend",
      logo: AudioWaveform,
      plan: "Basic",
    },
    {
      name: "Edward - Hatchback",
      logo: Command,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: false
    },
    {
      title: "Encubations",
      url: "/encubations",
      icon: EggIcon,
    },
    {
      title: "Detection",
      url: "/detection",
      icon: Magnet,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
