---
title: "transformプロパティ図鑑"
description: "translate・scale・rotate・skew の4大変形関数をインタラクティブに体験。transform はアニメーションのパフォーマンスに最も優れたプロパティ。"
slug: transform-gallery
difficulty: beginner
tags: [transform, translate, scale, rotate, skew]
order: 3
component: DemosCssTransformGallery
code:
  css: |
    /* transform の4大関数 */

    /* 移動 */
    .translate { transform: translate(30px, -10px); }
    .translate-x { transform: translateX(50px); }
    .translate-y { transform: translateY(-20px); }

    /* 拡縮 */
    .scale    { transform: scale(1.5); }
    .scale-xy { transform: scale(1.2, 0.8); }  /* X軸とY軸を個別に指定 */

    /* 回転 */
    .rotate      { transform: rotate(45deg); }
    .rotate-3d   { transform: rotateY(180deg); }

    /* 傾き */
    .skew   { transform: skewX(20deg); }
    .skew-y { transform: skewY(10deg); }

    /* 複数変形を連結（右から左の順で適用される） */
    .combined {
      transform: translateX(20px) rotate(45deg) scale(1.2);
    }
tips:
  - "transform はブラウザがGPUで処理するため、top/left/margin よりも圧倒的に高パフォーマンス。"
  - "複数の transform 関数を連結するとき、**適用順序は右から左**。`translateX(50px) rotate(45deg)` は「45度回転後に50px移動」。"
  - "`transform-origin` で変形の基点を変更できる。デフォルトは要素の中心 (50% 50%)。"
  - "`will-change: transform` を予告することでブラウザが事前にGPUレイヤーを準備できるが、多用すると逆効果になる。"
related:
  - keyframes-basics
  - transition-states
---

## transform とは？

`transform` プロパティは要素の**視覚的な変形**を指定します。最大の特徴は、**レイアウトに影響を与えない**こと。`top`/`left` を変えるとリフローが発生しますが、`transform` はコンポジット処理のためGPUで高速に処理されます。

### パフォーマンスの黄金律

アニメーションで変化させるプロパティの優先度：

| レイヤー | プロパティ | コスト |
|---------|-----------|-------|
| Composite（最速）| `transform`, `opacity` | GPU処理・リフローなし |
| Paint | `background`, `color`, `border` | 再描画のみ |
| Layout（最遅） | `width`, `height`, `top`, `margin` | リフロー発生 |

### 座標系について

```css
/* % 指定は要素自身のサイズが基準 */
transform: translateX(100%);  /* 要素の幅分だけ移動 */
transform: translateY(-50%);  /* 要素の高さの半分だけ上に */

/* px 指定は絶対値 */
transform: translate(20px, -10px);
```

中央寄せに便利なテクニック：

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
