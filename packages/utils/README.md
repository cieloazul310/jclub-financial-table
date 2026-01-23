# Jクラブ経営情報ポータル ユーティリティパッケージ

[![npm version](https://badge.fury.io/js/@cieloazul310%2Fjclub-financial-utils.svg)](https://badge.fury.io/js/@cieloazul310%2Fjclub-financial-utils)

> [!NOTE]
> このパッケージはコアパッケージに含まれています

## 概要

- Jクラブ経営情報ポータルに搭載している60+3クラブの情報を搭載
- Jクラブ経営情報ポータルで表示できる年度の情報を搭載
- Jクラブ経営情報ポータルで表示しているデータのキーと日本語表記の対応表を搭載

## 使い方

### インストール

```sh
npm install @cieloazul310/jclub-financial
// or indivisual
npm install @cieloazul310/jclub-financial-utils
```

### API

```ts
import {
  getAllClubs,
  getClubById,
  getClubsByCategory,
  getAllYears,
  getYearInfo,
  getLabel,
  getLabelWithOptions,
} from "@cieloazul310/jclub-financial";
// or from "@cieloazul310/jclub-financial-utils";
```

<!-- @api-docs-start -->
#### Functions

<dl>
<dt><a href="#getAllClubs">getAllClubs()</a> ⇒ <code>Array.&lt;ClubInfo&gt;</code></dt>
<dd><p>利用可能なすべてのJクラブ情報を取得する関数。ソートはカテゴリ順(J1, J2, J3, その他)。</p></dd>
<dt><del><a href="#getClubBySlug">getClubBySlug()</a></del></dt>
<dd></dd>
<dt><a href="#getClubById">getClubById(clubId)</a> ⇒ <code>ClubInfo</code> | <code>undefined</code></dt>
<dd><p>指定した<code>clubId</code>のJクラブ情報を取得する関数</p></dd>
<dt><a href="#getClubsByCategory">getClubsByCategory(category)</a> ⇒ <code>Array.&lt;ClubInfo&gt;</code></dt>
<dd><p>指定したカテゴリのすべてのJクラブ情報を取得する</p></dd>
<dt><a href="#getLabel">getLabel(key)</a> ⇒ <code>string</code></dt>
<dd><p>プロパティ名から日本語ラベルを取得する</p></dd>
<dt><a href="#getLabelWithOptions">getLabelWithOptions(key, [options])</a> ⇒ <code>string</code></dt>
<dd><p>プロパティ名から日本語ラベルを取得する（オプションつき）</p></dd>
<dt><a href="#getAllYears">getAllYears()</a> ⇒ <code>Array.&lt;YearInfo&gt;</code></dt>
<dd><p>利用可能なすべての年度情報を取得する。ソートは年度昇順</p></dd>
<dt><a href="#getYearInfo">getYearInfo(year)</a> ⇒ <code>YearInfo</code> | <code>undefined</code></dt>
<dd><p>指定された年度の情報を取得する</p></dd>
</dl>

<a name="getAllClubs"></a>

#### getAllClubs() ⇒ <code>Array.&lt;ClubInfo&gt;</code>
<p>利用可能なすべてのJクラブ情報を取得する関数。ソートはカテゴリ順(J1, J2, J3, その他)。</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;ClubInfo&gt;</code> - <p>すべてのクラブの情報の配列を返します</p>  
**See**

- [ClubInfo](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts)
- [clubs.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml)

<a name="getClubBySlug"></a>

#### ~~getClubBySlug()~~
***use `getClubById`***

**Kind**: global function  
<a name="getClubById"></a>

#### getClubById(clubId) ⇒ <code>ClubInfo</code> \| <code>undefined</code>
<p>指定した<code>clubId</code>のJクラブ情報を取得する関数</p>

**Kind**: global function  
**Returns**: <code>ClubInfo</code> \| <code>undefined</code> - <p>指定したクラブの情報を返します。存在しない場合は<code>undefined</code>を返します。</p>  
**See**

- [ClubInfo](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts)
- [clubs.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml)


| Param | Type | Description |
| --- | --- | --- |
| clubId | <code>string</code> | <p>クラブID</p> |

<a name="getClubsByCategory"></a>

#### getClubsByCategory(category) ⇒ <code>Array.&lt;ClubInfo&gt;</code>
<p>指定したカテゴリのすべてのJクラブ情報を取得する</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;ClubInfo&gt;</code> - <p>指定したカテゴリのクラブの情報の配列を返します</p>  
**See**

- [ClubInfo](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/club.ts)
- [clubs.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/clubs.yml)


| Param | Type | Description |
| --- | --- | --- |
| category | <code>string</code> | <p>カテゴリ(J1, J2, J3, JFL)</p> |

<a name="getLabel"></a>

#### getLabel(key) ⇒ <code>string</code>
<p>プロパティ名から日本語ラベルを取得する</p>

**Kind**: global function  
**Returns**: <code>string</code> - <p>日本語ラベル。未定義のキーの場合はキー名をそのまま返す</p>  
**See**

- [FinancialDatum](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/data.ts)
- [dictionary.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/dictionary.yml)


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p><code>FinancialDatum</code> のプロパティ名</p> |

<a name="getLabelWithOptions"></a>

#### getLabelWithOptions(key, [options]) ⇒ <code>string</code>
<p>プロパティ名から日本語ラベルを取得する（オプションつき）</p>

**Kind**: global function  
**Returns**: <code>string</code> - <p>日本語ラベル</p>  
**See**

- [FinancialDatum](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/data.ts)
- [dictionary.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/dictionary.yml)


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p><code>FinancialDatum</code> のプロパティ名</p> |
| [options] | <code>Object</code> | <p>fallback や後処理のオプション</p> |
| [options.fallback] | <code>string</code> | <p>キーが未定義の場合のフォールバック。省略時はキー名を返す</p> |

<a name="getAllYears"></a>

#### getAllYears() ⇒ <code>Array.&lt;YearInfo&gt;</code>
<p>利用可能なすべての年度情報を取得する。ソートは年度昇順</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;YearInfo&gt;</code> - <p>年度情報の配列</p>  
**See**

- [YearInfo](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/year.ts)
- [years.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/years.yml)

<a name="getYearInfo"></a>

#### getYearInfo(year) ⇒ <code>YearInfo</code> \| <code>undefined</code>
<p>指定された年度の情報を取得する</p>

**Kind**: global function  
**Returns**: <code>YearInfo</code> \| <code>undefined</code> - <p>年度情報。該当する年度が存在しない場合は undefined</p>  
**See**

- [YearInfo](https://github.com/cieloazul310/jclub-financial-table/blob/develop/packages/utils/src/types/year.ts)
- [years.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/years.yml)


| Param | Type | Description |
| --- | --- | --- |
| year | <code>number</code> | <p>年度</p> |


<!-- @api-docs-end -->

## 対応表

### クラブ一覧

<!-- @club-table-start -->
| 略称 | 呼称 | clubId |
| ------ | --------- | -------- |
| 鹿島 | 鹿島アントラーズ | antlers |
| 水戸 | 水戸ホーリーホック | mitohollyhock |
| 浦和 | 浦和レッズ | urawa |
| 千葉 | ジェフユナイテッド千葉 | jefunited |
| 柏 | 柏レイソル | reysol |
| FC東京 | FC東京 | fctokyo |
| 東京V | 東京ヴェルディ | verdy |
| 町田 | FC町田ゼルビア | zelvia |
| 川崎 | 川崎フロンターレ | kawasaki |
| 横浜FM | 横浜F・マリノス | fmarinos |
| 清水 | 清水エスパルス | shimizu |
| 名古屋 | 名古屋グランパス | nagoya |
| 京都 | 京都サンガF.C. | sanga |
| G大阪 | ガンバ大阪 | gamba |
| C大阪 | セレッソ大阪 | cerezo |
| 神戸 | ヴィッセル神戸 | vissel |
| 岡山 | ファジアーノ岡山 | fagiano |
| 広島 | サンフレッチェ広島 | sanfrecce |
| 福岡 | アビスパ福岡 | avispa |
| 長崎 | V・ファーレン長崎 | vvaren |
| 札幌 | 北海道コンサドーレ札幌 | consadole |
| 八戸 | ヴァンラーレ八戸 | vanraure |
| 仙台 | ベガルタ仙台 | vegalta |
| 秋田 | ブラウブリッツ秋田 | blaublitz |
| 山形 | モンテディオ山形 | montedio |
| いわき | いわきFC | iwakifc |
| 栃木C | 栃木シティ | tochigicity |
| 大宮 | RB大宮アルディージャ | ardija |
| 横浜FC | 横浜FC | yokohamafc |
| 湘南 | 湘南ベルマーレ | bellmare |
| 甲府 | ヴァンフォーレ甲府 | ventforet |
| 新潟 | アルビレックス新潟 | albirex |
| 富山 | カターレ富山 | kataller |
| 磐田 | ジュビロ磐田 | jubilo |
| 藤枝 | 藤枝MYFC | myfc |
| 徳島 | 徳島ヴォルティス | vortis |
| 今治 | FC今治 | fcimabari |
| 鳥栖 | サガン鳥栖 | sagan |
| 大分 | 大分トリニータ | trinita |
| 宮崎 | テゲバジャーロ宮崎 | tegevajaro |
| 福島 | 福島ユナイテッドFC | fufc |
| 栃木SC | 栃木SC | tochigisc |
| 群馬 | ザスパ群馬 | thespa |
| 相模原 | SC相模原 | scsagamihara |
| 松本 | 松本山雅FC | yamaga |
| 長野 | AC長野パルセイロ | parceiro |
| 金沢 | ツエーゲン金沢 | zweigen |
| 岐阜 | FC岐阜 | fcgifu |
| 滋賀 | レイラック滋賀FC | reilac |
| FC大阪 | FC大阪 | fcosaka |
| 奈良 | 奈良クラブ | naraclub |
| 鳥取 | ガイナーレ鳥取 | gainare |
| 山口 | レノファ山口FC | renofa |
| 讃岐 | カマタマーレ讃岐 | kamatamare |
| 愛媛 | 愛媛FC | ehimefc |
| 高知 | 高知ユナイテッドSC | kochi |
| 北九州 | ギラヴァンツ北九州 | giravanz |
| 熊本 | ロアッソ熊本 | roasso |
| 鹿児島 | 鹿児島ユナイテッドFC | kufc |
| 琉球 | FC琉球 | fcryukyu |
| 岩手 | いわてグルージャ盛岡 | gurulla |
| YS横浜 | Y.S.C.C.横浜 | yscc |
| 沼津 | アスルクラロ沼津 | azulclaro |
<!-- @club-table-end -->

**Source**: [clubs.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/clubs.yml)

### データのプロパティ

<!-- @dictionary-table-start -->
| 日本語ラベル | key |
| ------ | --------- |
| id | id |
| 呼称 | name |
| 略称 | short_name |
| 年 | year |
| 所属 | category |
| ライセンス | license |
| 事業期間（月数） | reporting_period_months |
| 順位 | rank |
| 勝ち点 | points |
| 一試合あたり平均勝ち点 | ppg |
| 昇降格 | elevation |
| 営業収入 | revenue |
| スポンサー収入 | sponsor_revenue |
| 入場料収入 | ticket_revenue |
| Jリーグ配分金 | jleague_distribution |
| アカデミー関連収入 | academy_revenue |
| 女子チーム関連収入 | womens_team_revenue |
| 物販収入 | retail_revenue |
| 移籍補償金等収入 | transfer_revenue |
| 国外クラブからの収入 | transfer_revenue_international |
| 国内クラブからの収入 | transfer_revenue_domestic |
| その他収入 | other_revenue |
| 営業費用 | expenses |
| チーム人件費 | team_wages |
| 移籍関連費用 | transfer_expenses |
| 国外クラブからの移籍に関する費用 | transfer_expenses_international |
| 国内クラブからの移籍に関する費用 | transfer_expenses_domestic |
| 事業費(チーム人件費を除く) | manage_expenses |
| 総事業費 | general_expenses |
| 試合関連経費 | match_expenses |
| トップチーム運営経費 | topteam_expenses |
| アカデミー運営経費 | academy_expenses |
| 女子チーム運営経費 | womens_team_expenses |
| 物販関連費 | retail_expenses |
| その他売上原価 | other_costs |
| 販売費および一般管理費 | selling_general_admin_expenses |
| 営業利益 | operating_profit |
| 営業外収益 | non_operating_income |
| 営業外費用 | non_operating_expenses |
| 経常利益 | ordinary_profit |
| 特別利益 | extraordinary_income |
| 特別損失 | extraordinary_loss |
| 税引前当期利益 | profit_before_tax |
| 法人税および住民税等 | tax |
| 当期純利益 | net_profit |
| 関連する法人の営業収入 | related_companies_revenue |
| 流動資産 | current_assets |
| 固定資産等 | non_current_assets |
| 資産の部 | assets |
| 流動負債 | current_liabilities |
| 固定負債 | non_current_liabilities |
| 負債の部 | liabilities |
| 資本金 | share_capital |
| 資本剰余金等 | capital_surplus |
| 利益剰余金 | retained_earnings |
| 純資産の部 | net_assets |
| リーグ戦入場者数 | league_attendance |
| リーグ戦ホーム試合数 | league_games |
| リーグカップ入場者数 | leaguecup_attendance |
| リーグカップホーム試合数 | leaguecup_games |
| プレーオフ入場者数 | playoffs_attendance |
| プレーオフホーム試合数 | playoffs_games |
| ACL入場者数 | acl_attendance |
| ACLホーム試合数 | acl_games |
| セカンドチーム入場者数 | second_attendance |
| セカンドチームホーム試合数 | second_games |
| 年間総入場者数 | all_attendance |
| 年間ホーム試合数 | all_games |
| リーグ戦平均入場者数 | average_attendance |
| 客単価 | unit_price |
<!-- @dictionary-table-end -->

**Source**: [dictionary.yml](https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/dictionary.yml)

## License

MIT © [cieloazul310](https://github.com/cieloazul310)
