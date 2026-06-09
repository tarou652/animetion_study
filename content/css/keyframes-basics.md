---
title: "@keyframes の基本"
description: "from / to と % 指定でアニメーションの中間状態を定義する、CSS アニメーションの土台。"
difficulty: beginner
tags: [keyframes, animation]
order: 1
component: DemosCssKeyframesBasic
tips:
  - "複数段階の動きは % 指定（0% / 50% / 100%）で細かく制御できる。"
  - "animation-fill-mode: forwards を付けないと、終了後に初期状態へ戻る。"
  - "transform と opacity だけを使うと GPU 合成され、滑らかに動く。"
---

## @keyframes とは

`@keyframes` は **アニメーションの「中間状態の設計図」** を定義するための CSS ルールです。
要素がどのプロパティを、どのタイミングで、どんな値に変化させるかを宣言します。

定義した keyframes は、`animation-name` プロパティで要素に紐付けて初めて再生されます。

## from / to と % 指定

最もシンプルな書き方は `from`（開始）と `to`（終了）の 2 つです。

```css
@keyframes fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

より細かい中間状態が必要なときは、`0%` 〜 `100%` のパーセンテージで複数のキーフレームを置きます。
`from` は `0%`、`to` は `100%` と同じ意味です。

```css
@keyframes bounce {
  0%   { transform: translateY(-120px); }
  60%  { transform: translateY(20px); }
  80%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
```

## 主要プロパティ

| プロパティ | 役割 |
|------------|------|
| `animation-name` | 再生する @keyframes の名前 |
| `animation-duration` | 1 回の再生にかかる時間 |
| `animation-timing-function` | 加速・減速のカーブ（イージング） |
| `animation-delay` | 開始までの待ち時間 |
| `animation-iteration-count` | 繰り返し回数（`infinite` で無限） |
| `animation-fill-mode` | 再生前後の状態の保持方法 |

ショートハンドの `animation` プロパティでまとめて指定することもできます。

```css
.box {
  animation: slide-in 1.2s ease forwards;
}
```
