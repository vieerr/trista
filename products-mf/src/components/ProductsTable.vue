<template>
  <div class="table-container">
    <div class="border rounded-xl text-sm font-light overflow-hidden border-gray-200">
      <DataTable
        v-model:selection="selectedProducts"
        v-model:filters="filters"
        filterDisplay="row"
        removableSort
        size="small"
        paginator
        :rows="10"
        :value="products"
        tableStyle="width: 100%; table-layout: fixed;"
      >
        <template #header>
          <div class="flex justify-start p-2 py-4">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                size="small"
                type="search"
                v-model="filters['global'].value"
                placeholder="Buscar..."
                class="text-xs h-7"
              />
            </IconField>
          </div>
        </template>
        <template #empty> {{ t('products_table.noProducts') }} </template>
        <template #loading> {{ t('products_table.loading') }} </template>
        <Column
          selectionMode="multiple"
          headerStyle="width: 3rem"
          class="selection-column"
        ></Column>
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          sortable
          :showFilterMenu="false"
          :style="{ width: col.width }"
          class="truncate"
        >
          <template #body="slotProps">
            <span :title="slotProps.data[col.field]" class="truncate block py-3">
              {{
                col.translate
                  ? t(`invoices.${slotProps.data[col.field]}`)
                  : slotProps.data[col.field]
              }}
            </span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              size="small"
              type="text"
              @input="filterCallback()"
              :placeholder="`${t(col.header)}`"
              class="w-full text-xs h-7"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { ref } from 'vue'
import { fetchProducts } from '@/services/products'
import type { Product } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import { FilterMatchMode } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedProducts = ref<Product[]>([])

const { data: products } = useQuery<Product[]>({
  queryKey: ['products'],
  queryFn: fetchProducts,
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  price: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  taxName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

const columns = ref([
  { field: 'name', header: t('products.name'), translate: false, width: '24%' },
  { field: 'reference', header: t('products.reference'), translate: false, width: '22%' },
  { field: 'price', header: t('products.price'), translate: false, width: '16%' },
  { field: 'description', header: t('products.description'), translate: false, width: '22%' },
  { field: 'taxName', header: t('products.taxName'), translate: false, width: '16%' },
])
</script>

<!-- <style scoped>
.table-container {
  width: 100%;
  overflow-x: hidden;
}

:deep(.p-datatable) {
  font-size: 0.75rem; /* Smaller font for compact look */
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.p-datatable .p-column-filter) {
  margin: 0;
}

:deep(.p-datatable .p-paginator) {
  padding: 0.5rem;
  font-size: 0.75rem;
}

:deep(.p-datatable .p-checkbox) {
  transform: scale(0.8); /* Smaller checkboxes */
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selection-column {
  padding: 0.5rem !important;
}

/* Ensure accessibility for focus states */
:deep(.p-datatable .p-sortable-column:focus),
:deep(.p-datatable .p-checkbox:focus) {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :deep(.p-datatable) {
    font-size: 0.7rem;
  }

  :deep(.p-datatable .p-datatable-thead > tr > th),
  :deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 0.3rem;
  }

  .columns {
    width: 20% !important; /* Equal widths on smaller screens */
  }
}
</style> -->
