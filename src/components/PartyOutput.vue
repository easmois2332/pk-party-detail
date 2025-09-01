<script setup>
import {ref} from "vue";
import html2canvas from "html2canvas";
import pokemon from "@/classes/pokemon.js"

const props = defineProps(['settingColor']);
const emit = defineEmits(['detail-data']);
const pkClass = new pokemon();

const pkName = pkClass.getPkNameList();

let genderList = ref({
  1: [], 2: [], 3: [], 4: [], 5: [], 6: []
});
let imageName = ref({
  1: '0000_000_uk_n_000', 2: '0000_000_uk_n_000', 3: '0000_000_uk_n_000', 4: '0000_000_uk_n_000', 5: '0000_000_uk_n_000', 6: '0000_000_uk_n_000',
});

let pkCount = ref(1);
let party = ref({
  1: {pk_name: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  2: {pk_name: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  3: {pk_name: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  4: {pk_name: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  5: {pk_name: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  6: {pk_name: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
});

let htmlButton = ref(false);
let cssButton = ref(false);
let iframeButton = ref(false);

const getImage = (i, name, gender) => {
  imageName.value[i] = pkClass.getPkImage(name, gender);
}

const changePkName = (i, name) => {
  genderList.value[i] = pkClass.getPkGenderList(name);
  party.value[i]['gender'] = null;
  getImage(i, name, party.value[i]['gender']);
}

const buttonInsertDetailData = (i) => {
  emit('detail-data', JSON.parse(JSON.stringify(party.value[i])));
}

// スクリーンショットを撮る
const buttonScreenShot = async () => {
  const el = document.querySelector('.output-image > table.pk-party');
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

// iframeをクリップボードにコピー
const buttonIframeCopy = () => {
  let el = document.querySelector('.output-image > table.pk-party');
  let param = new URLSearchParams(JSON.stringify(party.value));
  let url = document.location.href + 'iframe/party?color=' + props.settingColor + '&pkCount=' + pkCount.value + '&party=' + param.toString().replace('=', '');
  navigator.clipboard.writeText('<iframe frameborder="no" scrolling="no" width="' + el.clientWidth + '" height="' + el.clientHeight + '" src="' + url + '"></iframe>');
  iframeButton.value = true;
  setTimeout(() => (iframeButton.value = false), 3000)
}

// HTMLをクリップボードにコピー
const buttonHtmlCopy = () => {
  let el = document.querySelector('.output-image > table.pk-party');
  navigator.clipboard.writeText(el.outerHTML);
  htmlButton.value = true;
  setTimeout(() => (htmlButton.value = false), 3000)
}

// CSSリンクをクリップボードにコピー
const buttonCssCopy = () => {
  navigator.clipboard.writeText('<link href="https://easmois2332.github.io/pk-assets/css/party_output.css" rel="stylesheet">');
  cssButton.value = true;
  setTimeout(() => (cssButton.value = false), 3000)
}
</script>

<template>
  <v-card class="party-output-area" title="構築詳細">
    <v-card-text>
      <div class="pk-count">
        <div class="input-area">
          <v-number-input
              :reverse="false"
              controlVariant="stacked"
              label="ポケモンの数"
              autocomplete="off"
              :hideInput="false"
              :inset="false"
              :min="1"
              :max="6"
              v-model="pkCount"
          ></v-number-input>
        </div>
      </div>
      <div class="party">
        <v-card class="mb-4" v-for="i in pkCount" :key="i">
          <v-card-title>入力（{{ i }}匹目）</v-card-title>
          <v-card-text>
            <v-row class="input-area">
              <v-col class="pb-0">
                <v-autocomplete
                    label="ポケモン名"
                    autocomplete="off"
                    :items="pkName"
                    v-model="party[i]['pk_name']"
                    @update:modelValue="changePkName(i, party[i]['pk_name'])"
                ></v-autocomplete>
              </v-col>
              <v-col class="pb-0">
                <v-select
                    label="性別"
                    autocomplete="off"
                    :items="['♂', '♀']"
                    v-model="party[i]['gender']"
                    v-bind:disabled="genderList[i].length === 0"
                    @update:modelValue="getImage(i, party[i]['pk_name'], party[i]['gender'])"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="自由入力欄"
                    autocomplete="off"
                    v-model="party[i]['free']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技1"
                    autocomplete="off"
                    v-model="party[i]['moves1']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技2"
                    autocomplete="off"
                    v-model="party[i]['moves2']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技3"
                    autocomplete="off"
                    v-model="party[i]['moves3']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技4"
                    autocomplete="off"
                    v-model="party[i]['moves4']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特性"
                    autocomplete="off"
                    v-model="party[i]['ability']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="持ち物"
                    autocomplete="off"
                    v-model="party[i]['item']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="tonal" @click="buttonInsertDetailData(i)">個別詳細に入力</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="output">
        <v-card>
          <v-card-title>出力</v-card-title>
          <v-card-text class="output-area">
            <div class="output-image">
              <table class="pk-party">
                <tbody class="pk-party" v-bind:class="props.settingColor + '-' + (i % 2 + 1)" v-for="i in pkCount" :key="i">
                <tr class="pk-party">
                  <td class="pk-party image-area" rowspan="2"><img class="pk-party" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + imageName[i] + '.png'" v-bind:alt="party[i]['pk_name']"></td>
                  <td class="pk-party">{{ party[i]['moves1'] }}</td>
                  <td class="pk-party">{{ party[i]['moves2'] }}</td>
                </tr>
                <tr class="pk-party">
                  <td class="pk-party">{{ party[i]['moves3'] }}</td>
                  <td class="pk-party">{{ party[i]['moves4'] }}</td>
                </tr>
                <tr class="pk-party">
                  <td class="pk-party free">{{ party[i]['free'] }}</td>
                  <td class="pk-party">{{ party[i]['ability'] }}</td>
                  <td class="pk-party">{{ party[i]['item'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <v-col class="output-button-area pa-0">
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" @click="buttonScreenShot">画像で保存</v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor" :loading="iframeButton" @click="buttonIframeCopy">
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
