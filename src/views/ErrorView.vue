<script setup>
const props = defineProps(['settingColor']);
</script>

<template>
  <div class="content-area">
    <h1>ページが見つかりません。</h1>
    <v-row class="pt-16">
      <v-col>
        <router-link to="/">トップに戻る</router-link>
      </v-col>
    </v-row>
  </div>
</template>
