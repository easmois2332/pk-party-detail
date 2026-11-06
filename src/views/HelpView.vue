<script setup>
import {ref} from "vue";

const partyCssLink = ref('<link href="https://easmois2332.github.io/pk-assets/css/party_output.css" rel="stylesheet">');
const detailCssLink = ref('<link href="https://easmois2332.github.io/pk-assets/css/detail_output.css" rel="stylesheet">');
const buttonCssCopy = () => {
  navigator.clipboard.writeText(partyCssLink.value + "\n" + detailCssLink.value);
}

</script>

<template>
  <div class="content-area">
    <v-card class="mb-4" title="本サイトについて">
      <v-card-text>
        <span>
          構築詳細アウトプットは入力された情報を画像、表として出力するツールです。<br>
          本サイトによって受けた損害については一切の責任を負いません。<br>
          使用している画像の著作権は権利者様へ帰属します。また、権利者様側からの画像等の削除の依頼、警告には速やかに対処いたします。
        </span>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="連絡先">
      <v-card-text>
        <a href="https://x.com/cs32kiy" target="_blank">@cs32kiy</a><span>(X)</span>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="推奨環境">
      <v-card-text>
        <span>
          Google Chrome ブラウザ
        </span>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="機能説明">
      <v-card-text>
        <div class="mb-4">
          <span class="font-bold">情報入力</span><br>
          <span>
            出力したい情報を入力するタブです。<br>
            ある程度自由な入力を許可している為、自動で数値を算出する様な機能はありません。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">情報出力</span><br>
          <span>
            入力した情報を元に画像、Iframe、HTMLを出力するタブです。<br>
            「出力設定」からデザイン、テーマカラーを設定できます。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">画像で保存</span><br>
          <span>
            出力結果に表示されている内容を画像で保存します。<br>
            ブラウザをズームして保存すると画像のサイズも大きくなります。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">IFRAMEをコピー</span><br>
          <span>
            出力結果に表示されている内容を表示するiframeタグをクリップボードにコピーします。<br>
            表示内容に合わせたwidthとheightを計算しています。貼り付け先のブログなどに合わせて調整してください。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">HTMLをコピー</span><br>
          <span>
            出力結果に表示されている内容のHTMLをクリップボードにコピーします。<br>
            別途CSSの設定が必要になります。以下のCSSリンクを貼り付け先のブログに設定するか、各自でCSSを設定してください。
          </span>
          <v-card variant="tonal">
            <v-card-text>
              <p>{{ partyCssLink }}</p>
              <p>{{ detailCssLink }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="buttonCssCopy">クリップボードにコピー</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="mb-4">
          <span class="font-bold">はてなブログへのCSSリンクの設定方法</span><br>
          <span>
            「ブログを管理」から「設定」>「詳細設定」へアクセス。<br>
            「head内タグ」の「&lt;head&gt;要素にメタデータを追加」にコピーしたCSSリンクを貼り付けて保存。
          </span>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="更新履歴">
      <v-card-text>
        <div>
          <span class="font-bold">v1.2.0</span><br>
          <span>
            サイトデザインを全体的に調整<br>
            出力結果に表示されている内容が見切れている状態で「画像で保存」をしても保存される画像が見切れないように修正<br>
          </span>
        </div>
      </v-card-text>
      <v-card-text>
        <div>
          <span class="font-bold">v1.1.0</span><br>
          <span>
            「Pokémon LEGENDS Z-A」で追加されたメガシンカを追加<br>
            「バケッチャ」「パンプジン」のフォルム名を「Pokémon LEGENDS Z-A」以降のものに変更<br>
            「構築詳細」の出力デザインを調整
          </span>
        </div>
      </v-card-text>
      <v-card-text>
        <div>
          <span class="font-bold">v1.0.0</span><br>
          <span>
            リリース
          </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
