<script setup>
import {useRoute} from "vue-router";
import pokemon from "@/classes/pokemon.js"
import {ref} from "vue";

const route = useRoute();
const props = defineProps(['settingColor']);
const pkClass = new pokemon();

let param = route.params;
let query = route.query;

let color = query['color'] ? query['color'] : props.settingColor;
let pkCount = query['pkCount'] ? Number(query['pkCount']) : 0;
let party = query['party'] ? JSON.parse(query['party']) : null;
let detail = query['detail'] ? JSON.parse(query['detail']) : null;

const getImage = (name, gender) => {
  return pkClass.getPkImage(name, gender);
}
</script>

<template>
  <table class="pk-party" v-if="param['format'] === 'party'">
    <tbody class="pk-party" v-bind:class="color + '-' + (i % 2 + 1)" v-for="i in pkCount" :key="i">
    <tr class="pk-party">
      <td class="pk-party image-area" rowspan="2"><img class="pk-party" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + getImage(party[i]['pk_name'], party[i]['gender']) + '.png'" v-bind:alt="party[i]['pk_name']"></td>
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
  <table class="pk-detail" v-if="param['format'] === 'detail1'">
    <thead class="pk-detail">
    <tr class="pk-detail" v-bind:class="color + '-3'">
      <th class="pk-detail" colspan="2" v-if="detail['forms']">{{ detail['pk_name'] }} {{ detail['gender'] }}</th>
      <th class="pk-detail" colspan="2" v-else>{{ detail['pokemon'] }} {{ detail['gender'] }}</th>
      <td class="pk-detail">Lv.{{ detail['level'] }}</td>
    </tr>
    </thead>
    <tbody class="pk-detail">
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">HP</th>
      <td class="pk-detail">{{ detail['hp'] }}</td>
      <td class="pk-detail image-area" rowspan="4"><img class="pk-detail" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + getImage(detail['pk_name'], detail['gender']) + '.png'" v-bind:alt="detail['pk_name']"></td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">こうげき</th>
      <td class="pk-detail">{{ detail['attack'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">ぼうぎょ</th>
      <td class="pk-detail">{{ detail['defense'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">とくこう</th>
      <td class="pk-detail">{{ detail['sp_attack'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">とくぼう</th>
      <td class="pk-detail">{{ detail['sp_defense'] }}</td>
      <td class="pk-detail">{{ detail['free'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">すばやさ</th>
      <td class="pk-detail">{{ detail['speed'] }}</td>
      <td class="pk-detail">{{ detail['moves1'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">せいかく</th>
      <td class="pk-detail">{{ detail['nature'] }}</td>
      <td class="pk-detail">{{ detail['moves2'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">とくせい</th>
      <td class="pk-detail">{{ detail['ability'] }}</td>
      <td class="pk-detail">{{ detail['moves3'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">もちもの</th>
      <td class="pk-detail">{{ detail['item'] }}</td>
      <td class="pk-detail">{{ detail['moves4'] }}</td>
    </tr>
    </tbody>
  </table>
  <table class="pk-detail" v-if="param['format'] === 'detail2'">
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
      <td class="pk-detail image-area" colspan="2"><img class="pk-detail" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + getImage(detail['pk_name'], detail['gender']) + '.png'" v-bind:alt="detail['pk_name']"></td>
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
</template>
