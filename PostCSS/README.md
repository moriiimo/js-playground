****getting started
http://webpack.github.io/docs/tutorials/getting-started/

****webpack.config.js
この名前のファイルを設定ファイルと認識して読みに行く
entry
   |_ エントリポイント
output
   |_ path アウトプットの出力先パス
   |_ filename ファイル名
module
   |_ loaders 配列で指定する。
      test: にファイルのマッチ条件を書くと満たしている場合loaderで変換される
      http://webpack.github.io/docs/configuration.html#module-loaders
