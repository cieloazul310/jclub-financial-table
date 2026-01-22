/**
 * Jクラブの年度別情報を表す型
 */
export type YearInfo = {
  id: string;
  year: number;
  categories: ("J1" | "J2" | "J3")[];
};
