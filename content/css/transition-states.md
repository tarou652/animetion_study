---
title: "transitionで状態変化"
description: "hover・focus・active などの状態変化に滑らかなトランジションを付与する。CSSだけでUIに生命感を与える最も実践的な技術。"
slug: transition-states
difficulty: beginner
tags: [transition, hover, focus, active, states]
order: 4
component: DemosCssTransitionStates
code:
  css: |
    /* transition の基本 */
    .button {
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.3);
      color: #00d4ff;
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .button:hover {
      background: rgba(0, 212, 255, 0.25);
      transform: scale(1.05);
    }

    /* 複数プロパティ */
    .card {
      transition: transform 0.3s ease-out,
                  box-shadow 0.3s ease-out;
    }

    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0, 212, 255, 0.2);
    }

    /* フォーカス状態 */
    .input {
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .input:focus {
      border-color: rgba(0, 212, 255, 0.5);
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
      outline: none;
    }

    /* transition: all は避けること */
    /* .bad { transition: all 0.3s; } ← パフォーマンスに悪影響 */
  html: |
    <button class="button">Hover me</button>
    <div class="card">Hover card</div>
    <input class="input" type="text" placeholder="Click to focus">
tips:
  - "`transition: all` は便利だが、変化しないプロパティも監視するためパフォーマンスが低下する。変化するプロパティのみ明示的に指定しよう。"
  - "UXの基本：出現は `ease-out`（速く現れゆっくり止まる）、消滅は `ease-in`（ゆっくり始まり速く消える）。"
  - "`:hover` のスタイルに `transition` を書いても動作するが、マウスを離したときに元に戻る際のトランジションが効かない。必ず**基底状態**に `transition` を書くこと。"
  - "モバイル端末はホバー状態が存在しないため、`:hover` だけでなく `:focus` と `:active` も合わせて設定しよう。"
related:
  - transform-gallery
  - keyframes-basics
---

## transition の仕組み

`transition` はCSSプロパティが変化するときに、その変化を**アニメーションとして補完**します。`@keyframes` と異なり、JavaScriptなしで状態変化（:hover, :focus, :active）に対して自動的に発動します。

### 構文

```css
transition: プロパティ名 時間 タイミング関数 遅延;

/* 複数のプロパティ */
transition: opacity 0.3s ease,
            transform 0.3s ease-out 0.1s;
```

### @keyframes との使い分け

| | transition | @keyframes |
|---|------------|-----------|
| 発動タイミング | 状態変化時（自動） | animation プロパティで制御 |
| ループ | 不可 | `infinite` で可能 |
| 中間ステップ | 2点のみ | 複数ステップ指定可 |
| ユースケース | hover, focus, active | ローディング、入場アニメ |

### prefers-reduced-motion への対応

アクセシビリティのため、アニメーション無効化設定を尊重しましょう：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```
