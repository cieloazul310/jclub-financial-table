import { usePathname } from "next/navigation";
import { useTab } from "@/utils/tabs";

export function useTableId() {
  const tab = useTab();
  const pathname = usePathname();
  return `${pathname.split("/").join("")}${tab}`;
}
