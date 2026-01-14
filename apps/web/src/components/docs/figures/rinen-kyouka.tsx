import { css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { TableWrapper, type TableWrapperProps } from "./table-wrapper";

function toValue(num: number | null) {
  if (num === null) return;
  return (
    <>
      {`${(num / 100).toFixed(1)}`}
      <span className={css({ fontSize: ".8em" })}>億円</span>
    </>
  );
}

type TableDatum = {
  id: string;
  columns: string[];
  clubs: { rank: number; name?: string; values: (number | null)[] }[];
};

export function RinenKyoukaByYear({
  data,
  disableClub = false,
  ...rest
}: TableWrapperProps & {
  data: TableDatum;
  disableClub?: boolean;
}) {
  const props = { ...rest };
  const { id, columns, clubs } = data;

  return (
    <TableWrapper {...props}>
      <Table.Root dense>
        <colgroup>
          <col />
          {!disableClub && <col className={css({ minWidth: "5em" })} />}
          <col className={css({ bg: "solid-gray.bg" })} />
          <col span={3} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="column">順位</Table.Header>
            {!disableClub && <Table.Header scope="column">クラブ</Table.Header>}
            <Table.Header scope="column">総額</Table.Header>
            {columns.map((column) => (
              <Table.Header key={`${id}-${column}`} scope="column">
                {column}
              </Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {clubs.map(({ rank, name, values }, idx) => (
            <Table.Row key={`${id}-${idx}`}>
              <Table.Header scope="row">{rank}</Table.Header>
              {!disableClub && <Table.Header scope="row">{name}</Table.Header>}
              <Table.Cell align="right" fontWeight="bold">
                {toValue(
                  values
                    .filter((val) => val !== null)
                    .reduce((accum, curr) => accum + curr, 0),
                )}
              </Table.Cell>
              {values.map((val, index) => (
                <Table.Cell key={`${id}-${idx}-${index}`} align="right">
                  {toValue(val)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={disableClub ? 1 : 2} scope="row">
              合計
            </Table.Cell>
            <Table.Cell fontWeight="bold" align="right">
              {toValue(
                clubs.reduce(
                  (accum, curr) =>
                    accum +
                    curr.values
                      .filter((val) => val !== null)
                      .reduce((ac, cr) => ac + cr, 0),
                  0,
                ),
              )}
            </Table.Cell>
            {columns.map((_, index) => (
              <Table.Cell key={`${id}-tfoot-${index}`} align="right">
                {toValue(
                  clubs
                    .map(({ values }) => values[index] ?? 0)
                    .flat()
                    .reduce((accum, curr) => accum + curr, 0),
                )}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Foot>
      </Table.Root>
    </TableWrapper>
  );
}

export function RinenKyoukaByYearWithTab({
  data,
  width = "fit-content",
  maxWidth = "full",
  disableClub = false,
  ...rest
}: Tabs.RootProps & {
  data: TableDatum[];
  disableClub?: boolean;
}) {
  const props = { width, maxWidth, ...rest };

  return (
    <Tabs.Root {...props}>
      <Tabs.List>
        {data.map(({ id }) => (
          <Tabs.Trigger key={id.toString()} value={id.toString()}>
            {id}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map(({ id, columns, clubs }) => (
        <Tabs.Content key={id.toString()} value={id.toString()}>
          <RinenKyoukaByYear
            data={{ id, columns, clubs }}
            disableClub={disableClub}
          />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

export function RinenKyoukaByClub({
  data,
  ...rest
}: TableWrapperProps & {
  data: {
    columns: string[];
    clubs: { club: string; values: (number | null)[] }[];
  };
}) {
  const props = { ...rest };

  return (
    <TableWrapper {...props}>
      <Table.Root dense>
        <colgroup>
          <col className={css({ minWidth: "5em" })} />
          <col className={css({ bg: "solid-gray.bg" })} />
          <col span={5} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="column">クラブ</Table.Header>
            <Table.Header scope="column">総額</Table.Header>
            {data.columns.map((id) => (
              <Table.Header key={id.toString()} scope="column">
                {id}
              </Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.clubs.map(({ club, values }) => (
            <Table.Row key={club}>
              <Table.Header scope="row">{club}</Table.Header>
              <Table.Cell align="right" fontWeight="bold">
                {toValue(
                  values
                    .filter((val) => val !== null)
                    .reduce((accum, curr) => accum + curr, 0),
                )}
              </Table.Cell>
              {values.map((val, index) => (
                <Table.Cell key={`${club}-${index}`} align="right">
                  {toValue(val)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell>合計</Table.Cell>
            <Table.Cell fontWeight="bold" align="right">
              {toValue(
                data.clubs.reduce(
                  (accum, curr) =>
                    accum +
                    curr.values
                      .filter((val) => val !== null)
                      .reduce((ac, cr) => ac + cr, 0),
                  0,
                ),
              )}
            </Table.Cell>
            {data.columns.map((_, index) => (
              <Table.Cell key={`tfoot-${index}`} align="right">
                {toValue(
                  data.clubs
                    .map(({ values }) => values[index] ?? 0)
                    .flat()
                    .reduce((accum, curr) => accum + curr, 0),
                )}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Foot>
      </Table.Root>
    </TableWrapper>
  );
}

export function RinenKyoukaByYearOlder(props: Tabs.RootProps) {
  const data = [
    {
      id: "2017",
      columns: ["2018", "2019", "2020"],
      clubs: [
        { rank: 1, name: "川崎", values: [1000, 400, 150] },
        { rank: 2, name: "鹿島", values: [400, 200, 100] },
        { rank: 3, name: "C大阪", values: [200, 150, null] },
        { rank: 4, name: "柏", values: [180, null, null] },
      ],
    },
    {
      id: "2018",
      columns: ["2019", "2020", "2021"],
      clubs: [
        { rank: 1, name: "川崎", values: [1000, 400, 150] },
        { rank: 2, name: "広島", values: [400, 200, 100] },
        { rank: 3, name: "鹿島", values: [200, 150, null] },
        { rank: 4, name: "札幌", values: [180, null, null] },
      ],
    },
    {
      id: "2019",
      columns: ["2020", "2021", "2022"],
      clubs: [
        { rank: 1, name: "横浜FM", values: [550, 500, 500] },
        { rank: 2, name: "FC東京", values: [250, 250, 200] },
        { rank: 3, name: "鹿島", values: [200, 150, null] },
        { rank: 4, name: "川崎", values: [180, null, null] },
      ],
    },
  ];

  return (
    <RinenKyoukaByYearWithTab data={data} defaultValue="2017" {...props} />
  );
}

export function RinenKyoukaByYearNewer(props: Tabs.RootProps) {
  const data = [
    {
      id: "2023",
      columns: ["2024", "2025"],
      clubs: [
        { rank: 1, name: "神戸", values: [250, 250] },
        { rank: 2, name: "横浜FM", values: [180, 180] },
        { rank: 3, name: "広島", values: [150, 70] },
        { rank: 4, name: "浦和", values: [150, null] },
        { rank: 5, name: "鹿島", values: [120, null] },
        { rank: 6, name: "名古屋", values: [90, null] },
        { rank: 7, name: "福岡", values: [70, null] },
        { rank: 8, name: "川崎", values: [60, null] },
        { rank: 9, name: "C大阪", values: [50, null] },
      ],
    },
    {
      id: "2024",
      columns: ["2025", "26特別", "26/27"],
      clubs: [
        { rank: 1, name: "神戸", values: [250, null, null] },
        { rank: 2, name: "広島", values: [180, null, null] },
        { rank: 3, name: "町田", values: [150, null, null] },
        { rank: 4, name: "G大阪", values: [150, null, null] },
        { rank: 5, name: "鹿島", values: [120, null, null] },
        { rank: 6, name: "東京V", values: [90, null, null] },
        { rank: 7, name: "FC東京", values: [60, null, null] },
        { rank: 8, name: "川崎", values: [50, null, null] },
        { rank: 9, name: "横浜FM", values: [40, null, null] },
        { rank: 10, name: "C大阪", values: [30, null, null] },
      ],
    },
    {
      id: "2025",
      columns: ["26特別", "26/27", "27/28"],
      clubs: [
        { rank: 1, name: "鹿島", values: [null, null, null] },
        { rank: 2, name: "柏", values: [null, null, null] },
        { rank: 3, name: "京都", values: [null, null, null] },
        { rank: 4, name: "広島", values: [null, null, null] },
        { rank: 5, name: "神戸", values: [null, null, null] },
        { rank: 6, name: "町田", values: [null, null, null] },
        { rank: 7, name: "浦和", values: [null, null, null] },
        { rank: 8, name: "川崎", values: [null, null, null] },
        { rank: 9, name: "G大阪", values: [null, null, null] },
        { rank: 10, name: "C大阪", values: [null, null, null] },
      ],
    },
  ];

  return (
    <RinenKyoukaByYearWithTab data={data} defaultValue="2023" {...props} />
  );
}

export function RinenKyoukaByFan(props: Tabs.RootProps) {
  const data = [
    {
      id: "2023",
      columns: ["2024"],
      clubs: [
        { rank: 1, name: "浦和", values: [170] },
        { rank: 2, name: "神戸", values: [120] },
        { rank: 3, name: "横浜FM", values: [70] },
        { rank: 4, name: "川崎", values: [50] },
        { rank: 5, name: "鹿島", values: [40] },
        { rank: 6, name: "名古屋", values: [30] },
        { rank: 7, name: "G大阪", values: [25] },
        { rank: 8, name: "札幌", values: [20] },
        { rank: 9, name: "新潟", values: [15] },
      ],
    },
    {
      id: "2024",
      columns: ["2025"],
      clubs: [
        { rank: 1, name: "浦和", values: [170] },
        { rank: 2, name: "鹿島", values: [120] },
        { rank: 3, name: "横浜FM", values: [70] },
        { rank: 4, name: "神戸", values: [50] },
        { rank: 5, name: "川崎", values: [40] },
        { rank: 6, name: "広島", values: [30] },
        { rank: 7, name: "G大阪", values: [20] },
        { rank: 8, name: "札幌", values: [20] },
        { rank: 9, name: "町田", values: [10] },
        { rank: 10, name: "名古屋", values: [10] },
      ],
    },
  ];

  return (
    <RinenKyoukaByYearWithTab data={data} defaultValue="2023" {...props} />
  );
}

export function RinenKyoukaByClubOlder(props: TableWrapperProps) {
  const data = {
    columns: Array.from({ length: 5 }, (_, i) => (2018 + i).toString()),
    clubs: [
      {
        club: "川崎",
        values: [1000, 1400, 730, 150, null],
      },
      {
        club: "横浜FM",
        values: [null, null, 550, 500, 500],
      },
      {
        club: "鹿島",
        values: [400, 400, 450, 150, null],
      },
      {
        club: "広島",
        values: [null, 400, 200, 100, null],
      },
      {
        club: "FC東京",
        values: [null, null, 250, 250, 200],
      },
      {
        club: "C大阪",
        values: [200, 150, null, null, null],
      },
      {
        club: "柏",
        values: [180, null, null, null, null],
      },
      {
        club: "札幌",
        values: [null, 180, null, null, null],
      },
    ],
  };
  return <RinenKyoukaByClub data={data} {...props} />;
}

export function RinenKyoukaGeneralByYearOlder() {
  return (
    <RinenKyoukaByYearWithTab
      data={[
        {
          id: "2017、2018の成績",
          columns: ["1年目", "2年目", "3年目"],
          clubs: [
            { rank: 1, values: [1000, 400, 150] },
            { rank: 2, values: [400, 200, 100] },
            { rank: 3, values: [200, 150, null] },
            { rank: 4, values: [180, null, null] },
          ],
        },
        {
          id: "2019の成績",
          columns: ["1年目", "2年目", "3年目"],
          clubs: [
            { rank: 1, values: [550, 500, 500] },
            { rank: 2, values: [250, 250, 200] },
            { rank: 3, values: [200, 150, null] },
            { rank: 4, values: [180, null, null] },
          ],
        },
      ]}
      disableClub
      defaultValue="2017、2018の成績"
    />
  );
}

export function RinenKyoukaGeneralByYearNewer() {
  return (
    <RinenKyoukaByYear
      data={{
        id: "2024",
        columns: ["1年目", "2年目"],
        clubs: [
          { rank: 1, values: [250, 250] },
          { rank: 2, values: [180, 180] },
          { rank: 3, values: [150, 70] },
          { rank: 4, values: [150, null] },
          { rank: 5, values: [120, null] },
          { rank: 6, values: [90, null] },
          { rank: 7, values: [60, null] },
          { rank: 8, values: [50, null] },
          { rank: 9, values: [40, null] },
          { rank: 10, values: [30, null] },
        ],
      }}
      disableClub
    />
  );
}

export function RinenKyoukaGeneralByFan() {
  return (
    <RinenKyoukaByYear
      data={{
        id: "2024",
        columns: ["1年目"],
        clubs: [
          { rank: 1, values: [170] },
          { rank: 2, values: [120] },
          { rank: 3, values: [70] },
          { rank: 4, values: [50] },
          { rank: 5, values: [40] },
          { rank: 6, values: [30] },
          { rank: 7, values: [20] },
          { rank: 8, values: [20] },
          { rank: 9, values: [10] },
          { rank: 10, values: [10] },
        ],
      }}
      disableClub
    />
  );
}
