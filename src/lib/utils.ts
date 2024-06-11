import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((error) => {
      setError(error.field, {
        type: "server",
        message: error.message,
      });
    });
  } else {
    toast({
      variant: "destructive",
      title: "Lỗi",
      description: error.payload.message ?? "Lỗi không xác đuinhj",
      duration: duration ?? 5000,
    });
  }
};
