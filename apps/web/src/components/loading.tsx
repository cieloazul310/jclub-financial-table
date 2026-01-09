import { Center, type CenterProps } from "styled-system/jsx";
import { Progress } from "@/components/ui/progress";

export function Loading({
  width = "full",
  height = "full",
  ...rest
}: CenterProps) {
  const props = { width, height, ...rest };
  return (
    <Center {...props}>
      <Progress.Root value={null}>
        <Progress.Circle>
          <Progress.CircleTrack />
          <Progress.CircleRange />
        </Progress.Circle>
        <Progress.Label>読み込み中</Progress.Label>
      </Progress.Root>
    </Center>
  );
}

export function PageLoading() {
  return <Loading minHeight="80vh" />;
}
