"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define the type-safe variant for label styling
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Define props interface extending Radix's Label component props
interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  className?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
  )
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
