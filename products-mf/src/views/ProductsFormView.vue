<script setup lang="ts">
import ProductsForm from '@/components/ProductsForm/ProductsForm.vue'
import { useI18n } from 'vue-i18n'
import { Card } from 'primevue'
const { t } = useI18n()
</script>

<template>
  <Card class="mb-5" shadow="shadow-2">
    <template #title>
      {{ t('products_form.title') }}
      <i class="pi pi-box ml-2 rotate-12 text-4xl" style="font-size: 1.5rem"></i>
    </template>
    <template #content>
      <p class="m-0">
        {{ t('products_form.description') }}
      </p>
    </template>
  </Card>

  <ProductsForm />
</template>
