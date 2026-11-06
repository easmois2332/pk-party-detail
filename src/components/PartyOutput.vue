<script setup>
import {ref} from "vue";
import html2canvas from "html2canvas";
import OutputPartyType1 from "@/components/OutputPartyType1.vue";
import OutputPartyType2 from "@/components/OutputPartyType2.vue";
import OutputPartyType3 from "@/components/OutputPartyType3.vue";

const detail = defineModel({required: true});
const type = ref('type1');
const typeItems = [
  {title: '簡易表示', value: 'type1'},
  {title: '詳細表示（横長）', value: 'type2'},
  {title: '詳細表示（縦長）', value: 'type3'},
];
const color = ref('blue');
const colorItems = [
  {title: '赤', value: 'red'},
  {title: '緑', value: 'green'},
  {title: '青', value: 'blue'},
  {title: '黄', value: 'amber'},
  {title: '茶', value: 'brown'},
  {title: '灰', value: 'blue-grey'},
];
const count = ref(6);

let iframeButton = ref(false);
let htmlButton = ref(false);

// スクリーンショットを撮る
const buttonScreenShot = async () => {
  const el = document.querySelector('.output-image > .pk-party-area');
  const canvasElement = await html2canvas(el, {proxy: true, useCORS: true}).catch(e => {
    console.error(e);
  });
  canvasElement.toBlob(async blob => {
    if (!blob) {
      console.error('Blob create error.');
      return false;
    }
    let blobUrl = window.URL.createObjectURL(blob);
    let object = document.createElement('a');
    object.href = blobUrl;
    object.download = `PkParty_${(new Date()).getTime()}.png`;
    document.body.appendChild(object);
    object.click();
    object.parentNode.removeChild(object);
  })
}

// iframeをコピー
const buttonIframeCopy = (type) => {
  let el = document.querySelector('.output-image > .pk-party-area');
  let output = Object.fromEntries(Object.entries(detail.value).slice(0, count.value));
  let param = new URLSearchParams(JSON.stringify(output));
  let url = document.location.href + 'iframe/party' + type + '?color=' + color.value + '&party=' + param.toString().replace('=', '');
  navigator.clipboard.writeText('<iframe frameborder="no" scrolling="no" width="' + el.clientWidth + '" height="' + el.clientHeight + '" src="' + url + '"></iframe>');
  iframeButton.value = true;
  setTimeout(() => (iframeButton.value = false), 3000)
}

// HTMLをコピー
const buttonHtmlCopy = () => {
  let el = document.querySelector('.output-image > .pk-party-area');
  navigator.clipboard.writeText(el.outerHTML);
  htmlButton.value = true;
  setTimeout(() => (htmlButton.value = false), 3000)
}
</script>

<template>
  <v-card class="party-output-area">
    <v-card-text>
      <v-card class="mb-4">
        <v-card-title>出力設定</v-card-title>
        <v-card-text>
          <v-row class="setting-area">
            <v-col class="pb-0" cols="12" sm="6">
              <v-select
                  label="デザイン"
                  v-model="type"
                  :items="typeItems"
                  item-title="title"
                  item-value="value"
              ></v-select>
            </v-col>
            <v-col class="pb-0" cols="12" sm="6">
              <v-select
                  label="テーマカラー"
                  v-model="color"
                  :items="colorItems"
                  item-title="title"
                  item-value="value"
              ></v-select>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12">
              <v-number-input
                  label="ポケモンの数"
                  v-model="count"
                  :min="1"
                  :max="6"
              ></v-number-input>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-text>
      <div class="output">
        <v-card class="mb-4">
          <v-card-title>出力結果</v-card-title>
          <v-card-text class="output-area" v-if="type === 'type1'">
            <v-row>
              <v-col class="output-image overflow-auto" cols="12" sm="6">
                <div class="pk-party-area">
                  <OutputPartyType1 v-model="detail" v-model:count="count" v-model:color="color"/>
                </div>
              </v-col>
              <v-col class="output-button-area" cols="12" sm="6">
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" @click="buttonScreenShot">画像で保存</v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="iframeButton" @click="buttonIframeCopy(1)">
                    iframeをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="htmlButton" @click="buttonHtmlCopy">
                    HTMLをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="output-area" v-if="type === 'type2'">
            <v-row>
              <v-col class="output-image overflow-auto" cols="12" sm="12">
                <div class="pk-party-area">
                  <OutputPartyType2 v-model="detail" v-model:count="count" v-model:color="color"/>
                </div>
              </v-col>
              <v-col class="output-button-area" cols="12" sm="12">
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" @click="buttonScreenShot">画像で保存</v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="iframeButton" @click="buttonIframeCopy(2)">
                    iframeをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="htmlButton" @click="buttonHtmlCopy">
                    HTMLをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="output-area" v-if="type === 'type3'">
            <v-row>
              <v-col class="output-image overflow-auto" cols="12" sm="12">
                <div class="pk-party-area">
                  <OutputPartyType3 v-model="detail" v-model:count="count" v-model:color="color"/>
                </div>
              </v-col>
              <v-col class="output-button-area" cols="12" sm="12">
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" @click="buttonScreenShot">画像で保存</v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="iframeButton" @click="buttonIframeCopy(3)">
                    iframeをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="htmlButton" @click="buttonHtmlCopy">
                    HTMLをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
