<script setup lang="ts">
import InvoicesTable from '@/components/InvoicesTable.vue'
import { onMounted } from 'vue'
import invoices from '../db/invoices.json'

onMounted(() => {
  if (!localStorage.getItem('invoices')) localStorage.setItem('invoices', JSON.stringify(invoices))
})
</script>

<template>
  <InvoicesTable />
</template>
