<template>
  <div>
    <div v-if="isPending || isFetching">Loading...</div>
    <div class="card">
      <DataTable
        v-model:selection="selectedProducts"
        removableSort
        size="large"
        paginator
        :rows="10"
        :value="invoices"
        tableStyle="min-width: 50rem"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="t(col.header)"
          sortable
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'
import { fetchInvoices } from '@/services/invoices'
import type { Invoice } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedProducts = ref<Invoice[]>([])
const {
  isPending,
  isFetching,
  data: invoices,
} = useQuery<Invoice[]>({
  queryKey: ['invoices'],
  queryFn: fetchInvoices,
})

const columns = ref([
  { field: 'number', header: 'Invoice Number' },
  { field: 'client', header: 'Client' },
  { field: 'type', header: 'Type' },
  { field: 'date', header: 'Date' },
  { field: 'dueDate', header: 'Due Date' },
  { field: 'amount', header: 'Amount' },
  { field: 'status', header: 'Status' },
])
</script>
