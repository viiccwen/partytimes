import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Delay = async (delay_sec: number, correct: true) => {
  if(correct) {
    return new Promise(resolve => setTimeout(resolve, delay_sec * 1000))
  } else {
    return new Promise(reject => setTimeout(reject, delay_sec * 1000))
  }
}