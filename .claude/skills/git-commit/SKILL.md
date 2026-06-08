---
name: git-commit
description: Conventional Commits 形式で Animation Lab のコミットメッセージを作成する。ユーザーが「コミットして」「commit」「コミットメッセージを書いて」と依頼したとき、または git のステージ済み変更をコミットする際に使用する。
---

# Git Commit — Animation Lab

このプロジェクトは **Conventional Commits** 形式でコミットメッセージを書く。
（参考: affaan-m/ECC の everything-claude-code 規約をベースに調整）

## メッセージ形式

```
<type>(<scope>): <subject>
```

- **type**: 変更の種類（下表）
- **scope**: 変更範囲（省略可）。このプロジェクトでは `css`, `gsap`, `content`, `ui`, `config` など
- **subject**: 命令形・現在形（"Add" であって "Added" ではない）。約 65 文字以内。末尾にピリオドを付けない

## type 一覧

| type | 用途 | 例 |
|------|------|-----|
| `feat` | 新機能・新デモの追加 | `feat(css): add stagger-effect demo` |
| `fix` | バグ修正 | `fix(css): correct fill-mode reset on replay` |
| `test` | テストの追加・修正 | `test: add timing-function snapshot test` |
| `docs` | ドキュメント変更 | `docs: update CLAUDE.md with phase 2 plan` |
| `style` | フォーマット（動作に影響しない） | `style(ui): align card grid gap` |
| `refactor` | リファクタリング | `refactor(content): extract demo schema` |
| `chore` | ビルド・依存・設定 | `chore: bump nuxt to 4.4.7` |

## ルール

1. **命令形・現在形**で書く（"Add feature" / NOT "Added feature"）
2. subject は **約 65 文字以内**、末尾ピリオドなし
3. **曖昧なメッセージを避ける**（"update", "fix bug", "changes" 単独は不可）
4. 複数の論理変更は分けてコミットする
5. body が必要なら subject の後に空行を挟んで記述

## このプロジェクト固有の例

```
feat(css): add clip-path-morph advanced demo
feat(content): add transform-gallery markdown with tips
fix(css): use left-based keyframes for percentage tracks
fix(config): pin better-sqlite3 for @nuxt/content build
docs: document Nuxt 4 srcDir layout in CLAUDE.md
chore(config): add WebFetch permission for github raw
style(ui): unify glassmorphism border opacity
```

## ワークフロー

1. `git status` と `git diff` で変更内容を確認
2. 関連する変更ごとに `git add` でステージ
3. 上記形式でコミットメッセージを構築
4. `git commit` を実行

## 注意

- 新デモ追加時は frontmatter・コンポーネント・`AnimationCard.vue` の `demoComponentMap` がセットで変わるため、`feat(css): add <slug> demo` として 1 コミットにまとめてよい
- `package.json` と `package-lock.json` の依存変更は `chore` でまとめる
