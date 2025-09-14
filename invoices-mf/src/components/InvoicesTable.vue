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
          :field="t(col.field)"
          :header="t(col.header)"
          sortable
        >
          <template #body="slotProps">
            <span v-if="col.translate">
              {{ t(`invoices.${slotProps.data[col.field]}`) }}
            </span>
            <span v-else>
              {{ slotProps.data[col.field] }}
            </span>
          </template>
        </Column>
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
  { field: 'number', header: 'Invoice Number', translate: false },
  { field: 'client', header: 'Client', translate: false },
  { field: 'type', header: 'Type', translate: true },
  { field: 'date', header: 'Date', translate: false },
  { field: 'dueDate', header: 'Due Date', translate: false },
  { field: 'amount', header: 'Amount', translate: false },
  { field: 'status', header: 'Status', translate: true }, // Mark this for translation
])
</script>
