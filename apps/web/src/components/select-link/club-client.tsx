"use client";

import { useRouter } from "next/navigation";
import type { ClubInfo } from "@cieloazul310/jclub-financial/types";
import { Field } from "@/components/ui/field";

export function ClubLinkClient({
  j1,
  j2,
  j3,
  others,
}: Record<"j1" | "j2" | "j3" | "others", ClubInfo[]>) {
  const { push } = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      push(`/club/${value}`);
    }
  };

  return (
    <Field.Select asChild>
      <select onChange={onChange}>
        <option value="">クラブを選択</option>
        <optgroup label="J1">
          {j1.map((club) => (
            <option key={club.slug} value={club.slug}>
              {club.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="J2">
          {j2.map((club) => (
            <option key={club.slug} value={club.slug}>
              {club.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="J3">
          {j3.map((club) => (
            <option key={club.slug} value={club.slug}>
              {club.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="JFL・地域">
          {others.map((club) => (
            <option key={club.slug} value={club.slug}>
              {club.name}
            </option>
          ))}
        </optgroup>
      </select>
    </Field.Select>
  );
}
