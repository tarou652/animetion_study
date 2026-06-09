# Animation Lab — "Motion as Knowledge"

アニメーション技術を **観て・触って・学べる** 展覧 / 学習サイト。
CSS / GSAP / Motion / SVG / Three.js といった技術ごとにセクションを分け、各デモを「ライブプレビュー + 理論解説 + コード」のセットで提供します。

Nuxt 4 (SSG) で構築し、GitHub で管理、Netlify / CloudFront でのホスティングを想定しています。

> プロジェクトの設計指針・コーディング規約の詳細は [CLAUDE.md](./CLAUDE.md) を参照してください。本 README は「仕様の概要」と「更新手順」にフォーカスします。

---

## 目次

- [技術スタック](#技術スタック)
- [セットアップ & 開発コマンド](#セットアップ--開発コマンド)
- [ディレクトリ構造](#ディレクトリ構造)
- [アーキテクチャの仕組み](#アーキテクチャの仕組み)
- [コンテンツのデータモデル](#コンテンツのデータモデル)
- [更新ガイド（追加するファイル・編集するファイル）](#更新ガイド追加するファイル編集するファイル)
- [デザインシステム](#デザインシステム)
- [フェーズ計画](#フェーズ計画)
- [既知の制約](#既知の制約)

---

## 技術スタック

| 用途 | 技術 | バージョン |
|------|------|-----------|
| フレームワーク | Nuxt 4 (SSG, `compatibilityVersion: 4`) | ^4.0 |
| スタイリング | Tailwind CSS v4（CSS-first / Vite plugin） | ^4.0 |
| コンテンツ管理 | @nuxt/content v3 | ^3.0 |
| DB アダプター | better-sqlite3（@nuxt/content の必須依存） | ^12.0 |
| コードハイライト | Shiki（@nuxt/content 内蔵） | — |
| アニメーション (CSS 章) | Pure CSS | — |
| アニメーション (GSAP 章) | GSAP 3 | 予定 |
| アニメーション (Motion 章) | @vueuse/motion | 予定 |
| 3D (Three.js 章) | Three.js + TresJS | 予定 |

---

## セットアップ & 開発コマンド

```bash
# 依存インストール（better-sqlite3 のネイティブビルドが走ります）
npm install

# 開発サーバー起動
npm run dev          # http://localhost:3000

# 静的サイト生成（.output/public/ に出力）
npm run generate

# SSR ビルド / プレビュー
npm run build
npm run preview
```

> **Note**: `better-sqlite3` はネイティブモジュールです。Node.js のバージョンを変更した場合は `npm rebuild better-sqlite3`（または再インストール）が必要になることがあります。

---

## ディレクトリ構造

```
animetion_study/
├── CLAUDE.md                 ← 設計指針・規約（AI / 開発者向け）
├── README.md                 ← このファイル
├── nuxt.config.ts            ← Tailwind v4 Vite plugin + @nuxt/content の登録
├── content.config.ts         ← コンテンツコレクション定義（css, ...）
├── package.json
│
├── app/                      ← Nuxt 4 srcDir（compatibilityVersion: 4）
│   ├── app.vue
│   ├── assets/css/main.css   ← @theme 変数定義 + グローバルスタイル
│   ├── layouts/default.vue
│   ├── pages/
│   │   ├── index.vue           トップ（セクションカードグリッド）
│   │   ├── css/
│   │   │   ├── index.vue        CSS セクション TOP + フィルター
│   │   │   └── [slug].vue       個別デモページ
│   │   ├── gsap/index.vue       Coming Soon
│   │   ├── motion/index.vue     Coming Soon
│   │   ├── svg/index.vue        Coming Soon
│   │   └── threejs/index.vue    Coming Soon
│   └── components/
│       ├── AppHeader.vue / AppFooter.vue
│       ├── AnimationCard.vue    カード（ライブプレビュー付き）
│       ├── SectionCard.vue      トップのセクションカード
│       ├── ComingSoonSection.vue
│       ├── DifficultyBadge.vue / TechTag.vue
│       └── demos/css/           ← デモ本体（自動インポート対象）
│           ├── KeyframesBasic.vue
│           ├── TimingFunctions.vue
│           ├── TransformGallery.vue
│           └── TransitionStates.vue
│
├── content/css/              ← @nuxt/content v3 Markdown（理論 + frontmatter）
│   ├── keyframes-basics.md
│   ├── timing-functions.md
│   ├── transform-gallery.md
│   └── transition-states.md
│
└── public/
```

> **Nuxt 4 の注意点**: ページ・コンポーネントはすべて `app/` 配下に置きます。一方 `content/` は `app/` の外（プロジェクトルート）に置きます。

---

## アーキテクチャの仕組み

1 つのデモは **2 つのファイル** で成立します。**理論は Markdown、アニメーションの実体は Vue コンポーネント**に分離し、`component` 名で紐づけます。

```
content/css/<slug>.md        … 理論解説（本文）+ frontmatter（メタデータ・tips）
        │  frontmatter.component:  DemosCss<Name>
        ▼
app/components/demos/css/<Name>.vue   … アニメーション本体（LIVE DEMO に描画）
```

**設計方針（重要）**: 役割を明確に分離します。**理論・コード解説は Markdown 本文**で書き、**アニメーションの実装は Vue コンポーネント**に書きます。コードの説明が必要なら MD 本文の中にコードブロック（\`\`\`css）として個別に書きます（コンポーネント全文の自動表示はしません）。

- 一覧ページ `pages/css/index.vue` は `queryCollection('css')` でメタデータを取得し、`AnimationCard` をグリッド表示。
- コンポーネントの解決は `import.meta.glob('.../demos/**/*.vue', { eager: true })` で取り込んだモジュールを `component` 名で引く方式。
  `resolveComponent(文字列)` はデータ駆動だとバンドルから外れて解決に失敗するため使わない。
- 個別ページ `pages/css/[slug].vue` は `path()` で単一取得し、LIVE DEMO + 理論（MD 本文）+ tips を表示。

---

## コンテンツのデータモデル

`content.config.ts` の `css` コレクション schema（frontmatter の型）:

| フィールド | 型 | 必須 | 説明 |
|-----------|----|:----:|------|
| `title` | string | ✅ | デモ名 |
| `description` | string | ✅ | カード / OGP 用の短い説明 |
| `difficulty` | `'beginner' \| 'intermediate' \| 'advanced'` | ✅ | 難易度（バッジ・フィルター用） |
| `tags` | string[] | ✅ | 技術タグ |
| `order` | number | ✅ | 一覧の並び順（昇順） |
| `component` | string | ✅ | 対応する Vue コンポーネント名（例: `DemosCssKeyframesBasic`） |
| `tips` | string[] | 任意 | 補足ポイント |

> **アニメーションのコードは frontmatter に書きません。** コードの解説は理論（MD 本文）の中にコードブロックとして書きます（[アーキテクチャの仕組み](#アーキテクチャの仕組み)参照）。
> schema を変更したら `content.config.ts` を編集します。型に合わない frontmatter があるとビルド時にエラーになります。

---

## 更新ガイド（追加するファイル・編集するファイル）

### A. CSS デモを 1 つ追加する

`slug` を `clip-path-morph` とした場合の例。

**追加するのは 2 ファイルだけ**です（コンポーネントは glob で自動検出されるため、対応表の編集は不要）。

| # | 操作 | 対象ファイル | 内容 |
|---|------|------------|------|
| 1 | **追加** | `content/css/clip-path-morph.md` | frontmatter（[データモデル](#コンテンツのデータモデル)参照）+ 理論解説。`component:` に `DemosCssClipPathMorph` を記入。コードの説明は本文にコードブロックで書く |
| 2 | **追加** | `app/components/demos/css/ClipPathMorph.vue` | アニメーション本体（LIVE DEMO に描画）。`defineProps<{ preview?: boolean }>()` を実装し、`preview` 時はミニ表示にする |

> - コンポーネント名は Nuxt の自動インポート規則で決まります：`demos/css/ClipPathMorph.vue` → `DemosCssClipPathMorph`。frontmatter の `component:` はこの名前と一致させること。
> - `order` を既存デモと重複させないこと、`@media (prefers-reduced-motion: reduce)` を必ず実装すること。
> - インラインの `@click` などで複数文を書くときは改行区切りではなく `;` 区切りにする（`@click="a = b; fn()"`）。

### B. 新しいセクション（例: GSAP）を立ち上げる

| # | 操作 | 対象ファイル | 内容 |
|---|------|------------|------|
| 1 | **編集** | `content.config.ts` | `gsap` コレクションを `defineCollection({ source: 'gsap/**', ... })` で追加 |
| 2 | **追加** | `content/gsap/*.md` | 各デモの Markdown |
| 3 | **編集** | `app/pages/gsap/index.vue` | Coming Soon を一覧ページに置き換え（`pages/css/index.vue` を参考に） |
| 4 | **追加** | `app/pages/gsap/[slug].vue` | 個別ページ（`pages/css/[slug].vue` を参考に） |
| 5 | **追加** | `app/components/demos/gsap/*.vue` | デモ本体 |
| 6 | **編集** | `app/pages/index.vue` / `SectionCard.vue` | トップのセクションカードのリンク・状態を更新 |
| 7 | **追加** | `package.json` | `gsap` など必要な依存を追加 |

### C. デザイン / テーマを変更する

| 操作 | 対象ファイル | 内容 |
|------|------------|------|
| **編集** | `app/assets/css/main.css` | `@theme` のカラー変数・フォント・`.glass-card` などのグローバルスタイル |
| **編集** | `nuxt.config.ts` | Tailwind プラグインやグローバル設定 |

### D. メタ情報（このドキュメント / 規約）を変更する

| 操作 | 対象ファイル | 内容 |
|------|------------|------|
| **編集** | `README.md` | 仕様概要・更新手順（このファイル） |
| **編集** | `CLAUDE.md` | 設計指針・規約・フェーズ計画 |

---

## デザインシステム

| 役割 | 値 |
|------|-----|
| 背景 | `#0a0a0f` |
| カード背景 | `rgba(255,255,255,0.03)` |
| ボーダー | `rgba(255,255,255,0.08)` |
| CSS アクセント | `#00d4ff` |
| GSAP アクセント | `#88ce02` |
| Motion アクセント | `#646cff` |
| Three.js アクセント | `#ff6b35` |

- **グラスモーフィズム** `.glass-card`: 半透明背景 + `backdrop-filter: blur(12px)`。
- **フォント**: 見出し / コードは `JetBrains Mono` 系、本文は `Noto Sans JP`。
- **パフォーマンス**: `transform` と `opacity` のみアニメーション（GPU 合成）。`top/left/width` は避ける。`will-change` は必要箇所のみ。
- **アクセシビリティ**: 全デモに `@media (prefers-reduced-motion: reduce)` を実装。

---

## フェーズ計画

| フェーズ | 内容 | 状態 |
|----------|------|------|
| Phase 1 | Nuxt 4 基盤 + CSS セクション 4 デモ | ✅ 完了 |
| Phase 2 | CSS 残り 4 デモ（fill-mode, stagger, scroll-driven, clip-path-morph） | 🔜 |
| Phase 3 | GSAP 3 セクション | 🔜 |
| Phase 4 | @vueuse/motion + SVG セクション | 🔜 |
| Phase 5 | Three.js / WebGL セクション | 🔜 |

---

## 既知の制約

- **better-sqlite3**: @nuxt/content v3 が内部で SQLite を使用するためネイティブビルドが必要。Node.js バージョン変更時は再ビルドが必要になる場合あり。
- **Tailwind v4**: `@apply` の挙動が v3 と異なる。カスタムユーティリティは `@layer utilities` ではなく CSS クラスとして直接定義する。
- **`fill-mode: forwards`**: `animation: ... forwards` を付け忘れると終了後に初期状態へ戻る。デモ作成時は必ず確認する。
