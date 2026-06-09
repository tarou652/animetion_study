# Animation Lab — CLAUDE.md

## プロジェクト概要

**"Motion as Knowledge"** — アニメーション技術の展覧・学習サイト。  
Nuxt 4 (SSG) で構築し、GitHub で管理・Netlify / CloudFront でホスティングを想定。

---

## 技術スタック

| 用途 | 技術 | バージョン |
|------|------|-----------|
| フレームワーク | Nuxt 4 (SSG) | 4.4.7 |
| スタイリング | Tailwind CSS v4 | 4.x |
| コンテンツ管理 | @nuxt/content v3 | 3.x |
| DB アダプター | better-sqlite3 | 12.x |
| コードハイライト | Shiki (built-in) | — |
| アニメーション（CSS章） | Pure CSS | — |
| アニメーション（GSAP章） | GSAP 3 | 予定 |
| アニメーション（Motion章） | @vueuse/motion | 予定 |
| 3D | Three.js + TresJS | 予定 |

---

## ディレクトリ構造

```
animetion_study/
├── CLAUDE.md                 ← このファイル
├── nuxt.config.ts            ← Tailwind v4 Vite plugin + @nuxt/content
├── content.config.ts         ← コレクション定義 (css, gsap, ...)
├── package.json
│
├── app/                      ← Nuxt 4 srcDir (compatibilityVersion: 4)
│   ├── app.vue
│   ├── assets/css/main.css   ← @theme 変数定義 + グローバルスタイル
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   ├── index.vue          トップ（セクションカードグリッド）
│   │   ├── css/
│   │   │   ├── index.vue      CSSセクションTOP + フィルター
│   │   │   └── [slug].vue     個別デモページ（5セクション構成）
│   │   ├── gsap/index.vue     Coming Soon
│   │   ├── motion/index.vue   Coming Soon
│   │   ├── svg/index.vue      Coming Soon
│   │   └── threejs/index.vue  Coming Soon
│   └── components/
│       ├── AppHeader.vue
│       ├── AppFooter.vue
│       ├── AnimationCard.vue  カード（ライブプレビュー付き）
│       ├── SectionCard.vue    トップページセクションカード
│       ├── ComingSoonSection.vue
│       ├── DifficultyBadge.vue
│       ├── TechTag.vue
│       └── demos/
│           └── css/
│               ├── KeyframesBasic.vue
│               ├── TimingFunctions.vue
│               ├── TransformGallery.vue
│               └── TransitionStates.vue
│
├── content/                  ← @nuxt/content v3 Markdown
│   └── css/
│       ├── keyframes-basics.md
│       ├── timing-functions.md
│       ├── transform-gallery.md
│       └── transition-states.md
│
└── public/
```

---

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev          # http://localhost:3000

# 静的サイト生成
npm run generate     # .output/public/ に出力

# ビルド（SSR）
npm run build

# プレビュー
npm run preview
```

---

## Nuxt 4 固有の注意点

- **`srcDir` は `app/`** — `future: { compatibilityVersion: 4 }` により、ページ・コンポーネントはすべて `app/` 配下に置く
- **`content/`** は プロジェクトルートに置く（`app/` の外）
- **`better-sqlite3`** は `@nuxt/content` の必須依存。CI/CD 環境でも `npm install better-sqlite3` を明示的に実行すること

---

## Tailwind CSS v4 設定

Tailwind v4 は CSS-first アプローチ。設定は `app/assets/css/main.css` の `@theme` ディレクティブで行う。

```css
@import "tailwindcss";

@theme {
  --color-accent-css: #00d4ff;
  --color-accent-gsap: #88ce02;
  /* ... */
}
```

`tailwind.config.js` は不要。`nuxt.config.ts` では Vite プラグインとして登録：

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  vite: { plugins: [tailwindcss()] }
})
```

---

## コンテンツ管理（@nuxt/content v3）

コレクションは `content.config.ts` で定義：

```ts
import { defineCollection, z } from '@nuxt/content'

export const collections = {
  css: defineCollection({
    type: 'page',
    source: 'css/**',
    schema: z.object({
      title: z.string(),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
      tags: z.array(z.string()),
      order: z.number(),
      component: z.string(),  // Vueコンポーネント名
      code: z.object({ css: z.string().optional(), ... }).optional(),
      tips: z.array(z.string()).optional(),
    })
  })
}
```

クエリ例：

