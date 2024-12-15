import React from "react";
import { useController } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const DatePicker = ({ control, name, label }) => {
  const { field } = useController({ control, name });

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              type="text"
              placeholder="Select a date"
              value={field.value ? new Date(field.value).toLocaleDateString() : ""}
              readOnly
              className="pr-10"
            />
            <CalendarIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            onSelect={(date) => field.onChange(date)}
            className="rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;