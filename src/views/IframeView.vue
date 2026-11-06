<script setup>
import {useRoute} from "vue-router";
import pokemon from "@/classes/pokemon.js"
import OutputDetailType1 from "@/components/OutputDetailType1.vue";
import OutputDetailType2 from "@/components/OutputDetailType2.vue";
import OutputPartyType1 from "@/components/OutputPartyType1.vue";
import OutputPartyType2 from "@/components/OutputPartyType2.vue";
import OutputPartyType3 from "@/components/OutputPartyType3.vue";

const route = useRoute();
const pkClass = new pokemon();

let param = route.params;
let query = route.query;

let color = query['color'] ? query['color'] : 'blue';
let detail = query['detail'] ? JSON.parse(query['detail']) : null;
let party = query['party'] ? JSON.parse(query['party']) : null;
let pkCount = query['pkCount'] ? Number(query['pkCount']) : 0;

const getImage = (name, gender) => {
  return pkClass.getPkImage(name, gender);
}
</script>

<template>
  <OutputDetailType1 v-model="detail" v-model:color="color" v-if="param['format'] === 'detail1'"/>
  <OutputDetailType2 v-model="detail" v-model:color="color" v-if="param['format'] === 'detail2'"/>
  <OutputPartyType1 v-model="party" v-model:color="color" v-if="param['format'] === 'party1'"/>
  <OutputPartyType2 v-model="party" v-model:color="color" v-if="param['format'] === 'party2'"/>
  <OutputPartyType3 v-model="party" v-model:color="color" v-if="param['format'] === 'party3'"/>
  <table class="pk-party" v-if="param['format'] === 'party'">
    <tbody class="pk-party" v-bind:class="color + '-' + (i % 2 + 1)" v-for="i in pkCount" :key="i">
    <tr class="pk-party">
      <td class="pk-party image-area" rowspan="2">
        <img class="pk-party icon" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Icon/pokeball_icon_000.png'">
        <img class="pk-party pokemon" v-bind:src="'https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/' + getImage(party[i]['pk_name'], party[i]['gender']) + '.png'" v-bind:alt="party[i]['pk_name']">
      </td>
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
</template>
