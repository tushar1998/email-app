import { Button } from "./ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { usePagination } from "@mantine/hooks";
import { EmailResponse } from "@/services/email";

interface EmailPaginationProps {
  data?: EmailResponse;
  page: number;
  onChange: (page: number) => void;
}

export default function EmailPagination({ data, page, onChange }: EmailPaginationProps) {
  const pagination = usePagination({
    total: Math.ceil((data?.total ?? 0) / 10),
    siblings: 0,
    initialPage: page,
    page,
    onChange,
  });

  return (
    <div className="p-3 flex items-center justify-center align-middle gap-2">
      <Button
        size="icon"
        variant="outline"
        className={cn("rounded-full h-8 w-8 border-none")}
        onClick={() => pagination.previous()}
      >
        <Icons.chevronLeft className="stroke-muted-foreground" size={15} />
      </Button>
      {pagination.range.map((pno) => {
        if (typeof pno === "number") {
          return (
            <Button
              variant="outline"
              data-page={pagination.active === pno}
              key={pno}
              className={cn("rounded-full h-8 w-8 data-[page=true]:bg-gray-400")}
              size="icon"
              onClick={() => pagination.setPage(pno)}
            >
              <p className="text-xs">{pno}</p>
            </Button>
          );
        }
      })}
      <Button
        variant="outline"
        size="icon"
        className={cn("rounded-full h-8 w-8 border-none")}
        onClick={() => pagination.next()}
      >
        <Icons.chevronRight className="stroke-muted-foreground" size={15} />
      </Button>
    </div>
  );
}
