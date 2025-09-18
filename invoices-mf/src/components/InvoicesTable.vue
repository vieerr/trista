<template>
  <div v-if="isPending || isFetching">Loading...</div>
  <div class="border rounded-xl text-sm font-light overflow-hidden border-gray-200">
    <DataTable
      v-model:selection="selectedProducts"
      removableSort
      size="large"
      paginator
      :rows="10"
      :value="invoices"
      tableStyle="min-width: 50rem"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      >
        <template #body="slotProps">
          <span v-if="col.type === 'currency'"> ${{ slotProps.data[col.field] }} </span>
          <span v-else-if="col.type === 'percentage'"> {{ slotProps.data[col.field] }}% </span>
          <span v-else-if="col.translate">
            {{ t(`invoices.${slotProps.data[col.field]}`) }}
          </span>
          <span v-else>
            {{ slotProps.data[col.field] }}
          </span>
        </template>
      </Column>
    </DataTable>
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
  { field: 'number', header: t('invoices.Invoice Number'), translate: false },
  { field: 'client_name', header: t('invoices.Client'), translate: false },
  { field: 'type', header: t('invoices.Type'), translate: true },
  { field: 'operation_date', header: t('invoices.operation_date'), translate: false },
  { field: 'due_date', header: t('invoices.Due Date'), translate: false },
  { field: 'total', header: t('invoices.Total'), translate: false, type: 'currency' },
  { field: 'status', header: t('invoices.Status'), translate: true }, // Mark this for translation
])
</script>
