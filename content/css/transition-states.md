---
title: "transition で状態変化"
description: ":hover / :focus / :active — 状態の切り替えをなめらかに繋ぐ。"
difficulty: beginner
tags: [transition, hover, focus, states]
order: 4
component: DemosCssTransitionStates
tips:
  - "transition は『状態Aから状態Bへ』の補間。@keyframes のような自走はしない。"
  - "transition: all は意図しないプロパティまで対象になり重い。明示的に列挙する。"
  - ":focus-visible を使うと、キーボード操作時だけフォーカス枠を出せる。"
---

## transition とは

`transition` は **2 つの状態の間を自動で補間** するプロパティです。
通常時のスタイルと、`:hover` などの擬似クラスで変わったスタイルの差分を、
指定した時間をかけてなめらかに繋ぎます。

`@keyframes` が「自走するアニメーション」なのに対し、
`transition` は「きっかけ（状態変化）に反応するアニメーション」です。

## 書き方

```css
.el {
  transition: <プロパティ> <時間> <イージング> <遅延>;
}
```

複数のプロパティはカンマで区切って個別に指定できます。

```css
transition: transform 0.3s ease, opacity 0.2s linear;
```

## よく使う状態擬似クラス

| 擬似クラス | 発火条件 |
|------------|----------|
| `:hover` | ポインタが乗っているとき |
| `:focus` | フォーカスを受けているとき |
| `:focus-visible` | キーボード操作でフォーカスしたとき |
| `:active` | クリック（押下）中 |
| `:disabled` | 無効状態の入力要素 |

## transition: all の落とし穴

`transition: all` は手軽ですが、**変化する全プロパティを対象** にするため、
意図しない再描画やパフォーマンス低下を招きます。
アニメーションさせたいプロパティは明示的に列挙するのが安全です。
