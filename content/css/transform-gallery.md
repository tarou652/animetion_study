---
title: "transform プロパティ図鑑"
description: "translate / scale / rotate / skew — レイアウトを壊さず要素を変形する。"
difficulty: beginner
tags: [transform, translate, scale, rotate]
order: 3
component: DemosCssTransformGallery
code:
  css: |
    .translate { transform: translate(20px, -16px); }
    .scale     { transform: scale(1.4); }
    .rotate    { transform: rotate(45deg); }
    .skew      { transform: skew(18deg, 6deg); }

    /* 複数の変形は半角スペースで連結。適用順は右→左 */
    .combo {
      transform: translateX(20px) rotate(45deg) scale(1.2);
    }

    /* 3D。perspective で奥行きを与える */
    .flip {
      transform: perspective(300px) rotateY(50deg);
    }
tips:
  - "transform はレイアウト（リフロー）を起こさず GPU 合成されるため高速。"
  - "複数の関数を並べると右から順に適用される。順序で結果が変わる点に注意。"
  - "transform-origin で変形の基準点（回転軸・拡大中心）を変えられる。"
---

## transform とは

`transform` は要素を **見た目だけ変形** させるプロパティです。
`top` / `left` / `width` のようにレイアウトを再計算（リフロー）させず、
GPU の合成レイヤーで処理されるため、アニメーションに最適です。

## 主な関数

| 関数 | 効果 |
|------|------|
| `translate(x, y)` | 平行移動 |
| `scale(n)` | 拡大・縮小 |
| `rotate(deg)` | 回転 |
| `skew(x, y)` | せん断（傾き） |
| `matrix(...)` | 上記をまとめた行列指定 |

3D 版として `translateZ` / `rotateX` / `rotateY` などもあり、
親に `perspective` を与えると奥行きが生まれます。

## 関数の連結と順序

複数の関数はスペースで区切って並べます。**適用は右から左** に行われるため、
並び順を変えると結果も変わります。

```css
/* 回転してから移動 vs 移動してから回転 — 最終位置が異なる */
transform: rotate(45deg) translateX(50px);
transform: translateX(50px) rotate(45deg);
```

## transform-origin

変形の基準点は既定で要素の中心ですが、`transform-origin` で変更できます。

```css
.box {
  transform-origin: top left; /* 左上を軸に回転・拡大 */
  transform: rotate(15deg);
}
```
