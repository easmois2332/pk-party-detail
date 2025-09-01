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
  pk_name: null,
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
  forms: false,
});

let iframeButton = ref({});
let htmlButton = ref({});
let cssButton = ref({});

const getImage = (name, gender) => {
  imageName.value = pkClass.getPkImage(name, gender);
}

const changePkName = (name) => {
  genderList.value = pkClass.getPkGenderList(name);
  detail.value['pokemon'] = pkClass.getPokemon(name);
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

// iframeをクリップボードにコピー
const buttonIframeCopy = (query, type) => {
  let el = document.querySelector(query);
  let param = new URLSearchParams(JSON.stringify(detail.value));
  let url = document.location.href + 'iframe/detail' + type + '?color=' + props.settingColor + '&detail=' + param.toString().replace('=', '')
  navigator.clipboard.writeText('<iframe frameborder="no" scrolling="no" width="' + el.clientWidth + '" height="' + el.clientHeight + '" src="' + url + '"></iframe>');
  iframeButton.value[type] = true;
  setTimeout(() => (iframeButton.value[type] = false), 3000)
}

// HTMLをクリップボードにコピー
const buttonHtmlCopy = (query, type) => {
  let el = document.querySelector(query);
  navigator.clipboard.writeText(el.outerHTML);
  htmlButton.value[type] = true;
  setTimeout(() => (htmlButton.value[type] = false), 3000)
}

// CSSリンクをクリップボードにコピー
const buttonCssCopy = (type) => {
  navigator.clipboard.writeText('<link href="https://easmois2332.github.io/pk-assets/css/detail_output.css" rel="stylesheet">');
  cssButton.value[type] = true;
  setTimeout(() => (cssButton.value[type] = false), 3000)
}

watch(() => props.detailData, () => {
  if (props.detailData !== null) {
    detail.value['pk_name'] = props.detailData['pk_name'];
    detail.value['gender'] = props.detailData['gender'];
    detail.value['ability'] = props.detailData['ability'];
    detail.value['item'] = props.detailData['item'];
    detail.value['moves1'] = props.detailData['moves1'];
    detail.value['moves2'] = props.detailData['moves2'];
    detail.value['moves3'] = props.detailData['moves3'];
    detail.value['moves4'] = props.detailData['moves4'];
    detail.value['free'] = props.detailData['free'];
    genderList.value = pkClass.getPkGenderList(detail.value['pk_name']);
    getImage(detail.value['pk_name'], detail.value['gender']);
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
                    autocomplete="off"
                    :items="pkName"
                    v-model="detail['pk_name']"
                    @update:modelValue="changePkName(detail['pk_name'])"
                ></v-autocomplete>
              </v-col>
              <v-col class="pb-0">
                <v-select
                    label="性別"
                    autocomplete="off"
                    :items="genderList"
                    v-model="detail['gender']"
                    v-bind:disabled="genderList.length === 0"
                    @update:modelValue="getImage(detail['pk_name'], detail['gender'])"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-number-input
                    :reverse="false"
                    controlVariant="stacked"
                    label="レベル"
                    autocomplete="off"
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
                    autocomplete="off"
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
                    autocomplete="off"
                    v-model="detail['ability']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="持ち物"
                    autocomplete="off"
                    v-model="detail['item']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="HP"
                    autocomplete="off"
                    v-model="detail['hp']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="攻撃"
                    autocomplete="off"
                    v-model="detail['attack']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="防御"
                    autocomplete="off"
                    v-model="detail['defense']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特攻"
                    autocomplete="off"
                    v-model="detail['sp_attack']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特防"
                    autocomplete="off"
                    v-model="detail['sp_defense']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="素早さ"
                    autocomplete="off"
                    v-model="detail['speed']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技1"
                    autocomplete="off"
                    v-model="detail['moves1']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技2"
                    autocomplete="off"
                    v-model="detail['moves2']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技3"
                    autocomplete="off"
                    v-model="detail['moves3']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技4"
                    autocomplete="off"
                    v-model="detail['moves4']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="自由入力欄"
                    autocomplete="off"
                    v-model="detail['free']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-switch
                    label="フォルム・すがたを表記する"
                    color="primary"
                    v-model="detail['forms']"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div class="output">
        <v-card class="mb-4">
          <v-card-title>出力1</v-card-title>
          <v-card-text class="output-area">
            <div class="output-image type-1">
              <table class="pk-detail">
                <thead class="pk-detail">
                <tr class="pk-detail" v-bind:class="props.settingColor + '-3'">
                  <th class="pk-detail" colspan="2" v-if="detail['forms']">{{ detail['pk_name'] }} {{ detail['gender'] }}</th>
                  <th class="pk-detail" colspan="2" v-else>{{ detail['pokemon'] }} {{ detail['gender'] }}</th>
                  <td class="pk-detail">Lv.{{ detail['level'] }}</td>
                </tr>
                </thead>
                <tbody class="pk-detail">
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">HP</th>
                  <td class="pk-detail">{{ detail['hp'] }}</td>
                  <td class="pk-detail image-area" rowspan="4"><img class="pk-detail" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + imageName + '.png'" v-bind:alt="detail['pk_name']"></td>
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
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="iframeButton[1]" @click="buttonIframeCopy('.output-image.type-1 > table.pk-detail', 1)">
                  iframeをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    コピーしました
                  </template>
                </v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="htmlButton[1]" @click="buttonHtmlCopy('.output-image.type-1 > table.pk-detail', 1)">
                  HTMLをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    コピーしました
                  </template>
                </v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="cssButton[1]" @click="buttonCssCopy(1)">
                  CSSリンクをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    コピーしました
                  </template>
                </v-btn>
              </div>
            </v-col>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>出力2</v-card-title>
          <v-card-text class="output-area">
            <div class="output-image type-2">
              <table class="pk-detail">
                <thead class="pk-detail">
                <tr class="pk-detail" v-bind:class="props.settingColor + '-3'">
                  <th class="pk-detail" colspan="2" v-if="detail['forms']">{{ detail['pk_name'] }} {{ detail['gender'] }}</th>
                  <th class="pk-detail" colspan="2" v-else>{{ detail['pokemon'] }} {{ detail['gender'] }}</th>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-3'">
                  <th class="pk-detail">Lv.{{ detail['level'] }}</th>
                  <th class="pk-detail">{{ detail['free'] }}</th>
                </tr>
                </thead>
                <tbody class="pk-detail">
                <tr class="pk-detail">
                  <td class="pk-detail image-area" colspan="2"><img class="pk-detail" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + imageName + '.png'" v-bind:alt="detail['pk_name']"></td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">HP</th>
                  <td class="pk-detail">{{ detail['hp'] }}</td>
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
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <th class="pk-detail">すばやさ</th>
                  <td class="pk-detail">{{ detail['speed'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">せいかく</th>
                  <td class="pk-detail">{{ detail['nature'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <th class="pk-detail">とくせい</th>
                  <td class="pk-detail">{{ detail['ability'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <th class="pk-detail">もちもの</th>
                  <td class="pk-detail">{{ detail['item'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <td class="pk-detail" colspan="2">{{ detail['moves1'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <td class="pk-detail" colspan="2">{{ detail['moves2'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-2'">
                  <td class="pk-detail" colspan="2">{{ detail['moves3'] }}</td>
                </tr>
                <tr class="pk-detail" v-bind:class="props.settingColor + '-1'">
                  <td class="pk-detail" colspan="2">{{ detail['moves4'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <v-col class="output-button-area pa-0">
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" @click="buttonScreenShot">画像で保存</v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="iframeButton[2]" @click="buttonIframeCopy('.output-image.type-2 > table.pk-detail', 2)">
                  iframeをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    コピーしました
                  </template>
                </v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="htmlButton[2]" @click="buttonHtmlCopy('.output-image.type-2 > table.pk-detail', 2)">
                  HTMLをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    コピーしました
                  </template>
                </v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="cssButton[2]" @click="buttonCssCopy(2)">
                  CSSリンクをクリップボードにコピー
                  <template v-slot:loader>
                    <v-icon icon="mdi-checkbox-marked-circle"></v-icon>
                    コピーしました
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
