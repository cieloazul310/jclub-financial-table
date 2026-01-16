import { css } from "styled-system/css";
import { Tabs } from "@/components/ui/tabs";
import { tabOptions } from "@/data/tab";

export function TabList() {
  return (
    <Tabs.List
      className={css({
        position: "sticky",
        top: "{sizes.header-height}",
        zIndex: "calc({zIndex.docked} - 1)",
        bg: "white/85",
        backdropFilter: "blur(2px)",
        maxWidth: "90em",
        mx: "auto",
      })}
    >
      {tabOptions.map(({ id, label }) => (
        <Tabs.Trigger key={id} py={4} value={id}>
          {label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
}
