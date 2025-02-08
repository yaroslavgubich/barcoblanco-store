import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import React from "react";

interface WidthFilterProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export function WidthFilter({ value, onValueChange }: WidthFilterProps) {
  const minGap = 5; // Minimum distance between thumbs

  // Prevents thumbs from overlapping
  const handleValueChange = (newValue: [number, number]) => {
    const [min, max] = newValue;

    // Ensure min thumb does not exceed max - minGap
    const newMin = Math.min(min, value[1] - minGap);

    // Ensure max thumb does not go below min + minGap
    const newMax = Math.max(max, value[0] + minGap);

    onValueChange([newMin, newMax]);
  };

  return (
    <div className="space-y-2">
      <Label>
        Width: {value[0]}cm - {value[1]}cm
      </Label>
      <Slider
        value={value}
        onValueChange={handleValueChange} // Use the adjusted value function
        max={200}
        min={0}
        step={1}
      />
    </div>
  );
}
