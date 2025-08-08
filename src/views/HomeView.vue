<script setup>
import PartyOutput from "@/components/PartyOutput.vue";
import DetailOutput from "@/components/DetailOutput.vue";
import {ref} from "vue";

const props = defineProps(['settingColor']);

let detailData = ref(null);

const updateDetailData = (data) => {
  detailData.value = data;
}

</script>

<template>
  <div class="content-area">
    <PartyOutput
      :setting-color="props.settingColor"
      @detail-data="updateDetailData"
    />
  </div>
  <div class="content-area">
    <DetailOutput
      :setting-color="props.settingColor"
      :detail-data="detailData"
    />
  </div>
</template>
