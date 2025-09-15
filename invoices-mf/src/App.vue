<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/form">Go to Form</RouterLink>
  </nav>
  <RouterView />
  <Toast />
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import Toast from 'primevue/toast'
import { exposeMessages } from './i18n'

console.log(exposeMessages('es'))
</script>