```ts
// 一覧取得
const demos = await queryCollection('css').order('order', 'ASC').all()

// パスで単一取得
const demo = await queryCollection('css').path('/css/keyframes-basics').first()

// フィールドでフィルター
const beginners = await queryCollection('css')
  .where('difficulty', '==', 'beginner').all()
```

---

## デモコンポーネント規約

### ファイル配置

```
app/components/demos/{section}/{PascalCaseName}.vue
```

Nuxt の自動インポートにより、コンポーネント名は `DemosCss{Name}` になる。  
例: `demos/css/KeyframesBasic.vue` → `<DemosCssKeyframesBasic />`

### props 規約

```ts
defineProps<{
  preview?: boolean  // true のとき AnimationCard のサムネイル表示
}>()
```

`preview` モードでは小さくシンプルなアニメーションのみ表示し、フル機能のコントロールパネルは非表示にする。

### 新しいデモの追加手順

追加するのは **2 ファイルだけ**。デモコンポーネントは `import.meta.glob` で自動検出されるため、対応表の編集は不要。

1. `content/css/{slug}.md` を作成（frontmatter + 理論説明）。`component:` に自動インポート名（例 `DemosCssKeyframesBasic`）を記入。コードの解説は本文にコードブロック（\`\`\`css）として書く
2. `app/components/demos/css/{ComponentName}.vue` を作成（アニメーション本体。LIVE DEMO に描画される）

> 役割分離: **理論・コード解説は Markdown 本文**、**アニメーション実装は Vue コンポーネント**。frontmatter にアニメーションコードは持たせず、`.vue` 全文の自動表示もしない（冗長になるため）。
> コンポーネントの解決はデータ（文字列）駆動になるため `resolveComponent(文字列)` は使わず、`import.meta.glob('.../demos/**/*.vue', { eager: true })` のモジュールを名前で引く。

---

## デザインシステム

### カラー

| 役割 | 値 |
|------|-----|
| 背景 | `#0a0a0f` |
| カード背景 | `rgba(255,255,255,0.03)` |
| ボーダー | `rgba(255,255,255,0.08)` |
| CSS アクセント | `#00d4ff` |
| GSAP アクセント | `#88ce02` |
| Motion アクセント | `#646cff` |
| Three.js アクセント | `#ff6b35` |

### グラスモーフィズム（`.glass-card`）

```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
```

### フォント

- 見出し・コード: `'JetBrains Mono', 'Space Mono', monospace`
- 本文: `'Noto Sans JP', sans-serif`

---

## パフォーマンス指針

- `transform` と `opacity` のみをアニメーションに使用（GPU合成レイヤー）
- `top`/`left`/`width` のアニメーションは避ける（layout thrashing）
- `will-change: transform` は必要な箇所のみに絞る
- アクセシビリティ: `@media (prefers-reduced-motion: reduce)` を全デモに実装する

---

## コーディング規約（ECC rules）

作業時は、ECC から導入した以下のルール集に従う（参照ドキュメント）。

- `.claude/rules/ecc/common/` — 言語不問の原則（coding-style / git-workflow / testing / security / performance / code-review / patterns 等）
- `.claude/rules/ecc/typescript/` — TypeScript 固有の規約

また `.claude/skills/` には ECC のフロントエンド系スキルを導入済み（`nuxt4-patterns`, `ui-to-vue`, `accessibility`, `design-system`, `frontend-design-direction`, `coding-standards`, `motion-foundations`）。該当作業時に自動参照、または `/<skill-name>` で明示呼び出しできる。

---

## フェーズ計画

| フェーズ | 内容 | 状態 |
|----------|------|------|
| Phase 1 | Nuxt 4 基盤 + CSS セクション 4 デモ | ✅ 完了 |
| Phase 2 | CSS 残り 4 デモ (fill-mode, stagger, scroll-driven, clip-path-morph) | 🔜 |
| Phase 3 | GSAP 3 セクション | 🔜 |
| Phase 4 | @vueuse/motion + SVG セクション | 🔜 |
| Phase 5 | Three.js / WebGL セクション | 🔜 |

---

## 既知の制約・注意事項

- `@nuxt/content` v3 は内部で SQLite を使用するため、`better-sqlite3` のネイティブビルドが必要。Node.js のバージョン変更時は再ビルドが必要になる場合がある。
- Tailwind v4 は `@apply` の挙動が v3 と異なる部分がある。カスタムユーティリティは `@layer utilities` ではなく CSS クラスとして直接定義する。
- `animation: ... forwards` を付け忘れると、アニメーション終了後に初期状態に戻る。デモコンポーネントでは必ず `fill-mode: forwards` を確認する。
