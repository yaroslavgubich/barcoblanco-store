// components/ui/category-filter.tsx
//app/components/ui/category-filter.tsx
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

