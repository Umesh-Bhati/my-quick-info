import { type ClassValue, clsx } from "clsx"
import { endOfDay, startOfMonth } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const uniqueObjects = (arrayOfObjects: any[]) => arrayOfObjects.filter(
  (object: any, index: number, array: any[]) =>
    index ===
    array.findIndex((obj) => obj.age === object.age)
);

