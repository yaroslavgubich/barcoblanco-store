import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  title: string
  category: string
}

export function ProductCard({ title, category }: ProductCardProps) {
  return (
    <Card className="h-48">
      <CardContent className="flex flex-col items-center justify-center h-full gap-2">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </CardContent>
    </Card>
  )
}

