---
title: "イージングを理解する"
description: "linear / ease / cubic-bezier — 動きの「速度カーブ」が印象を決める。"
difficulty: beginner
tags: [timing, easing, cubic-bezier]
order: 2
component: DemosCssTimingFunctions
code:
  css: |
    .linear { animation-timing-function: linear; }
    .ease   { animation-timing-function: ease; }      /* 既定値 */
    .in     { animation-timing-function: ease-in; }
    .out    { animation-timing-function: ease-out; }
    .inout  { animation-timing-function: ease-in-out; }

    /* 4点で自由な曲線を描く。第2・第4の値が1を超えると行き過ぎ（overshoot） */
    .back {
      animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
tips:
  - "UI の登場には ease-out、退場には ease-in が自然に感じられることが多い。"
  - "cubic-bezier の制御点を 1 より大きく/0 より小さくすると行き過ぎる動き（弾み）が作れる。"
  - "steps() を使うとコマ送りのアニメーション（スプライト）になる。"
---

## イージングとは

イージング（`animation-timing-function` / `transition-timing-function`）は、
**変化の「速度の変わり方」** を決める関数です。同じ移動距離・同じ時間でも、
途中で加速・減速するかどうかで印象が大きく変わります。

## 組み込みのキーワード

| 値 | 動き |
|----|------|
| `linear` | 一定速度。機械的でやや単調 |
| `ease` | ゆっくり始まり加速、最後に減速（既定値） |
| `ease-in` | ゆっくり始まり、だんだん加速 |
| `ease-out` | 速く始まり、最後に減速 |
| `ease-in-out` | 両端がゆっくり |

## cubic-bezier で自由な曲線

`cubic-bezier(x1, y1, x2, y2)` は 2 つの制御点で速度カーブを自由に定義します。
`y` の値を `1` より大きく、または `0` より小さくすると、
**目標を一度行き過ぎてから戻る「弾む」動き** が作れます。

```css
/* 少し行き過ぎてから戻る、心地よい弾み */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
```

## steps() — コマ送り

`steps(n)` は連続的ではなく、`n` 段階のカクカクした変化にします。
スプライトシートのアニメーションやタイプライター演出に使われます。

```css
.typing {
  animation: type 2s steps(20) forwards;
}
```
