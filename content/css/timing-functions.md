---
title: "イージングを理解する"
description: "アニメーションの「動き」の質を決める timing-function。ease/linear の違いから cubic-bezier のカスタム指定まで、感触の違いをライブで体感する。"
slug: timing-functions
difficulty: beginner
tags: [timing-function, easing, cubic-bezier]
order: 2
component: DemosCssTimingFunctions
code:
  css: |
    /* キーワード指定（最も簡単） */
    .linear    { animation-timing-function: linear; }
    .ease      { animation-timing-function: ease; }
    .ease-in   { animation-timing-function: ease-in; }
    .ease-out  { animation-timing-function: ease-out; }
    .ease-in-out { animation-timing-function: ease-in-out; }

    /* cubic-bezier でカスタム定義 */
    /* cubic-bezier(x1, y1, x2, y2) — 制御点を指定 */
    .spring {
      animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
      /* y > 1 にするとオーバーシュート（バウンス感）を表現できる */
    }

    /* steps() — コマ送りアニメーション */
    .sprite {
      animation-timing-function: steps(8, end);
    }
tips:
  - "UI要素の「出現」には ease-out が最適。素早く現れてゆっくり止まる動きが自然に感じる。"
  - "`cubic-bezier(0.34, 1.56, 0.64, 1)` は y軸に 1 を超える値を入れることでバネのような「行き過ぎ」を表現できる。"
  - "Chrome DevTools の Animations パネルで cubic-bezier を視覚的に編集できる。"
  - "`steps()` はスプライトシートアニメーションやカウンターのデジタル的な動きに使う。"
related:
  - keyframes-basics
  - animation-fill-mode
---

## timing-function とは？

`animation-timing-function`（または `transition-timing-function`）は、アニメーションが**時間の経過とともにどのように速度変化するか**を定義します。同じ `duration` でも、timing-function が異なると「動きの質感」が大きく変わります。

### キーワード値

| 値 | 内部の cubic-bezier | 特徴 |
|----|-------------------|------|
| `linear` | `cubic-bezier(0,0,1,1)` | 均一な速度。機械的な印象 |
| `ease` | `cubic-bezier(0.25,0.1,0.25,1)` | デフォルト。ゆっくり始まり速くなりゆっくり終わる |
| `ease-in` | `cubic-bezier(0.42,0,1,1)` | ゆっくり始まり速く終わる |
| `ease-out` | `cubic-bezier(0,0,0.58,1)` | 速く始まりゆっくり終わる。UI出現に最適 |
| `ease-in-out` | `cubic-bezier(0.42,0,0.58,1)` | ゆっくり始まりゆっくり終わる |

### cubic-bezier の仕組み

`cubic-bezier(x1, y1, x2, y2)` は、ベジェ曲線の**2つの制御点**を指定します。

- x 軸: 時間（0〜1 の範囲に収める）
- y 軸: 進行度（0〜1 の範囲外でもOK → オーバーシュート可能）

ツール: [cubic-bezier.com](https://cubic-bezier.com/) でビジュアル編集できます。
