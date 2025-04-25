"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

export type IncubatorBatch = {
    incubator: string;
    batch: string;
    successRate: number;
};

const data: IncubatorBatch[] = [
    { incubator: "Hatched", batch: "INC-29032", successRate: 95 },
    { incubator: "Ongoing", batch: "INC-90343", successRate: 92 },
    { incubator: "Failed", batch: "INC-94824", successRate: 97 },
];

const columns: ColumnDef<IncubatorBatch, any>[] = [
    {
        accessorKey: "incubator",
        header: "Incubator",
        cell: ({ getValue }) => (
            <span className="font-medium text-gray-800 dark:text-gray-100">{getValue()}</span>
        ),
    },
    {
        accessorKey: "batch",
        header: "Batch",
        cell: ({ getValue }) => (
            <span className="text-gray-600 dark:text-gray-300">{getValue()}</span>
        ),
    },
    {
        accessorKey: "successRate",
        header: () => <div className="text-right">Success Rate</div>,
        cell: ({ getValue }) => {
            const value = getValue<number>();
            return (
                <div className="text-right">
                    <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                        {value}%
                    </div>
                    <Progress value={value} className="mt-1 h-1.5 bg-green-100 dark:bg-green-900" />
                </div>
            );
        },
    },
];

export function IncubatorPerformanceTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <Card className="shadow-xl border rounded-2xl">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Incubator Performance</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Monitor success rate per batch over the last cycles
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Input
                        placeholder="Search incubator..."
                        value={(table.getColumn("incubator")?.getFilterValue() as string) ?? ""}
                        onChange={(e) => table.getColumn("incubator")?.setFilterValue(e.target.value)}
                        className="sm:max-w-xs"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                Columns <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-md shadow-lg">
                            {table.getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="rounded-md border overflow-hidden">
                    <Table className="w-full text-sm">
                        <TableHeader className="bg-muted/30 text-muted-foreground">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="px-4 py-2">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="transition hover:bg-accent/40 hover:shadow-sm"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="px-4 py-3">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
