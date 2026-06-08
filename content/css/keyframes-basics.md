---
title: "@keyframesの基本"
description: "CSSアニメーションの出発点。@keyframesで「始まり」と「終わり」を定義し、animation プロパティで要素に適用する方法を習得する。"
slug: keyframes-basics
difficulty: beginner
tags: [keyframes, animation, from-to]
order: 1
component: DemosCssKeyframesBasic
code:
  css: |
    /* ① from / to で2点を指定する方法 */
    @keyframes slide-in {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* ② % で複数ステップを指定する方法 */
    @keyframes bounce-in {
      0%   { opacity: 0; transform: scale(0.5); }
      60%  { transform: scale(1.15); }
      80%  { transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }

    /* 要素への適用 */
    .box {
      animation: slide-in 0.8s ease-out forwards;
    }

    .card {
      animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  html: |
    <div class="box">スライドイン</div>
    <div class="card">バウンスイン</div>
tips:
  - "`from` は `0%`、`to` は `100%` と同義。シンプルな2点アニメーションなら from/to が読みやすい。"
  - "`animation-fill-mode: forwards` を設定しないと、アニメーション終了後に初期状態に戻ってしまう。"
  - "@keyframes の名前はスコープを持たないのでグローバルに影響する。BEMのようにプレフィックスを付けてコリジョンを避けよう。"
  - "同じ要素に複数アニメーションを適用するにはカンマ区切り: `animation: anim1 1s, anim2 2s;`"
related:
  - timing-functions
  - animation-fill-mode
---

## @keyframes とは？

`@keyframes` ルールは、CSSアニメーションの**キーフレーム（重要な時点）**を定義するためのルールです。アニメーションの「スナップショット」を複数記述し、ブラウザがその間を自動的に補完（インターポレーション）します。

### 基本構文

```css
@keyframes アニメーション名 {
  開始状態 { プロパティ: 値; }
  終了状態 { プロパティ: 値; }
}
```

定義したアニメーションは `animation` プロパティで要素に適用します。

### animation プロパティ

| プロパティ | 説明 | 例 |
|-----------|------|-----|
| `animation-name` | @keyframes の名前 | `slide-in` |
| `animation-duration` | 1ループの時間 | `0.8s` |
| `animation-timing-function` | 速度変化の関数 | `ease-out` |
| `animation-delay` | 開始までの待機時間 | `0.2s` |
| `animation-iteration-count` | 繰り返し回数 | `1`, `infinite` |
| `animation-fill-mode` | 終了後の状態 | `forwards` |

ショートハンド記法では順序が重要です：

```css
animation: 名前 時間 タイミング遅延 回数 fill-mode;
/* 例 */
animation: slide-in 0.8s ease-out 0s 1 forwards;
```
