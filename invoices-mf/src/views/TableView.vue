<script setup lang="ts">
import InvoicesTable from '@/components/InvoicesTable.vue'
import { useI18n } from 'vue-i18n'
import { Card } from 'primevue'
import Button from 'primevue/button'
const { t } = useI18n()
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCreation = () => {
  router.push(router.getRoutes().find((route) => route.name === 'AddInvoice')!.path)
}
</script>

<template>
  <Card class="mb-5" shadow="shadow-2">
    <template #title>
      <h2 class="mb-4 text-xl">
        {{ t('invoices_table.title') }}
        <i class="pi pi-receipt ml-2 text-4xl" style="font-size: 1.5rem"></i>
      </h2>
    </template>
    <template #content>
      <p class="mb-2 text-gray-600">
        {{ t('invoices_table.description') }}
      </p>
      <Button label="Añadir Factura" icon="pi pi-plus" class="mt-2" @click="goToCreation" />
    </template>
  </Card>
  <InvoicesTable />
</template>
