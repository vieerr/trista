<template>
  <div class="flex min-h-screen ">
    <Sidebar />
    <main class="flex-5 container mx-auto py-6 lg:px-20 sm:px-0 max-w-7xl">
      <RouterView />
    </main>
    <TreeShakeSurvivors />
    <VueQueryDevtools initialIsOpen position="bottom" />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { RouterView } from "vue-router";
import "./style.css";
import TreeShakeSurvivors from "./components/TreeShakeSurvivors.vue";
</script>
