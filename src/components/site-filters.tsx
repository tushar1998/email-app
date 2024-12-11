import NavItem from "./nav-item";
import { navs } from "@/lib/constants/filters";

export default function SiteFilters() {
  return (
    <div className="relative mx-auto flex h-10 items-center px-4 md:px-8">
      <p className="text-sm font-medium mr-3">Filter By:</p>
      <nav className="scrollbar-none flex items-center justify-between gap-1 overflow-scroll scroll-smooth px-2">
        {navs.map((nav) => (
          <NavItem key={nav.id} id={nav.value} title={nav.label} />
        ))}
      </nav>
    </div>
  );
}
