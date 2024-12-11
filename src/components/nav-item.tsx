import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export interface NavItemProps {
  id: string;
  title: string;
}

export default function NavItem({ id, title }: NavItemProps) {
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "all", clearOnDefault: false });

  return (
    <ul>
      <li
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-6 rounded-xl p-2.5 cursor-pointer data-[state=true]:bg-button-filter data-[state=true]:text-primary data-[state=true]:border"
        )}
        key={id}
        data-state={filter === id}
        onClick={() => setFilter(id)}
      >
        <p>{title}</p>
      </li>
    </ul>
  );
}
