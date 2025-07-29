# 星座インタラクティブアニメーション テンプレート 使い方ガイド

このプロジェクトは、星座と詩のインタラクティブアニメーションを簡単に作成できるテンプレートです。

## 🌟 機能

- ドラッグ可能な星空背景
- キラキラ光る星のアニメーション
- 星座のホバー・クリックインタラクション
- 詩の自動表示アニメーション
- 効果音（ホバー・近接時）
- 複数の星座に対応

## 📁 ファイル構成

```
docs/
├── index.html                    # メインHTMLファイル
├── style.css                     # スタイルシート
├── script.js                     # 元のうさぎ座スクリプト
├── script_template.js            # 完全テンプレート版
├── script_easy_switch.js         # 簡単切り替え版
├── script_kujira_example.js      # くじら座の例
├── script_okami_example.js       # おおかみ座の例
├── TEMPLATE_README.md            # 詳細な技術ドキュメント
├── USAGE_GUIDE.md               # このファイル
├── fonts/
│   └── Newstarwords-Regular.ttf  # カスタムフォント
├── images/                       # 星座画像フォルダ
│   ├── usagi_point.PNG           # うさぎ座（点のみ）
│   ├── usagi_line.PNG            # うさぎ座（線画）
│   ├── cop_point.PNG, cop_line.PNG
│   ├── hutago_point.PNG, hutago_line.PNG
│   ├── kujira_point.PNG, kujira_line.PNG
│   ├── okami_point.PNG, okami_line.PNG
│   ├── otome_point.PNG, otome_line.PNG
│   ├── tenbin_point.PNG, tenbin_line.PNG
│   └── tokei_point.PNG, tokei_line.PNG
└── sounds/
    └── bell.mp3                  # 効果音
```

## 🚀 使い方（3つの方法）

### 方法1: 簡単切り替え版（推奨）

`script_easy_switch.js`を使用して簡単に星座を切り替えできます。

1. `index.html`でスクリプトを変更：
   ```html
   <script src="script_easy_switch.js"></script>
   ```

2. `script_easy_switch.js`の上部で、使いたい星座のコメントアウトを外す：
   ```javascript
   // ★ うさぎ座（現在有効）
   const CONSTELLATION_CONFIG = { ... };

   // ★ くじら座（使いたい場合はこちらのコメントアウトを外して、他をコメントアウト）
   // const CONSTELLATION_CONFIG = { ... };
   ```

### 方法2: 完全カスタム版

`script_template.js`をコピーして独自の設定を作成できます。

1. `script_template.js`をコピーして新しいファイルを作成
2. 上部の`CONSTELLATION_CONFIG`オブジェクトを編集
3. `index.html`で新しいスクリプトを読み込み

### 方法3: 作成済みの例を使用

既に作成済みの例を使用できます：
- `script_kujira_example.js` - くじら座の例
- `script_okami_example.js` - おおかみ座の例

## ⚙️ 設定項目

### 基本設定
```javascript
name: 'usagi',        // 画像ファイルのベース名
title: 'うさぎ',       // 表示タイトル
x: 1000,             // 星座のX座標
y: 500,              // 星座のY座標
```

### 詩の設定
```javascript
poemLines: [
  '1行目',
  '2行目',
  // ... 最大16行（4行×4グループ）
]
```

### 音響設定
```javascript
soundFile: 'sounds/bell.mp3',  // 音声ファイル
nearVolume: 0.1,               // 近接時音量
hoverVolume: 0.5,              // ホバー時音量
```

### アニメーション設定
```javascript
animationDuration: 2000,       // アニメーション時間（ms）
poemDisplayTime: 7000,         // 詩の表示時間（ms）
fadeTime: 1000,                // フェード時間（ms）
```

## 🎨 新しい星座を追加する手順

### 1. 画像を準備
星座には2つの画像が必要です：
- `{name}_point.PNG` - 星の点のみ
- `{name}_line.PNG` - 星座の線画

### 2. 画像を配置
`images/`フォルダに画像を配置します。

### 3. 設定を作成
以下のテンプレートを使用して設定を作成：

```javascript
const CONSTELLATION_CONFIG = {
  name: 'あなたの星座名',           // 画像ファイル名のベース
  title: '表示タイトル',           // 画面に表示されるタイトル
  x: 1000,                      // 星座の位置（X座標）
  y: 500,                       // 星座の位置（Y座標）
  poemLines: [
    '詩の1行目',
    '詩の2行目',
    // ... 続く
    '最後の感情語',              // 13行目は単独で表示される特別な行
  ],
  // 以下はデフォルト設定（必要に応じて調整）
  soundFile: 'sounds/bell.mp3',
  nearVolume: 0.1,
  hoverVolume: 0.5,
  animationDuration: 2000,
  poemDisplayTime: 7000,
  fadeTime: 1000,
  imageScale: 0.7,
  poemLineHeight: 50,
  columnSpacing: 100
};
```

## 📝 詩の書き方のコツ

1. **4行×3グループ + 最後の感情語** の構成
2. **縦書き表示**のため、文字数を考慮
3. **最後の行（13行目）**は感情を表す単語（例：「さみしい」「つよい」「とおい」）
4. **リズム感**を意識した言葉選び

### 詩の例パターン
```
グループ1（4行）: 状況設定
グループ2（4行）: 変化・展開
グループ3（4行）: 思いや感情
最後（1行）: 核となる感情語
```

## 🔧 トラブルシューティング

### 画像が表示されない
- ファイル名が`{name}_point.PNG`、`{name}_line.PNG`の形式になっているか確認
- 画像ファイルが`images/`フォルダにあるか確認
- `name`設定が画像ファイル名と一致しているか確認

### 音が出ない
- ブラウザで音声再生が許可されているか確認
- 最初にクリックまたはマウス移動を行ったか確認（音声の初期化が必要）
- 音声ファイルのパスが正しいか確認

### 星座が見つからない
- 星座の座標（x, y）が適切な範囲内にあるか確認
- ドラッグして星空を移動して星座を探してみる

## 🎯 応用例

### 季節の星座シリーズ
```javascript
// 春の星座
name: 'otome', title: '乙女座', x: 900, y: 400
// 夏の星座
name: 'tenbin', title: 'てんびん座', x: 1100, y: 600
// 秋の星座
name: 'cop', title: 'コップ座', x: 800, y: 700
// 冬の星座
name: 'okami', title: 'おおかみ座', x: 1200, y: 300
```

### 感情テーマ別
- **孤独**: うさぎ座（「さみしい」）
- **強さ**: おおかみ座（「つよい」）
- **遠さ**: くじら座（「とおい」）
- **静寂**: コップ座（「しずか」）

## 📚 さらなるカスタマイズ

より高度なカスタマイズについては`TEMPLATE_README.md`を参照してください。

- 複数星座の同時表示
- カスタム音声ファイル
- 新しいアニメーションパターン
- UIデザインの変更

---

**作成者向けメモ**: このテンプレートは教育目的で作成されており、HTML5 Canvas、JavaScript、インタラクティブアニメーションの学習に適しています。
