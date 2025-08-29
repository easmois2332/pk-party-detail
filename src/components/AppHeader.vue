<script setup>
import {ref} from "vue";
import {appVersion} from "@/consts/appConst";

const props = defineProps(['settingColor']);
const emit = defineEmits(['set-color']);

let settingDialog = ref(false);
let settingColor = ref(props.settingColor);

const setColor = (color) => {
  settingColor.value = color;
  emit('set-color', color);
}
</script>

<template>
  <div class="app-header" v-bind:class="'bg-' + settingColor + '-lighten-3'">
    <div class="app-name-area">
      <router-link to="/" class="app-header-link">
        <span class="app-name font-bold">構築詳細アウトプット</span><span class="app-version">{{ appVersion }}</span>
      </router-link>
    </div>
    <div class="app-button-area">
      <div class="app-button">
        <v-btn
            class="ma-1"
            icon="mdi-cog"
            @click="settingDialog = true"
        ></v-btn>
      </div>
      <div class="app-button">
        <v-btn
            class="ma-1"
            icon="mdi-help"
            to="/help"
        ></v-btn>
      </div>
    </div>
  </div>
  <v-dialog v-model="settingDialog" width="auto">
    <v-card prepend-icon="mdi-cog" title="設定">
      <v-card-text>
        <v-card>
          <v-card-title>テーマカラー</v-card-title>
          <v-card-text>
            <v-row>
              <div class="color-button pa-2">
                <v-btn class="text-white" color="red" @click="setColor('red')">赤</v-btn>
              </div>
              <div class="color-button pa-2">
                <v-btn class="text-white" color="green" @click="setColor('green')">緑</v-btn>
              </div>
              <div class="color-button pa-2">
                <v-btn class="text-white" color="blue" @click="setColor('blue')">青</v-btn>
              </div>
              <div class="color-button pa-2">
                <v-btn class="text-white" color="amber" @click="setColor('amber')">黄</v-btn>
              </div>
              <div class="color-button pa-2">
                <v-btn class="text-white" color="brown" @click="setColor('brown')">茶</v-btn>
              </div>
              <div class="color-button pa-2">
                <v-btn class="text-white" color="blue-grey" @click="setColor('blue-grey')">灰</v-btn>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
