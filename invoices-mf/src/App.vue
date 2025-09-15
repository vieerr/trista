<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/form">Go to Form</RouterLink>
  </nav>
  <main>
    <Toast />

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import Toast from 'primevue/toast'
</script>
