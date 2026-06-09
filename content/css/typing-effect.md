---
title: "タイピング風アニメーション"
description: "steps() と ch 単位で、文字を一文字ずつ打ち込むタイプライター演出。"
difficulty: intermediate
tags: [keyframes, steps, typography]
order: 5
component: DemosCssTypingFonts
tips:
  - "steps(n) の n は表示する文字数に合わせる。ずれるとコマ割りが不自然になる。"
  - "ch 単位は等幅フォントでのみ『文字数 = 幅』が成立する。"
  - "キャレットの点滅は border-right + step-end のイージングが定番。"
---

## タイプライター演出の仕組み

文字が一文字ずつ現れる「タイプライター」は、3 つの要素の組み合わせで作れます。

1. テキストを 1 行に固定し（`white-space: nowrap`）、はみ出しを隠す（`overflow: hidden`）
2. 要素の `width` を 0 から全文字幅へアニメーションさせる
3. その動きを `steps(文字数)` で区切り、滑らかな伸長ではなく「1 文字ずつ」見せる

## width を steps() で区切る

連続的に `width` を広げると、文字が左から滑らかに現れてしまいます。
`steps(n)` を使うと **n 段階のカクカクした変化**になり、ちょうど 1 文字ずつ表示されます。

```css
.line {
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 2s steps(11) forwards; /* 11 = 文字数 */
}
@keyframes typing {
  to {
    width: 11ch;
  } /* 1ch ≒ 等幅フォントの 1 文字分 */
}
```

`ch` は「文字 `0` の幅」を表す単位です。等幅（モノスペース）フォントなら全文字が同じ幅なので、
`文字数 ch` がそのまま全体の幅になります。

## 点滅するキャレット（カーソル）

右端の縦棒は `border-right` で表現し、別の `@keyframes` で点滅させます。

```css
.line {
  border-right: 2px solid #00d4ff;
  animation:
    typing 2s steps(11) forwards,
    caret 0.8s step-end infinite;
}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}
```

`step-end` は「区切りの最後で一気に切り替える」イージングで、点滅をパキッと見せます。

## 注意点

| 落とし穴 | 対策 |
|----------|------|
| 文字数と `steps()` / `ch` の値がずれる | テキストに合わせて両方を更新する（このデモは文字数から自動算出） |
| プロポーショナルフォント・日本語（全角） | `ch` と文字数が一致しないため、等幅フォントを使う |
| ループさせたい | `forwards` ではなく `infinite alternate` にすると「打つ→消す」を繰り返す |
