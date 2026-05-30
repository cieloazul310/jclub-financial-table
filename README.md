# Jクラブ経営情報ポータル v2

> [!NOTE]
> Jクラブ経営情報ポータルv1のリポジトリは下記に移動しました  
> <https://github.com/cieloazul310/jclub-financial-table-v1>

## 概要

Jリーグが毎年公開している「Jクラブ個別経営情報開示資料」の15年分のデータをクラブ別、年度別に表示するWebサイトJクラブ経営情報ポータルの開発リポジトリ。

Jクラブ経営情報ポータル  
<https://cieloazul310.github.io/jclub-financial-table>

## 各パッケージの概要

- [`@cieloazul310/jclub-financial`](./packages//core/)  
  コアパッケージ（以下の3つのパッケージを搭載したもの）
- [`@cieloazul310/jclub-financial-data`](./packages/data/)  
  データパッケージ
- [`@cieloazul310/jclub-financial-statistics`](./packages/statistics/)  
  統計パッケージ (experimental)
- [`@cieloazul310/jclub-financial-utils`](./packages/utils/)  
  ユーティリティパッケージ

## 経営情報データの利用方法

[![npm version](https://badge.fury.io/js/@cieloazul310%2Fjclub-financial.svg)](https://badge.fury.io/js/@cieloazul310%2Fjclub-financial)

経営情報のデータはNPMで入手することができます。

```sh
npm install @cieloazul310/jclub-financial
// or
npm install @cieloazul310/jclub-financial-data
```

詳しい利用方法は[データパッケージ](./packages/data/)に掲載しています。

## データについて

このサイトで使用しているデータは、Jリーグが毎年発表している**Jクラブ個別経営情報開示資料**を基に独自で入場者数などのデータを追加・加工したものです。  
データは下記の**一次ソースを明記**した上で（このページ、つまり「Jクラブ経営情報ポータル」の記載は不要です）ご自由に利用ください。データ加工時に欠損が発生している可能性があります。  
データ利用の際には念のため一次ソースを確認してください。  
本データ利用に際して発生した損失や損害に対してサイト作成者は一切の責任を負いません。ご了承ください。

決算数値の単位はJリーグ発表と同様に「百万円」としています。「100」は1億円を表します。

### Jクラブ個別経営情報開示資料

クラブ経営情報  
<https://aboutj.jleague.jp/corporate/about_jclubs/management_jclubs/>

- 端数処理の影響で合計値が一部一致しないところがある。合計数値は、各クラブの百万円単位の金額を単純に合計したものである。
- 記数値はクラブ運営法人単体の数値であるため、アカデミー(育成・普及)事業を、クラブ運営法人と直接関係のあるNPO法人や一般社団法人に移管している場合には、アカデミー関連収入及び費用が上記数値に含まれないことがある。
- 「物販収入」および「物販関連費」は、代理店に委託販売しているケース等もあることから、取扱い高総額でのクラブ間比較はできない。
- 固定資産等の区分には、繰延資産も含めて表示している。
- 山形(2005-2013)は公益社団法人、YS横浜(2013-2019)は特定非営利活動法人であるため、資本の内訳は表示されない。
- 2021年以前の「チーム人件費」はアカデミー指導者報酬、レディースチーム選手・指導者報酬を含む。2022年度以降はトップチームに限定した「トップチーム人件費」。

#### 2025年度の暫定データ

<details>
  <summary>クラブ発表によるソース（2026年5月31日現在）</summary>

- [鹿島](https://www.antlers.co.jp/blogs/news/260417f640qb)
- [水戸](https://www.mito-hollyhock.net/news/p=50984/)
- [浦和](https://cieloazul310.github.io/jclub-financial-table/posts/2026/04/urawa/)
- [川崎](https://www.frontale.co.jp/about/kk/)
- [清水](https://www.s-pulse.co.jp/news/detail/56783)
- [京都](https://www.sanga-fc.jp/club)
- [岡山](https://www.fagiano-okayama.com/ir/disclosure/elec_announcement/koukoku/)
- [広島](https://www.sanfrecce.co.jp/club/management)
- [福岡](https://www.avispa.co.jp/news/post-85984)、[報道](https://nishispo.nishinippon.co.jp/article/1002573)
- [八戸](https://vanraure.net/archives/722625)
- [仙台](https://www.vegalta.co.jp/club/financial-results.html)
- [秋田](https://blaublitz.jp/whatsnew/148323.html)
- [山形（報道）](https://www.nikkei.com/article/DGXZQOCC276GV0X20C26A4000000/)
- [甲府](https://www.ventforet.jp/news/other/525259)
- [磐田（報道）](https://hochi.news/articles/20260423-OHT1T51266.html)
- [富山](https://www.kataller.co.jp/all/press-release/26grqjnjaquuw/)
- [今治](https://www.fcimabari.com/news/gu_74n16hbn5)
- [鳥栖](https://www.sagan-tosu.net/news/p/48607/)
- [大分](https://www.oita-trinita.co.jp/news/202604139590/)
- [栃木SC](https://www.tochigisc.jp/news/1646)
- [群馬](https://thespa.co.jp/news/202604232356/)
- [松本](https://www.yamaga-fc.com/archives/538350)
- [長野](https://parceiro.co.jp/info/detail/iXfc7Pd_qdiJNa-bqvgf6XRTbklaWVVfckpqMXNVcTJqcVVPNTNNdTg5Q3ZzQlVSLW83ekhxT0JUZTQ)
- [金沢](https://www.zweigen-kanazawa.jp/news/?id=18778)
- [岐阜](https://www.fc-gifu.com/news_information/167362.html)
- [奈良](https://naraclub.jp/archives/68418)
- [愛媛FC](https://ehimefc.com/topics/topic51020.html)
- [山口](https://www.renofa.com/archives/179552/)
- [熊本](https://roasso-k.com/top_team/club_outline)
- [鹿児島](https://kufc.co.jp/club_mind/)
- [琉球](https://fcryukyu.com/news/64459/)
- [沼津](https://www.azul-claro.jp/information_info/2026/04/22/80744/)
</details>

<details>
  <summary>官報によるソース（2026年5月31日現在）</summary>

[官報発行サイト](https://www.kanpo.go.jp/)より

号外第76号（2026年3月31日）  
京都 （p78）

号外第92号（2026年4月20日）  
相模原（p58）

号外第98号（2026年4月27日）  
千葉（p99）、横浜FM（p104）

号外第100号（2026年4月30日）  
町田（p307）

号外第101号（2026年5月1日）  
FC東京（p105）

号外第104号（2026年5月11日）  
鹿島（p85）

号外第105号（2026年5月15日）  
神戸（p91）

号外第109号（2026年5月18日）  
名古屋（p52）、栃木SC（p53）

号外第110号（2026年5月19日）  
浦和（p84）、徳島（p85）

号外第111号（2026年5月20日）  
新潟（p74）

号外第112号（2026年5月21日）  
群馬（p228）

号外第115号（2026年5月25日）  
東京V（p139）、清水（p139）
</details>

## License

MIT © [cieloazul310](https://github.com/cieloazul310)
