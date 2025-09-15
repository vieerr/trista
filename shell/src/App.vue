<script setup lang="ts">
import { RouterView } from "vue-router";
import "./style.css";
import TreeShakeSurvivors from "./components/TreeShakeSurvivors.vue";
// import { setupI18n } from "./i18n.service";

</script>

<template>
  <h2 class="font-bold ">Shell Application</h2>
  <TreeShakeSurvivors />
  <RouterView />
</template>

