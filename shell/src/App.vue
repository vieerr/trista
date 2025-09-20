<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="container py-10 w-5xl min-w-5xl mx-auto">
      <div>
        <RouterView />
      </div>
    </main>
  </div>
  <TreeShakeSurvivors />
  <VueQueryDevtools initialIsOpen position="bottom" />
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { RouterView } from "vue-router";
import "./style.css";
import TreeShakeSurvivors from "./components/TreeShakeSurvivors.vue";
</script>
