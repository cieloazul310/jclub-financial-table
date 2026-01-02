import { center } from "styled-system/patterns";
import { Progress } from "@/components/ui/progress";

export function Loading() {
  return (
    <div className={center({ width: "full", minHeight: "80vh" })}>
      <Progress.Root value={null}>
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.Label>読み込み中</Progress.Label>
      </Progress.Root>
    </div>
  );
}
