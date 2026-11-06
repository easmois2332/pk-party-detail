<script setup>
import pokemon from "@/classes/pokemon.ts";

const detail = defineModel({required: true});
const color = defineModel('color', {default: 'blue'})
const pkClass = new pokemon();

const getImage = (name, gender) => {
  return pkClass.getPkImage(name, gender);
}
</script>

<template>
  <table class="pk-detail">
    <thead class="pk-detail">
    <tr class="pk-detail" v-bind:class="color + '-3'">
      <th class="pk-detail" colspan="2" v-if="detail['forms']">
        <div class="pk-detail head-area">
          <div class="pk-detail name-area">{{ detail['pk_name'] }}{{ detail['gender'] }}</div>
          <div class="pk-detail level-area">Lv.{{ detail['level'] }}</div>
        </div>
      </th>
      <th class="pk-detail" colspan="2" v-else>
        <div class="pk-detail head-area">
          <div class="pk-detail name-area">{{ detail['pokemon'] }}{{ detail['gender'] }}</div>
          <div class="pk-detail level-area">Lv.{{ detail['level'] }}</div>
        </div>
      </th>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-3'" v-if="detail['free']">
      <th class="pk-detail" colspan="2">{{ detail['free'] }}</th>
    </tr>
    </thead>
    <tbody class="pk-detail">
    <tr class="pk-detail">
      <td class="pk-detail image-area" colspan="2"><img class="pk-detail" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + getImage(detail['pk_name'], detail['gender']) + '.png'" v-bind:alt="detail['pk_name']"></td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">HP</th>
      <td class="pk-detail">{{ detail['hp'] }}</td>
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
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">すばやさ</th>
      <td class="pk-detail">{{ detail['speed'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">せいかく</th>
      <td class="pk-detail">{{ detail['nature'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">とくせい</th>
      <td class="pk-detail">{{ detail['ability'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail">もちもの</th>
      <td class="pk-detail">{{ detail['item'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail">もっているわざ</th>
      <td class="pk-detail">{{ detail['moves1'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail"></th>
      <td class="pk-detail">{{ detail['moves2'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-2'">
      <th class="pk-detail"></th>
      <td class="pk-detail">{{ detail['moves3'] }}</td>
    </tr>
    <tr class="pk-detail" v-bind:class="color + '-1'">
      <th class="pk-detail"></th>
      <td class="pk-detail">{{ detail['moves4'] }}</td>
    </tr>
    </tbody>
  </table>
</template>
