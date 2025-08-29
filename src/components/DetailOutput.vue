<script setup>
import {ref, watch} from "vue";
import html2canvas from "html2canvas";
import pokemon from "@/classes/pokemon.js"
import nature from "@/assets/json/nature.json"

const props = defineProps(['settingColor', 'detailData']);
const pkClass = new pokemon();

const pkName = pkClass.getPkNameList();

let genderList = ref([]);
let imageName = ref('0000_000_uk_n_000');

let detail = ref({
  pokemon: null,
  gender: null,
  level: 50,
  nature: null,
  ability: null,
  item: null,
  moves1: null,
  moves2: null,
  moves3: null,
  moves4: null,
  hp: null,
  attack: null,
  defense: null,
  sp_attack: null,
  sp_defense: null,
  speed: null,
  free: null,
});

let htmlButton = ref(false);
let cssButton = ref(false);
let iframeButton = ref(false);

const getImage = (name, gender) => {
  imageName.value = pkClass.getPkImage(name, gender);
}

const changePkName = (name) => {
  genderList.value = pkClass.getPkGenderList(name);
  detail.value['gender'] = null;
  getImage(name, detail.value['gender']);
}

// スクリーンショットを撮る
const buttonScreenShot = async () => {
  const el = document.querySelector('.output-image > table.pk-detail');
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

// HTMLをクリップボードにコピー
const buttonHtmlCopy = () => {
  let el = document.querySelector('.output-image > table.pk-detail');
  navigator.clipboard.writeText(el.outerHTML);
  htmlButton.value = true;
  setTimeout(() => (htmlButton.value = false), 3000)
}

// CSSリンクをクリップボードにコピー
const buttonCssCopy = () => {
  navigator.clipboard.writeText('<link href="https://easmois2332.github.io/pk-assets/css/detail_output.css" rel="stylesheet">');
  cssButton.value = true;
  setTimeout(() => (cssButton.value = false), 3000)
}

watch(() => props.detailData, () => {
  if (props.detailData !== null) {
    detail.value['pokemon'] = props.detailData['pokemon'];
    detail.value['gender'] = props.detailData['gender'];
    detail.value['ability'] = props.detailData['ability'];
    detail.value['item'] = props.detailData['item'];
    detail.value['moves1'] = props.detailData['moves1'];
    detail.value['moves2'] = props.detailData['moves2'];
    detail.value['moves3'] = props.detailData['moves3'];
    detail.value['moves4'] = props.detailData['moves4'];
    detail.value['free'] = props.detailData['free'];
    genderList.value = pkClass.getPkGenderList(detail.value['pokemon']);
    getImage(detail.value['pokemon'], detail.value['gender']);
  }
});
</script>

<template>
  <v-card class="detail-output-area" title="個別詳細">
    <v-card-text>
      <div class="detail">
        <v-card class="mb-4">
          <v-card-title>入力</v-card-title>
          <v-card-text>
            <v-row class="input-area">
              <v-col class="pb-0">
                <v-autocomplete
                    label="ポケモン名"
                    :items="pkName"
                    v-model="detail['pokemon']"
                    @update:modelValue="changePkName(detail['pokemon'])"
                ></v-autocomplete>
              </v-col>
              <v-col class="pb-0">
                <v-select
                    label="性別"
                    :items="genderList"
                    v-model="detail['gender']"
                    v-bind:disabled="genderList.length === 0"
                    @update:modelValue="getImage(detail['pokemon'], detail['gender'])"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-number-input
                    :reverse="false"
                    controlVariant="stacked"
                    label="レベル"
                    :hideInput="false"
                    :inset="false"
                    :min="1"
                    :max="100"
                    v-model="detail['level']"
                ></v-number-input>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-autocomplete
                    label="性格"
                    :items="nature"
                    v-model="detail['nature']"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特性"
                    v-model="detail['ability']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="持ち物"
                    v-model="detail['item']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="HP"
                    v-model="detail['hp']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="攻撃"
                    v-model="detail['attack']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="防御"
                    v-model="detail['defense']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特攻"
                    v-model="detail['sp_attack']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特防"
                    v-model="detail['sp_defense']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="素早さ"
                    v-model="detail['speed']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技1"
                    v-model="detail['moves1']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技2"
                    v-model="detail['moves2']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技3"
                    v-model="detail['moves3']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技4"
                    v-model="detail['moves4']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="自由入力欄"
                    v-model="detail['free']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div class="output">
        <v-card class="mb-4">
          <v-card-title>出力</v-card-title>
          <v-card-text class="output-area">
            <div class="output-image">
              <table class="pk-detail">
                <thead class="pk-detail">
                <tr class="pk-detail" v-bind:class="props.settingColor + '-3'">
                  <th class="pk-detail" colspan="2">{{ detail['pokemon'] }} {{ detail['gender'] }}</th>
                  <td class="pk-detail">Lv.{{ detail['level'] }}</td>
                </tr>
                </thead>
                <tbody class="pk-detail">
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">HP</th>
                  <td class="pk-detail">{{ detail['hp'] }}</td>
                  <td class="pk-detail image-area" rowspan="4"><img class="pk-detail" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + imageName + '.png'" v-bind:alt="detail['pokemon']"></td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <th class="pk-detail">こうげき</th>
                  <td class="pk-detail">{{ detail['attack'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">ぼうぎょ</th>
                  <td class="pk-detail">{{ detail['defense'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <th class="pk-detail">とくこう</th>
                  <td class="pk-detail">{{ detail['sp_attack'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">とくぼう</th>
                  <td class="pk-detail">{{ detail['sp_defense'] }}</td>
                  <td class="pk-detail">{{ detail['free'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <th class="pk-detail">すばやさ</th>
                  <td class="pk-detail">{{ detail['speed'] }}</td>
                  <td class="pk-detail">{{ detail['moves1'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">せいかく</th>
                  <td class="pk-detail">{{ detail['nature'] }}</td>
                  <td class="pk-detail">{{ detail['moves2'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <th class="pk-detail">とくせい</th>
                  <td class="pk-detail">{{ detail['ability'] }}</td>
                  <td class="pk-detail">{{ detail['moves3'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">もちもの</th>
                  <td class="pk-detail">{{ detail['item'] }}</td>
                  <td class="pk-detail">{{ detail['moves4'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <v-col class="output-button-area pa-0">
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" @click="buttonScreenShot">画像で保存</v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="iframeButton">
                  iframeをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>コピーしました
                  </template>
                </v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="htmlButton" @click="buttonHtmlCopy">
                  HTMLをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>コピーしました
                  </template>
                </v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="cssButton" @click="buttonCssCopy">
                  CSSリンクをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>コピーしました
                  </template>
                </v-btn>
              </div>
            </v-col>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
