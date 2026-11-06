<script setup>
import pokemon from "@/classes/pokemon.ts";

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
  <table class="pk-party">
    <tbody class="pk-party" v-bind:class="color + '-' + (i % 2 + 1)" v-for="i in Math.min(count, pkCount)" :key="i">
    <tr class="pk-party">
      <td class="pk-party image-area" rowspan="2">
        <div class="pk-party image">
          <img class="pk-party pokemon-image" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + getImage(detail[i]['pk_name'], detail[i]['gender']) + '.png'" v-bind:alt="detail[i]['pk_name']">
        </div>
      </td>
      <td class="pk-party">{{ detail[i]['moves1'] }}</td>
      <td class="pk-party">{{ detail[i]['moves2'] }}</td>
    </tr>
    <tr class="pk-party">
      <td class="pk-party">{{ detail[i]['moves3'] }}</td>
      <td class="pk-party">{{ detail[i]['moves4'] }}</td>
    </tr>
    <tr class="pk-party">
      <td class="pk-party free">{{ detail[i]['free'] }}</td>
      <td class="pk-party">{{ detail[i]['ability'] }}</td>
      <td class="pk-party">{{ detail[i]['item'] }}</td>
    </tr>
    </tbody>
  </table>
</template>
