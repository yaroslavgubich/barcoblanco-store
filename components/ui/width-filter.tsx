import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface WidthFilterProps {
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}

export function WidthFilter({ value, onValueChange }: WidthFilterProps) {
  return (
    <div className="space-y-2">
      <Label>
        Width: {value[0]}cm - {value[1]}cm
      </Label>
      <Slider defaultValue={value} max={200} min={0} step={1} onValueChange={onValueChange} />
    </div>
  )
}

