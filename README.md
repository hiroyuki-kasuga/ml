#ml
GoogleGroupAPIを使ったML管理ツール
HTML, Javascript, CSSのみなのでサーバにアップすれば動作します。

#ビルド
    git clone https://github.com/hiroyuki-kasuga/ml.git
    cd path/to/ml
    npm install
    #Google APIのクライアントIDを取得して、書き換え
    vi ml/src/config/config.json.sample
    mv ml/src/config/config.json.sample ml/src/config/config.json
    grunt build

#開発環境
    grunt serve
