import { getClubsByCategory, getAllYears } from "@cieloazul310/jclub-financial";

export const clubTableMenu = [
  {
    id: "j1",
    title: "J1",
    items: getClubsByCategory("J1").map(({ id, name }) => ({
      id: id,
      title: name,
      href: `/club/${id}`,
    })),
  },
  {
    id: "j2",
    title: "J2",
    items: getClubsByCategory("J2").map(({ id, name }) => ({
      id: id,
      title: name,
      href: `/club/${id}`,
    })),
  },
  {
    id: "j3",
    title: "J3",
    items: getClubsByCategory("J3").map(({ id, name }) => ({
      id: id,
      title: name,
      href: `/club/${id}`,
    })),
  },
  {
    id: "others",
    title: "JFL・地域",
    items: getClubsByCategory("others").map(({ id, name }) => ({
      id: id,
      title: name,
      href: `/club/${id}`,
    })),
  },
];

export const yearTableMenu = {
  id: "year",
  title: "年度別",
  items: getAllYears()
    .sort((a, b) => b.year - a.year)
    .map(({ year }) => ({
      id: year.toString(),
      title: `${year}年度`,
      href: `/year/${year}`,
    })),
};

export const tableMenu = [...clubTableMenu, yearTableMenu];

export function menuWithSelection(currentPathname?: string) {
  return tableMenu.map(({ id, title, items }) => {
    const selectedItems = items.map((item) => ({
      ...item,
      selected:
        currentPathname && new RegExp(item.id).test(currentPathname)
          ? true
          : false,
    }));

    return {
      id,
      title,
      selected: selectedItems.some(({ selected }) => selected),
      items: selectedItems,
    };
  });
}

export const postMenu = [
  {
    id: "posts",
    title: "記事一覧",
    href: "/posts",
  },
  {
    id: "posts-by-year",
    title: "年別記事",
    href: "/posts/archive",
  },
];

export const contentMenu = [
  {
    id: "docs",
    title: "経営情報の見方",
    href: "/docs",
    description: "経営情報の項目と用語の簡易な解説",
  },
  {
    id: "series",
    title: "項目別表示",
    href: "/series",
    description:
      "営業収入や入場者数など特定の項目を、縦軸にクラブ、横軸に年度で表したページ",
  },
  {
    id: "download",
    title: "データダウンロード",
    href: "/download",
    description: "経営情報のデータをJSONやCSV形式でダウンロードできるページ",
  },
];
