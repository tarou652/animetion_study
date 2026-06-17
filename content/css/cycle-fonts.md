---
# ============================================================
#  ⚠ ファイル名 = URL の slug になる。必ずケバブケースで保存する。
#     例: content/css/clip-path-morph.md → /css/clip-path-morph
#     （PascalCase の TypingFonts.md だと /css/typingfonts になり不揃いになる）
#
#  必須フィールド（content.config.ts の schema に対応）
# ============================================================
title: "円が転がってくる"                 # 例: "@keyframes の基本"
description: "転がって表示されるアニメーションを作成する。" # 短く・体言止め推奨
difficulty: beginner                     # beginner | intermediate | advanced
tags: [keyframes, animation]                       # 技術タグ（例: [keyframes, animation]）
order: 6                                # 一覧の並び順（昇順）。既存と重複させない
component: DemosCssCycleFonts              # app/components/demos/css/YourDemo.vue に対応する自動インポート名

# ============================================================
#  任意フィールド
# ============================================================
tips:
  - "実装・設計のポイントを箇条書きで。"
  - "アクセシビリティや注意点など。"
---

## 見出し（このデモで学べること）

ここに理論を Markdown 本文で書く。アニメーションの実装そのものはコンポーネント側に書き、
本文では「考え方」と「最小限のコード例」を説明する。

## コード例の書き方

説明したいコードはコードブロックで都度示す（コンポーネント全文の自動表示はしない方針）。

```css
.example {
  animation: foo 1s ease forwards;
}
```

## 表で整理する場合

| プロパティ | 役割 |
|------------|------|
| `xxx` | ... |
| `yyy` | ... |
