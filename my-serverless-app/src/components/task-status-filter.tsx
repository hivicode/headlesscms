"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export type FilterStatus = "all" | "in_progress" | "completed";

interface TaskStatusFilterProps {
  initialCounts?: {
    all: number;
    in_progress: number;
    completed: number;
  };
  onFilterChange?: (status: FilterStatus) => void;
}

export function TaskStatusFilter({
  initialCounts = { all: 4, in_progress: 2, completed: 2 },
  onFilterChange,
}: TaskStatusFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

  const filterItems: Array<{ id: FilterStatus; label: string; count: number }> = [
    { id: "all", label: "Semua", count: initialCounts.all },
    { id: "in_progress", label: "Berjalan", count: initialCounts.in_progress },
    { id: "completed", label: "Selesai", count: initialCounts.completed },
  ];

  const handleSelect = (status: FilterStatus) => {
    setActiveFilter(status);
    if (onFilterChange) {
      onFilterChange(status);
    }
  };

  return (
    <div className="inline-flex items-center p-1 rounded-xl bg-muted/70 border border-border/80 backdrop-blur-sm gap-1">
      {filterItems.map((item) => {
        const isActive = activeFilter === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 outline-none ${
              isActive
                ? "bg-background text-foreground shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            }`}
          >
            <span>{item.label}</span>
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={`h-4.5 px-1.5 text-[10px] font-bold rounded-md transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {item.count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
