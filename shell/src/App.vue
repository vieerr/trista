<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 p-6 overflow-auto bg-gray-50">
      <RouterView />
    </main>
  </div>
  <TreeShakeSurvivors />
</template>


<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { RouterView } from "vue-router";
import "./style.css";
import TreeShakeSurvivors from "./components/TreeShakeSurvivors.vue";
// import { setupI18n } from "./i18n.service";
</script>
