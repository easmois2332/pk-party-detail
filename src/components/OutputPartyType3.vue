<script setup>
import pokemon from "@/classes/pokemon.ts";
import OutputDetailType2 from "@/components/OutputDetailType2.vue";

const detail = defineModel({required: true});
const count = defineModel('count', {default: 6})
const color = defineModel('color', {default: 'blue'})
const pkClass = new pokemon();

let pkCount = Object.keys(detail.value).length;

const getImage = (name, gender) => {
  return pkClass.getPkImage(name, gender);
}
</script>

<template>
  <div class="pk-party type-3">
    <OutputDetailType2 v-model="detail[i]" v-model:color="color" v-for="i in Math.min(count, pkCount)" :key="i"/>
  </div>
</template>
