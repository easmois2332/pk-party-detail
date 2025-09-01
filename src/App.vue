<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Setting from "@/classes/setting";
import {ref} from "vue";

let setting = new Setting();
let settingColor = ref(setting.getColor());

const setColor = (color) => {
  setting.setColor(color);
  settingColor.value = color;
}
</script>

<template>
  <AppHeader
    v-if="$route.name !== 'iframe'"
    :setting-color="settingColor"
    @set-color="setColor"
  />
  <router-view
    :setting-color="settingColor"
  />
</template>
