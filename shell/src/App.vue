<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Child = defineAsyncComponent(() => import("child/Main"));
</script>

<template>
  <h2>Shell Application</h2>
  <Child />
</template>

<style scoped></style>
