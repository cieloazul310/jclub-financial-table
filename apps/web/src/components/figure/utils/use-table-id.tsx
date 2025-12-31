import { usePathname } from "next/navigation";
import { useTableStore } from "@/providers/table-store-provider";

export function useTableId() {
  const { tab } = useTableStore((store) => store);
  const pathname = usePathname();
  return `${pathname.split("/").join("")}${tab}`;
}
