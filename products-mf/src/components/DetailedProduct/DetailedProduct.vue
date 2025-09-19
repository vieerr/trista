<template>
  <div class="p-4">
    <!-- Action Buttons -->
    <div class="flex gap-2 mb-5"></div>

    <!-- Content -->
    <div class="grid grid-cols-3 gap-4">
      <!-- Left side: product details -->
      <Card class="col-span-2">
        <template #header>
          <h2 class="text-xl p-5 pb-0 text-gray-600 font-semibold">
            {{ isLoading ? 'Cargando...' : data?.name || 'Producto no encontrado' }}
          </h2>
        </template>
        <template #content>
          <div class="grid grid-cols-2 gap-7 text-sm">
            <div>
              <p class="text-gray-700 text-md">Referencia</p>
              <p class="font-light">{{ isLoading ? 'Cargando...' : data?.reference || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-gray-700 text-md">Tipo de ítem</p>
              <p class="font-light">{{ isLoading ? 'Cargando...' : data?.type || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-gray-700 text-md">Unidad de medida</p>
              <p class="font-light">{{ isLoading ? 'Cargando...' : data?.unit || 'N/A' }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-gray-700 text-md">Descripción</p>
              <p class="font-light">{{ isLoading ? 'Cargando...' : data?.description || 'N/A' }}</p>
            </div>
            <div class="col-span-2 flex mt-4 gap-4 justify-end">
              <Button
                size="small"
                label="Desactivar"
                variant="outlined"
                severity="danger"
                icon="pi pi-ban"
              />
              <Button size="small" label="Editar" icon="pi pi-pencil" outlined />
              <Button size="small" label="Facturar este ítem" outlined icon="pi pi-plus" />
            </div>
          </div>
        </template>
      </Card>

      <!-- Right side: image & price -->
      <Card>
        <template #content>
          <div class="flex flex-col items-center">
            <!-- <img
              :src="data?.image_url"
              alt="Imagen del producto"
            /> -->
            <Image
              class="w-52 h-52 object-contain mb-4 border border-dashed rounded"
              :src="data?.image_url"
              alt="Image"
              preview
            />
            <div class="text-center">
              <p class="text-gray-500">Precio Total</p>
              <p class="text-xl font-bold">
                {{
                  isLoading
                    ? 'Cargando...'
                    : formatCurrency((data?.price ?? 0) * (1 + (data?.taxRate ?? 0) / 100))
                }}
              </p>
              <div class="text-left mt-4">
                <p class="text-gray-500 mt-2 text-sm">
                  Precio sin impuesto:
                  {{ isLoading ? 'Cargando...' : formatCurrency(data?.price) }}
                </p>
                <p class="text-gray-500 text-sm">
                  Impuesto: {{ isLoading ? 'Cargando...' : data?.taxName || 'N/A' }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>

  <Card class="m-4">
    <template #header>
      <h2 class="text-lg p-6 text-gray-600 pb-0">Facturas que incluyen este producto</h2>
    </template>
    <template #content>
      <DataTable
        :value="invoices"
        dataKey="folio"
        class="text-sm"
        selectionMode="checkbox"
        v-model:selection="selectedInvoices"
        paginator
        :rows="20"
        :rowsPerPageOptions="[10, 20, 50]"
        tableStyle="min-width: 60rem"
        removableSort
      >
        <!-- Checkbox column -->
        <Column selectionMode="multiple" headerStyle="width:3rem"></Column>

        <!-- Folio -->
        <Column field="folio" header="Folio" sortable>
          <template #body="{ data }">
            <a href="#" class="text-teal-600 hover:underline">
              {{ data.folio }}
            </a>
          </template>
        </Column>

        <!-- Cliente -->
        <Column field="cliente" header="Cliente" sortable>
          <template #body="{ data }">
            <a href="#" class="text-teal-600 hover:underline">
              {{ data.cliente }}
            </a>
          </template>
        </Column>

        <!-- Creación -->
        <Column field="creacion" header="Creación" sortable></Column>

        <!-- Vencimiento -->
        <Column field="vencimiento" header="Vencimiento" sortable>
          <template #body="{ data }">
            <span :class="data.vencimientoColor">
              {{ data.vencimiento }}
            </span>
          </template>
        </Column>

        <!-- Total -->
        <Column field="total" header="Total" sortable></Column>

        <!-- Pagado -->
        <Column field="pagado" header="Pagado" sortable></Column>

        <!-- Estado -->
        <Column field="estado" header="Estado" sortable></Column>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { getProductById } from '@/services/products'
import { useQuery } from '@tanstack/vue-query'
import { Button, Card, DataTable, Column, Image } from 'primevue'
import { formatCurrency } from '@/utils'
import { ref } from 'vue'
const props = defineProps({
  id: String,
})

// will be replaced with real data later
const invoices = [
  {
    folio: 'F001-0001',
    cliente: 'Cliente A',
    creacion: '2023-01-01',
    vencimiento: '2023-01-31',
    vencimientoColor: 'text-green-600',
    total: '$1,200.00',
    pagado: '$1,200.00',
    estado: 'Pagado',
  },
  {
    folio: 'F001-0002',
    cliente: 'Cliente B',
    creacion: '2023-02-01',
    vencimiento: '2023-02-28',
    vencimientoColor: 'text-red-600',
    total: '$800.00',
    pagado: '$400.00',
    estado: 'Pendiente',
  },
]

const selectedInvoices = ref([])

const { data, isLoading } = useQuery({
  queryKey: ['product', props.id],
  queryFn: () => getProductById(props.id as string),
})
</script>
