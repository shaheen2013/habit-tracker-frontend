import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const countWords = (str: string) => {
  return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
};
