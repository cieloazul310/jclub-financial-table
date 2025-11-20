export async function getData(from = -Infinity, to = Infinity) {
    const years = [2020];
    const selected = years.filter((year) => year >= from && year <= to);
    const imports = selected.map((year) => import("./" + year + ".json").then((m) => (m.default ?? m)));
    return Promise.all(imports);
}
export const years = [2020];
export default getData;
