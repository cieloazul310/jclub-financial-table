export function datestring(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}

export function datetime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function createDate(date: Date) {
  return {
    datestring: datestring(date),
    datetime: datetime(date),
  };
}

export function parseFrontmatterDate(frontmatter: {
  date: Date;
  lastmod: Date;
}): {
  date: { datestring: string; datetime: string };
  lastmod: { datestring: string; datetime: string };
  isModified: boolean;
} {
  const date = createDate(frontmatter.date);
  const lastmod = createDate(frontmatter.lastmod);
  const isModified =
    (frontmatter.lastmod &&
      frontmatter.date.getTime() !== frontmatter.lastmod.getTime()) ||
    false;

  return { date, lastmod, isModified };
}
