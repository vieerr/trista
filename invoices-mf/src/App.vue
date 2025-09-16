<template>
  <div class="flex h-screen">
    <!--  sidebar placeholder for DX purposes -->
    <aside class="w-64 bg-gray-800 text-white">
      <nav>
        <RouterLink to="/">Go to Home</RouterLink>
        <RouterLink to="/form">Go to Form</RouterLink>
      </nav>
    </aside>
    <main class="container py-10 w-5xl min-w-5xl mx-auto">
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </main>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import Toast from 'primevue/toast'
import { exposeMessages } from './i18n'

console.log(exposeMessages('es'))
</script>
