import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = currentPage === page;

        return (
          <Button
            key={page}
            size="icon"
            variant="ghost"
            onClick={() => {
              if (!isActive) onPageChange(page);
            }}
            className={`
              rounded-full w-8 h-8
              border border-[#1996A3]
              transition font-semibold
              outline-none focus:outline-none focus:ring-0
              ${isActive
                ? "bg-[#1996A3] text-white cursor-default pointer-events-none"
                : "bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white cursor-pointer"
              }
            `}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
}




