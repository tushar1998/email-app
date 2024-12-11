import { v4 as uuid } from "uuid";

export const navs = [
  { id: uuid(), value: "all", label: "All" },
  { id: uuid(), value: "unread", label: "Unread" },
  { id: uuid(), value: "read", label: "Read" },
  { id: uuid(), value: "favorite", label: "Favorites" },
] as const;

export type Nav = (typeof navs)[number]["value"];
