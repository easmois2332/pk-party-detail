<script setup>
import {ref} from "vue";
import html2canvas from "html2canvas";

const props = defineProps(['settingColor']);
const emit = defineEmits(['detail-data']);

const pkName = [
  'フシギダネ',
  'フシギソウ',
  'フシギバナ',
  'メガフシギバナ',
  'ヒトカゲ',
  'リザード',
  'リザードン',
  'メガリザードンX',
  'メガリザードンY',
  'ゼニガメ',
  'カメール',
  'カメックス',
  'メガカメックス',
];

let pkCount = ref(1);
let party = ref({
  1: {pokemon: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  2: {pokemon: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  3: {pokemon: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  4: {pokemon: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  5: {pokemon: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
  6: {pokemon: null, gender: null, free: null, moves1: null, moves2: null, moves3: null, moves4: null, ability: null, item: null},
});

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
                    :items="pkName"
                    v-model="party[i]['pokemon']"
                ></v-autocomplete>
              </v-col>
              <v-col class="pb-0">
                <v-select
                    label="性別"
                    :items="['♂', '♀']"
                    v-model="party[i]['gender']"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="自由入力欄"
                    v-model="party[i]['free']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技1"
                    v-model="party[i]['moves1']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技2"
                    v-model="party[i]['moves2']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技3"
                    v-model="party[i]['moves3']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="技4"
                    v-model="party[i]['moves4']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="input-area">
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="特性"
                    v-model="party[i]['ability']"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-text-field
                    clearable
                    label="持ち物"
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
                  <td class="pk-party image-area" rowspan="2"><img class="pk-party" src="https://easmois2332.github.io/pk-image/Pokemon/Normal/0000_000_uk_n_000.png" v-bind:alt="party[i]['pokemon']"></td>
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
                <v-btn class="text-white" v-bind:color="props.settingColor">iframeをクリップボードにコピー</v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor">HTMLをクリップボードにコピー</v-btn>
              </div>
              <div class="output-button pt-2 pb-2">
                <v-btn class="text-white" v-bind:color="props.settingColor">CSSをクリップボードにコピー</v-btn>
              </div>
            </v-col>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
