"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker(props: CalendarProps | any) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <button
          className={
            "flex h-9 w-full items-center  whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.selected ? (
            format(props?.selected, "MM-dd-yyyy")
          ) : (
            <span>Posting Date</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          {...props}
          onSelect={(val) => {
            props.onSelect(val);
            setCalendarOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
