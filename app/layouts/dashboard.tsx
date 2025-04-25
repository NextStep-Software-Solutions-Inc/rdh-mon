import { Outlet, useLocation } from 'react-router'
import { AppSidebar } from "~/components/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"


export default function DashboardLayout() {

const pathname = useLocation().pathname
const paths = pathname.split("/").filter((path) => path !== "")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
              {
                paths.map((path, index) => {
                  const href = `/${paths.slice(0, index + 1).join("/")}`
                  return (
                    <>
                      {
                        index < paths.length - 1 ? (
                          <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={href}>
                              {path.charAt(0).toUpperCase() + path.slice(1)}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem>
                            <BreadcrumbPage>{path.charAt(0).toUpperCase() + path.slice(1)}</BreadcrumbPage>
                          </BreadcrumbItem>
                        )
                      }
                      {
                        index < paths.length - 1 && (
                          <BreadcrumbSeparator key={index + 1} className="hidden md:block" />
                        )
                      }
                    </>
                  )
                })
              }
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}
