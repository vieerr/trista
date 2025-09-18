<template>
  <div class="flex h-screen">
    <!--  sidebar placeholder for DX purposes -->
    <aside class="w-64 bg-gray-800 text-white">
      <nav class="flex flex-col p-4 space-y-4">
        <RouterLink to="/">Go to Home</RouterLink>
        <RouterLink to="/add">Go to Form</RouterLink>
        <RouterLink to="/view/1">Go to Invoice 1</RouterLink>
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
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
