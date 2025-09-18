<template>
  <div>
    <div class="card">
      <DataTable
        v-model:selection="selectedProducts"
        class="text-xs"
        size="small"
        :value="rows"
        dataKey="row_id"
        responsiveLayout="scroll"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          field="product-service"
          headerStyle="width: 17rem"
          :header="t('invoices_form.product_service')"
          :key="`product-service-${Date.now()}`"
        >
          <template #body="slotProps">
            <FloatLabel variant="on" class="my-3">
              <Select
                size="small"
                :name="`product-select-${slotProps.data.row_id}`"
                variant="filled"
                editable
                :options="productOptions"
                optionLabel="name"
                v-model="slotProps.data.product"
                @change="onProductChange(slotProps.data, $event.value)"
                :key="`product-select-${slotProps.data.row_id}`"
                fluid
              />
            </FloatLabel>
          </template>
        </Column>
        <Column field="reference" :header="t('invoices_form.reference')">
          <template #body="slotProps">
            <InputText
              size="small"
              :id="`reference-${slotProps.data.row_id}`"
              v-model="slotProps.data.reference"
              type="text"
              fluid
            />
          </template>
        </Column>
        <Column field="price" :header="t('invoices_form.price')">
          <template #body="slotProps">
            <InputText
              size="small"
              :id="`price-${slotProps.data.row_id}`"
              v-model.number="slotProps.data.price"
              type="number"
              fluid
            />
          </template>
        </Column>
        <Column field="discount" :header="t('invoices_form.discount')">
          <template #body="slotProps">
            <InputText
              size="small"
              :id="`discount-${slotProps.data.row_id}`"
              v-model.number="slotProps.data.discount"
              type="number"
              min="0"
              max="100"
              step="0.1"
              fluid
            />
          </template>
        </Column>
        <Column field="tax" :header="t('invoices_form.tax')">
          <template #body="slotProps">
            <Select
              size="small"
              name="tax"
              variant="filled"
              :options="taxes"
              optionLabel="name"
              v-model="slotProps.data.tax"
              fluid
            />
          </template>
        </Column>
        <Column field="quantity" :header="t('invoices_form.quantity')">
          <template #body="slotProps">
            <InputText
              :id="`quantity-${slotProps.data.row_id}`"
              v-model.number="slotProps.data.quantity"
              size="small"
              type="number"
              min="0"
              step="1"
              fluid
            />
          </template>
        </Column>
        <Column field="total" :header="t('invoices_form.total')">
          <template #body="slotProps">
            <span>{{ calculateRowTotal(slotProps.data).toFixed(2) }}</span>
          </template>
        </Column>
        <Column headerStyle="width: 5rem">
          <template #body="slotProps">
            <Button @click="deleteRow(slotProps.data.row_id)"> <i class="pi pi-times"></i> </Button>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="mt-4">
      <Button @click="addRow" variant="outlined" class="mr-4">
        <i class="pi pi-plus"></i>
        {{ t('invoices_form.add_row') }}</Button
      >
    </div>
    <div>
      <InvoicePriceDetail ref="priceDetailRef" :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Select from 'primevue/select'
import { ref, reactive, type Reactive, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuery } from '@tanstack/vue-query'
import { fetchProducts } from '@/services/products'
import type { ProductRow, Product } from '@/types'
import InvoicePriceDetail from './InvoicePriceDetail.vue'

const { t } = useI18n()

const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
const productOptions = computed(() => products.value ?? [])

const selectedProducts = ref([])
const priceDetailRef = ref()

const taxes = ref([
  { id: 1, name: 'IVA 20%', rate: 20 },
  { id: 2, name: 'IVA 10%', rate: 10 },
  { id: 3, name: 'No Tax', rate: 0 },
])

const createRow = (): ProductRow => ({
  row_id: Date.now().toString(),
  product: null,
  quantity: 1,
  price: 0,
  discount: 0,
  tax: taxes.value[2],
  reference: '',
})

const rows: Reactive<ProductRow[]> = reactive([createRow()])
watch(
  rows,
  (newRows) => {
    console.log('Rows changed:', newRows)
  },
  { deep: true },
)
const addRow = () => {
  rows.push(createRow())
}
const onProductChange = (row: ProductRow, selectedProduct: Product) => {
  if (selectedProduct) {
    const productCopy = { ...selectedProduct }
    row.product = productCopy
    row.price = selectedProduct.price || 0
    if (selectedProduct.taxRate !== undefined) {
      const matchingTax = taxes.value.find((tax) => tax.rate === selectedProduct.taxRate)
      if (matchingTax) {
        row.tax = matchingTax
      }
    }

    if (selectedProduct.reference) {
      row.reference = selectedProduct.reference
    }
  }
}

const deleteRow = (row_id: string) => {
  const index = rows.findIndex((row) => row.row_id === row_id) // 👈 fixed
  if (index !== -1) {
    rows.splice(index, 1)
  }
}

const calculateRowTotal = (row: ProductRow) => {
  const priceAfterDiscount = row.price * (1 - row.discount / 100)
  const taxAmount = priceAfterDiscount * (row.tax.rate / 100)
  return (priceAfterDiscount + taxAmount) * row.quantity
}

const getProductRows = () => {
  const mappedRows = rows.map((row) => ({
    row_id: row.row_id,
    productName: row.product?.name,
    reference: row.reference,
    price: row.price,
    discount: row.discount,
    taxRate: row.tax.rate,
    taxName: row.tax.name,
    quantity: row.quantity,
    total: calculateRowTotal(row),
  }))
  return mappedRows
}

defineExpose({ getProductRows, totals: priceDetailRef })
</script>
