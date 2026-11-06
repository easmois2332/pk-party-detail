<script setup>
import {ref} from "vue";
import InputTab from "@/components/InputTab.vue";
import OutputTab from "@/components/OutputTab.vue";

const tab = ref('input');
const inputData = ref({
  1: {
    pokemon: null,
    pk_name: null,
    gender: '',
    level: 50,
    nature: '',
    ability: '',
    item: '',
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
    hp: '',
    attack: '',
    defense: '',
    sp_attack: '',
    sp_defense: '',
    speed: '',
    free: '',
    forms: false
  },
  2: {
    pokemon: null,
    pk_name: null,
    gender: '',
    level: 50,
    nature: '',
    ability: '',
    item: '',
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
    hp: '',
    attack: '',
    defense: '',
    sp_attack: '',
    sp_defense: '',
    speed: '',
    free: '',
    forms: false
  },
  3: {
    pokemon: null,
    pk_name: null,
    gender: '',
    level: 50,
    nature: '',
    ability: '',
    item: '',
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
    hp: '',
    attack: '',
    defense: '',
    sp_attack: '',
    sp_defense: '',
    speed: '',
    free: '',
    forms: false
  },
  4: {
    pokemon: null,
    pk_name: null,
    gender: '',
    level: 50,
    nature: '',
    ability: '',
    item: '',
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
    hp: '',
    attack: '',
    defense: '',
    sp_attack: '',
    sp_defense: '',
    speed: '',
    free: '',
    forms: false
  },
  5: {
    pokemon: null,
    pk_name: null,
    gender: '',
    level: 50,
    nature: '',
    ability: '',
    item: '',
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
    hp: '',
    attack: '',
    defense: '',
    sp_attack: '',
    sp_defense: '',
    speed: '',
    free: '',
    forms: false
  },
  6: {
    pokemon: null,
    pk_name: null,
    gender: '',
    level: 50,
    nature: '',
    ability: '',
    item: '',
    moves1: '',
    moves2: '',
    moves3: '',
    moves4: '',
    hp: '',
    attack: '',
    defense: '',
    sp_attack: '',
    sp_defense: '',
    speed: '',
    free: '',
    forms: false
  },
});
</script>

<template>
  <v-tabs v-model="tab" grow>
    <v-tab value="input">情報入力</v-tab>
    <v-tab value="output">情報出力</v-tab>
  </v-tabs>
  <div class="content-area">
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="input">
        <InputTab v-model="inputData"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="output">
        <OutputTab v-model="inputData"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
  <div class="content-area">
    <span>使用している画像の著作権は権利者様へ帰属します。また、権利者様側からの画像等の削除の依頼、警告には速やかに対処いたします。</span>
  </div>
</template>
