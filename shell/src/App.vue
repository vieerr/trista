<template>
  <div class="flex min-h-screen bg-slate-100">
    <Sidebar />
    <main class="flex-1 container mx-auto py-6 px-4 sm:px-3 lg:px-8 max-w-7xl">
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
