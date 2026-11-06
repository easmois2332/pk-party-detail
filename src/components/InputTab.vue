<script setup>
import {ref} from "vue";
import DetailInput from "@/components/DetailInput.vue";

const detail = defineModel({required: true});
const tab = ref(1);
</script>

<template>
  <div class="input-area">
    <v-tabs v-model="tab">
      <v-tab value="1">1匹目</v-tab>
      <v-tab value="2">2匹目</v-tab>
      <v-tab value="3">3匹目</v-tab>
      <v-tab value="4">4匹目</v-tab>
      <v-tab value="5">5匹目</v-tab>
      <v-tab value="6">6匹目</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="1">
        <DetailInput v-model="detail['1']"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="2">
        <DetailInput v-model="detail['2']"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="3">
        <DetailInput v-model="detail['3']"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="4">
        <DetailInput v-model="detail['4']"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="5">
        <DetailInput v-model="detail['5']"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="6">
        <DetailInput v-model="detail['6']"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
