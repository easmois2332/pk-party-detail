<script setup>
import {ref} from "vue";
import DetailOutput from "@/components/DetailOutput.vue";
import PartyOutput from "@/components/PartyOutput.vue";

const detail = defineModel({required: true});
const tab = ref('party');
</script>

<template>
  <div class="output-area">
    <v-tabs v-model="tab">
      <v-tab value="party">構築出力</v-tab>
      <v-tab value="detail">個別出力</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="party">
        <PartyOutput v-model="detail"/>
      </v-tabs-window-item>
      <v-tabs-window-item value="detail">
        <DetailOutput v-model="detail"/>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
