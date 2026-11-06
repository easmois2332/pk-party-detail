<script setup>
import {ref} from "vue";
import html2canvas from "html2canvas";
import OutputDetailType1 from "@/components/OutputDetailType1.vue";
import OutputDetailType2 from "@/components/OutputDetailType2.vue";

const detail = defineModel({required: true});
const type = ref('type1');
const typeItems = [
  {title: '横長', value: 'type1'},
  {title: '縦長', value: 'type2'},
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

let iframeButton = ref({});
let htmlButton = ref({});

// スクリーンショットを撮る
const buttonScreenShot = async (query) => {
  const el = document.querySelector(query);
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
    object.download = `PkDetail_${(new Date()).getTime()}.png`;
    document.body.appendChild(object);
    object.click();
    object.parentNode.removeChild(object);
  })
}

// iframeをコピー
const buttonIframeCopy = (query, type, i) => {
  let el = document.querySelector(query);
  let param = new URLSearchParams(JSON.stringify(detail.value[i]));
  let url = document.location.href + 'iframe/detail' + type + '?color=' + color.value + '&detail=' + param.toString().replace('=', '')
  navigator.clipboard.writeText('<iframe frameborder="no" scrolling="no" width="' + el.clientWidth + '" height="' + el.clientHeight + '" src="' + url + '"></iframe>');
  iframeButton.value[i] = true;
  setTimeout(() => (iframeButton.value[i] = false), 3000)
}

// HTMLをコピー
const buttonHtmlCopy = (query, type, i) => {
  let el = document.querySelector(query);
  navigator.clipboard.writeText(el.outerHTML);
  htmlButton.value[i] = true;
  setTimeout(() => (htmlButton.value[i] = false), 3000)
}
</script>

<template>
  <v-card class="detail-output-area">
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
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-text>
      <div class="output">
        <v-card class="mb-4">
          <v-card-title>出力結果</v-card-title>
          <v-card-text class="output-area" v-if="type === 'type1'">
            <v-row v-for="i in 6" :key="i">
              <v-col class="output-image type-1 overflow-auto" v-bind:class="'index' + i" cols="12" sm="6">
                <div class="pk-detail-area">
                  <OutputDetailType1 v-model="detail[i]" v-model:color="color"/>
                </div>
              </v-col>
              <v-col class="output-button-area" cols="12" sm="6">
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color"
                         @click="buttonScreenShot('.output-image.type-1.index' + i + ' > .pk-detail-area')">画像で保存
                  </v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="iframeButton[i]"
                         @click="buttonIframeCopy('.output-image.type-1.index' + i + ' > .pk-detail-area', 1, i)">
                    iframeをコピー
                    <template v-slot:loader>
                      <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    </template>
                  </v-btn>
                </div>
                <div class="output-button pt-2 pb-2">
                  <v-btn class="text-white" v-bind:color="color" :loading="htmlButton[i]"
                         @click="buttonHtmlCopy('.output-image.type-1.index' + i + ' > .pk-detail-area', 1, i)">
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
              <v-col cols="12" sm="6" md="4" v-for="i in 6" :key="i">
                <v-col class="output-image type-2 overflow-auto" v-bind:class="'index' + i" cols="12" sm="12">
                  <div class="pk-detail-area">
                    <OutputDetailType2 v-model="detail[i]" v-model:color="color"/>
                  </div>
                </v-col>
                <v-col class="output-button-area" cols="12" sm="12">
                  <div class="output-button pt-2 pb-2">
                    <v-btn class="text-white" v-bind:color="color"
                           @click="buttonScreenShot('.output-image.type-2.index' + i + ' > .pk-detail-area')">画像で保存
                    </v-btn>
                  </div>
                  <div class="output-button pt-2 pb-2">
                    <v-btn class="text-white" v-bind:color="color" :loading="iframeButton[i]"
                           @click="buttonIframeCopy('.output-image.type-2.index' + i + ' > .pk-detail-area', 2, i)">
                      iframeをコピー
                      <template v-slot:loader>
                        <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                      </template>
                    </v-btn>
                  </div>
                  <div class="output-button pt-2 pb-2">
                    <v-btn class="text-white" v-bind:color="color" :loading="htmlButton[i]"
                           @click="buttonHtmlCopy('.output-image.type-2.index' + i + ' > .pk-detail-area', 2, i)">
                      HTMLをコピー
                      <template v-slot:loader>
                        <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                      </template>
                    </v-btn>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
