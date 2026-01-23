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
