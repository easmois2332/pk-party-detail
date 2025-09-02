<script setup>
const props = defineProps(['settingColor']);

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
          <span class="font-bold"><v-icon icon="mdi-cog"></v-icon>設定</span><br>
          <span>
            本サイトの設定ができます。<br>
            設定したテーマカラーは出力される画像、表に反映されます。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">構築詳細</span><br>
          <span>
            入力した情報を元に構築の一覧を出力できます。<br>
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">個別詳細</span><br>
          <span>
            入力した情報を元に個別詳細を出力できます。<br>
            ある程度自由な入力を許可している為、自動で数値を算出する様な機能はありません。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">画像で保存</span><br>
          <span>
            出力欄に表示されている内容を画像で保存します。<br>
            表示内容そのままで保存する為、横幅の狭いスマートフォン端末など、内容が見切れている状態で保存すると見切れている状態で保存されます。<br>
            スマートフォンを横持ちにし、内容が見切れないようにして保存するか、タブレット端末、PC端末などをご利用ください。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">IFRAMEをコピー</span><br>
          <span>
            出力欄に表示されている内容を表示するiframeタグをクリップボードにコピーします。<br>
            表示内容に合わせたwidthとheightを計算しています。貼り付け先のブログなどに合わせて調整していください。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">HTMLをコピー</span><br>
          <span>
            出力欄に表示されている内容のHTMLをクリップボードにコピーします。<br>
            別途CSSの設定が必要になります。後述のCSSリンクを貼り付け先のブログに設定してください。
          </span>
        </div>
        <div class="mb-4">
          <span class="font-bold">CSSリンクをコピー</span><br>
          <span>
            CSSリンクをクリップボードにコピーします。<br>
            HTMLを使用する場合に貼り付け先のブログに設定してください。
          </span>
        </div>
        <div class="mb-4 ml-4">
          <span class="font-bold">はてなブログへのCSSリンクの設置方法</span><br>
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
          <span class="font-bold">v1.0.0</span><br>
          <span>
            リリース
          </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
