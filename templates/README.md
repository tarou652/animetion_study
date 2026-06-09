# Templates — 新しいデモの雛形

新しいデモを追加するときの雛形。このフォルダはビルド対象外（`content/` でも `app/` でもない）なので、ここに置いても公開されません。

## 使い方（CSS デモを追加する例：slug を `clip-path-morph` とする）

**追加するのは 2 ファイルだけ**。コンポーネントは `import.meta.glob` で自動検出されるため、対応表の編集は不要です。

| # | 操作 | コピー元 → コピー先 |
|---|------|--------------------|
| 1 | 理論 + メタデータ | `templates/css/demo.md` → `content/css/clip-path-morph.md` |
| 2 | アニメーション本体 | `templates/css/Demo.vue` → `app/components/demos/css/ClipPathMorph.vue` |

### コピー後にやること

1. `content/css/clip-path-morph.md` の frontmatter を埋める
   - `component:` は手順 2 のファイル名から決まる自動インポート名にする
     （`app/components/demos/css/ClipPathMorph.vue` → `DemosCssClipPathMorph`）
   - `order:` は既存デモと重複しない番号にする
2. `app/components/demos/css/ClipPathMorph.vue` の `demo-*` クラスをリネームし、アニメーションを実装

### 確認

```bash
npm run dev        # /css/clip-path-morph で表示確認
npm run generate   # 本番ビルドが通るか確認
```

> 詳細な規約は各テンプレートの先頭コメントと、リポジトリ直下の `CLAUDE.md` / `README.md` を参照。

## 命名の対応（自動インポート名）

| コンポーネントのパス | frontmatter `component:` に書く名前 |
|----------------------|--------------------------------------|
| `app/components/demos/css/ClipPathMorph.vue` | `DemosCssClipPathMorph` |
| `app/components/demos/gsap/ScrollReveal.vue` | `DemosGsapScrollReveal` |

`demos/` 以降のディレクトリ名とファイル名を PascalCase で連結したものになる。
