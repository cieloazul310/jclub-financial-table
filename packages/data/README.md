# Jクラブ経営情報データパッケージ

[![npm version](https://badge.fury.io/js/@cieloazul310%2Fjclub-financial-data.svg)](https://badge.fury.io/js/@cieloazul310%2Fjclub-financial-data)

> [!NOTE]
> このパッケージはコアパッケージに含まれています

## 概要

- Jクラブの経営情報を年別・クラブ別に取得する関数を搭載
- Jクラブ毎のJSONデータを搭載

## 使い方

### インストール

```sh
npm install @cieloazul310/jclub-financial
// or indivisual
npm install @cieloazul310/jclub-financial-data
```

## API

> [!WARNING]
> `@cieloazul310/jclub-financial-data` は内部で `fs/promises` や `path` などの Node.js 標準モジュールを使用しています。  
> そのため、このパッケージは **ブラウザ環境では使用できません**。  
> Node.js 環境（ビルド時・サーバーサイド）での利用を前提としています。

### `index.mjs`

すべてのクラブのデータから、クラブ別、年別にデータを取得する

```ts
import { 
  getDataByClub,
  getDataByYear,
  getDatum,
} from "@cieloazul310/jclub-financial/data";
// or from "@cieloazul310/jclub-financial-data";
```

<!-- @api-docs-index-start -->
#### Functions

<dl>
<dt><a href="#getDataByClub">getDataByClub(clubId)</a> ⇒</dt>
<dd><p>指定されたクラブIDのデータを取得する</p></dd>
<dt><a href="#getDataByYear">getDataByYear(year)</a> ⇒</dt>
<dd><p>年度を指定してデータを取得する</p></dd>
<dt><a href="#getDatum">getDatum(clubId, year)</a> ⇒</dt>
<dd><p>年度とクラブを指定してデータを取得する</p></dd>
</dl>

<a name="getDataByClub"></a>

#### getDataByClub(clubId) ⇒
<p>指定されたクラブIDのデータを取得する</p>

**Kind**: global function  
**Returns**: <p><code>Promise&lt;FinancialDatum[]&gt;</code> 指定されたクラブIDのデータの配列</p>  

| Param | Description |
| --- | --- |
| clubId | <p>クラブID</p> |

<a name="getDataByYear"></a>

#### getDataByYear(year) ⇒
<p>年度を指定してデータを取得する</p>

**Kind**: global function  
**Returns**: <p><code>Promise&lt;FinancialDatum[]&gt;</code> 指定された年度のデータの配列</p>  

| Param | Description |
| --- | --- |
| year | <p>年度</p> |

<a name="getDatum"></a>

#### getDatum(clubId, year) ⇒
<p>年度とクラブを指定してデータを取得する</p>

**Kind**: global function  
**Returns**: <p><code>Promise&lt;FinancialDatum | null&gt;</code> 指定された年度範囲のデータ</p>  

| Param | Description |
| --- | --- |
| clubId | <p>クラブID</p> |
| year | <p>年度</p> |


<!-- @api-docs-index-end -->

### `${clubId}/index.mjs`

特定のクラブのデータを取得する

```ts
import { getData } from "@cieloazul310/jclub-financial/data/${clubId}";
// or
// import { getData } from "@cieloazul310/jclub-financial-data/${clubId}";
```

<!-- @api-docs-index-for-clubs-start -->
<a name="getData"></a>

#### getData(from, to) ⇒
<p>年度範囲を指定してデータを取得する</p>

**Kind**: global function  
**Returns**: <p><code>Promise&lt;FinancialDatum[]&gt;</code> 指定された年度範囲のデータの配列</p>  

| Param | Description |
| --- | --- |
| from | <p>開始年度</p> |
| to | <p>終了年度</p> |


<!-- @api-docs-index-for-clubs-end -->
