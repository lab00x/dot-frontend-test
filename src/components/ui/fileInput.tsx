import * as React from "react";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export interface fileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullCol?: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, fileInputProps>(
  ({ className, type, value, ...props }, ref) => {
    const fileInput = React.useRef(null);
    return (
      <div className={twMerge("w-full", props.fullCol && "col-span-2")}>
        <label htmlFor={props.name} className="flex text-sm py-1.5 font-medium">
          {props.label}
        </label>

        <input
          type={type}
          className={cn(
            "hidden h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref ? ref : fileInput}
          {...props}
        />
        <div
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onClick={() => fileInput?.current && fileInput?.current.click()}
          {...props}
        >
          {JSON.stringify(value) == "{}"
            ? "Click here to select product image"
            : JSON.stringify(value)}
        </div>
      </div>
    );
  }
);
FileInput.displayName = "FileInput";

export { FileInput };
