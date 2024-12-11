import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import SiteFilters from "./site-filters";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="mx-auto flex h-12 w-full items-center justify-normal border-b px-2 sm:h-14 sm:justify-between md:px-8">
        <div className="flex items-center w-full">
          <div className="items-center space-x-2 flex">
            <Icons.hexagon className="size-6" />
            <span className="font-bold">Email Client</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-end sm:w-auto">
          <a
            href="https://github.com/Tushar1998"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "ghost",
              })
            )}
          >
            <Icons.github className="size-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
      <SiteFilters />
    </header>
  );
}
