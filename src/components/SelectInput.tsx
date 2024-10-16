import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string;
  label: string;
}
function SelectInput({
  options,
  className,
  placeholder = "Sort By",
}: {
  options: Option[];
  className?: string;
  placeholder?: string;
}) {
  return (
    <Select>
      <SelectTrigger
        name="sortBy"
        id="sortBy"
        className={twMerge("w-[320px] bg-white", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, id) => (
          <SelectItem key={id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectInput;
