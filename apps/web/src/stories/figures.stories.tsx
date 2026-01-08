import type { PropsWithChildren } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { container } from "styled-system/patterns";
import { Paragraph, Heading3 } from "@/components/article";
import { PLFigure, PLFigureRaw } from "@/components/docs/figures/pl";
import { BSFigure, BSFigureRaw } from "@/components/docs/figures/bs";
import {
  Tokurei2020,
  Tokurei2023,
  Tokurei2026,
} from "@/components/docs/figures/license-tokurei";
import { FigureWrapper } from "@/components/docs/figures/wrapper";

const meta = {
  title: "Docs/Figures",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function WithArticle({ children }: PropsWithChildren) {
  return (
    <div className={container({ maxWidth: "common-main-width" })}>
      <Paragraph>
        今日は二百二十日だが、九月一日の関東大震災記念日や、二百十日から、この日にかけては、寅彦先生の名言「天災は忘れた頃来る」という言葉が、いくつかの新聞に必ず引用されることになっている。
      </Paragraph>
      <Heading3>一体どこにあるのか</Heading3>
      <Paragraph>
        ところで、よく聞かれるのであるが、この言葉は、先生のどの随筆にあるのかが、問題になっている。寅彦のファンは日本中にたくさんあって、先生の全集は隅から隅まで、何回となく繰り返して読んだという熱心な人がよくある。そういう人から、どうもおかしいが、この言葉は、どこにも見当らない。一体どこにあるのか、という質問をよく受ける。
      </Paragraph>
      {children}
      <Paragraph>
        実はこの言葉は、先生の書かれたものの中には、ないのである。しかし話の間には、しばしば出た言葉で、かつ先生の代表的な随筆の一つとされている「天災と国防」の中には、これと全く同じことが、少しちがった表現で出ている。
      </Paragraph>
      <Paragraph>
        それで、文明が進むほど天災による損害の程度も累進する傾向があるという事実を充分に自覚して、そして平生からそれに対する防御策を講じなければならないはずであるのに、それがいっこうにできていないのはどういうわけであるか。そのおもなる原因は、畢竟そういう天災がきわめてまれにしか起こらないで、ちょうど人間が前車の顛覆を忘れたころにそろそろ後車を引き出すようになるからであろう。
      </Paragraph>
      <Paragraph>
        それで私も、この言葉が先生の書かれたものの中にあるものと思い込んでいた。もう十五年ばかりも昔の話になるが、たしか東京日日新聞だったかに頼まれて「天災」という短文を書いたことがある。その文章の中で、私はこの言葉を引用（？）して「天災は忘れた頃来る」という寅彦先生の言葉は、まさに千古の名言であると書いておいた。
      </Paragraph>
      <Paragraph>
        ところが、この言葉が、その後方々で引用されるようになり、とうとう朝日新聞が、戦争中に、一日一訓というようなものを編集した時、九月一日の分に、この言葉が採用されることになった。
      </Paragraph>
    </div>
  );
}

export const PL: Story = {
  render: () => <PLFigureRaw />,
};

export const PLWithArticle: Story = {
  render: () => (
    <WithArticle>
      <PLFigure caption="表: 損益計算書" my={8} />
    </WithArticle>
  ),
};

export const BS: Story = {
  render: () => <BSFigureRaw />,
};

export const BSWithArticle: Story = {
  render: () => (
    <WithArticle>
      <BSFigure caption="表: 貸借対照表" my={8} />
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
