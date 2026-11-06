<script setup>
import {ref} from "vue";
import pokemon from "@/classes/pokemon.js"
import nature from "@/assets/json/nature.json"

const detail = defineModel({required: true});
const pkClass = new pokemon();
const pkName = pkClass.getPkNameList();

let genderList = ref([]);

const changePkName = (name) => {
  genderList.value = pkClass.getPkGenderList(name);
  detail.value['pokemon'] = pkClass.getPokemon(name);
  detail.value['gender'] = null;
}
</script>

<template>
  <v-card class="detail-input-area">
    <v-card-text>
      <v-card class="mb-4">
        <v-card-text>
          <v-row class="input-area">
            <v-col class="pb-0" cols="12" sm="6">
              <v-autocomplete
                  label="ポケモン名"
                  autocomplete="off"
                  :items="pkName"
                  v-model="detail['pk_name']"
                  @update:modelValue="changePkName(detail['pk_name'])"
              ></v-autocomplete>
            </v-col>
            <v-col class="pb-0" cols="12" sm="6">
              <v-select
                  label="性別"
                  autocomplete="off"
                  :items="genderList"
                  v-model="detail['gender']"
                  v-bind:disabled="genderList.length === 0"
              ></v-select>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-number-input
                  :reverse="false"
                  controlVariant="stacked"
                  label="レベル"
                  autocomplete="off"
                  :hideInput="false"
                  :inset="false"
                  :min="1"
                  :max="100"
                  v-model="detail['level']"
              ></v-number-input>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-autocomplete
                  label="性格"
                  autocomplete="off"
                  :items="nature"
                  v-model="detail['nature']"
              ></v-autocomplete>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="特性"
                  autocomplete="off"
                  v-model="detail['ability']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="持ち物"
                  autocomplete="off"
                  v-model="detail['item']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="HP"
                  autocomplete="off"
                  v-model="detail['hp']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="攻撃"
                  autocomplete="off"
                  v-model="detail['attack']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="防御"
                  autocomplete="off"
                  v-model="detail['defense']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="特攻"
                  autocomplete="off"
                  v-model="detail['sp_attack']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="特防"
                  autocomplete="off"
                  v-model="detail['sp_defense']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="素早さ"
                  autocomplete="off"
                  v-model="detail['speed']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="技1"
                  autocomplete="off"
                  v-model="detail['moves1']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="技2"
                  autocomplete="off"
                  v-model="detail['moves2']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="技3"
                  autocomplete="off"
                  v-model="detail['moves3']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="6">
              <v-text-field
                  clearable
                  label="技4"
                  autocomplete="off"
                  v-model="detail['moves4']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12">
              <v-text-field
                  clearable
                  label="自由入力欄"
                  autocomplete="off"
                  v-model="detail['free']"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12">
              <v-switch
                  label="フォルム・すがたを表記する"
                  v-model="detail['forms']"
                  color="primary"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
