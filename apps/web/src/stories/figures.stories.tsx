import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { docsFigures } from "@/app/docs/(post)/_components/figures";
import {
  Tokurei2020,
  Tokurei2023,
  Tokurei2026,
} from "@/components/shortcodes/license-tokurei";
import { WithArticle } from "./with-article";

const { PLFigure, BSFigure, RevenueList, ExpenseList, FigureWrapper } =
  docsFigures;

const meta = {
  title: "Docs/Figures/Basic",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PL: Story = {
  render: () => <PLFigure />,
};

export const PLWithArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper caption="表: 損益計算書" my={8}>
        <PLFigure />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const BS: Story = {
  render: () => <BSFigure />,
};

export const BSWithArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper caption="表: 貸借対照表" my={8}>
        <BSFigure />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const TokureiSochi: Story = {
  render: () => <Tokurei2020 />,
};

export const TokureiSochiInArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8}>
        <Tokurei2020 />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const TokureiSochi2023: Story = {
  render: () => <Tokurei2023 />,
};

export const TokureiSochi2023InArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8}>
        <Tokurei2023 />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const TokureiSochi2026: Story = {
  render: () => <Tokurei2026 />,
};

export const TokureiSochi2026InArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8}>
        <Tokurei2026 />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const RevenueTable: Story = {
  render: () => <RevenueList />,
};

export const RevenueTableInArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8}>
        <RevenueList />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const ExpenseTable: Story = {
  render: () => <ExpenseList />,
};

export const ExpenseTableInArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8}>
        <ExpenseList />
      </FigureWrapper>
    </WithArticle>
  ),
};
