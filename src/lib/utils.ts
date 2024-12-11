import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const searchParams = <T extends Record<string, string | null>>() =>
  new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
      if (typeof prop === "string") {
        return searchParams.get(prop);
      }

      if (typeof prop === "symbol") {
        return Reflect.get(searchParams, prop);
      }
    },
  }) as unknown as T;

type ToggleItem<T> = (list: T[], item: T) => T[];

export const toggleItem: ToggleItem<string> = (list, item) => {
  return list.includes(item) ? list.filter((i) => i !== item) : [...new Set([...list, item])];
};
