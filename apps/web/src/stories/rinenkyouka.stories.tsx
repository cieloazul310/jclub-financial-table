import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FigureWrapper } from "@/components/docs/figures/wrapper";
import {
  RinenKyoukaByFan,
  RinenKyoukaByYearNewer,
  RinenKyoukaByYearOlder,
  RinenKyoukaByClubOlder,
  RinenKyoukaGeneralByYearOlder,
  RinenKyoukaGeneralByYearNewer,
  RinenKyoukaGeneralByFan,
} from "@/components/docs/figures/rinen-kyouka";
import { WithArticle } from "./with-article";

const meta = {
  title: "Docs/Figures/RinenKyouka",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const RinenKyoukaOld: Story = {
  render: () => <RinenKyoukaByYearOlder />,
};

export const RinenKyoukaOldWithArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8} caption="表: 旧・理念強化配分金の支給額">
        <RinenKyoukaByYearOlder />
      </FigureWrapper>
    </WithArticle>
  ),
};
export const RinenKyoukaOldByClub: Story = {
  render: () => <RinenKyoukaByClubOlder />,
};

export const RinenKyoukaOldByClubWithArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper my={8} caption="表: 旧・理念強化配分金のクラブ別支給総額">
        <RinenKyoukaByClubOlder />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const RinenKyoukaNew: Story = {
  render: () => <RinenKyoukaByYearNewer />,
};

export const RinenKyoukaNewWithArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper
        my={8}
        caption="表: 新・理念強化配分金・競技順位に基づく支給額"
      >
        <RinenKyoukaByYearNewer />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const RinenKyoukaFan: Story = {
  render: () => <RinenKyoukaByFan />,
};

export const RinenKyoukaFanWithArticle: Story = {
  render: () => (
    <WithArticle>
      <FigureWrapper
        my={8}
        caption="表: 新・理念強化配分金・人気順位に基づく支給額"
      >
        <RinenKyoukaByFan />
      </FigureWrapper>
    </WithArticle>
  ),
};

export const RinenKyoukaGeneralOlder: Story = {
  render: () => <RinenKyoukaGeneralByYearOlder />,
};

export const RinenKyoukaGeneralNewer: Story = {
  render: () => <RinenKyoukaGeneralByYearNewer />,
};

export const RinenKyoukaGeneralByFanRaw: Story = {
  render: () => <RinenKyoukaGeneralByFan />,
};
