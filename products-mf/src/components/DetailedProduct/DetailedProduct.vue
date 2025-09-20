<template>
  <Toaster richColors position="top-right" />
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
                v-if="data?.active"
                size="small"
                label="Desactivar"
                variant="outlined"
                severity="danger"
                @click="deactivateProduct()"
                icon="pi pi-ban"
              />
              <Button
                v-else
                size="small"
                label="Activar"
                variant="outlined"
                severity="success"
                @click="activateProduct()"
                icon="pi pi-check"
              />
              <Button
                size="small"
                label="Editar"
                icon="pi pi-pencil"
                outlined
                @click="editProduct()"
              />
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
              v-if="data?.image_url"
              class="w-52 flex justify-center h-52 mb-4 border border-dashed rounded"
              :src="data?.image_url"
              alt="Image"
              preview
            />
            <div
              v-else
              class="w-52 h-52 mb-4 flex items-center justify-center border border-dashed rounded"
              src="https://via.placeholder.com/200x200.png?text=No+Image"
              alt="No Image"
              preview
            >
              <i
                class="pi pi-image text-gray-400"
                style="
                  font-size: 4.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                "
              >
              </i>
            </div>
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
        dataKey="_id"
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

        <!-- Invoice Number -->
        <Column field="number" header="Número de Factura" sortable>
          <template #body="{ data }">
            <a href="#" class="text-teal-600 hover:underline">
              {{ data.number }}
            </a>
          </template>
        </Column>

        <!-- Client Name -->
        <Column field="client_name" header="Cliente" sortable>
          <template #body="{ data }">
            <a href="#" class="text-teal-600 hover:underline">
              {{ data.client_name }}
            </a>
          </template>
        </Column>

        <!-- Operation Date -->
        <Column field="operation_date" header="Fecha de Operación" sortable></Column>

        <!-- Due Date -->
        <Column field="due_date" header="Fecha de Vencimiento" sortable>
          <template #body="{ data }">
            <span :class="data.status === 'Vencido' ? 'text-red-500' : 'text-green-500'">
              {{ data.due_date }}
            </span>
          </template>
        </Column>

        <!-- Total -->
        <Column field="total" header="Total" sortable>
          <template #body="{ data }">
            {{ formatCurrency(data.total) }}
          </template>
        </Column>

        <!-- Status -->
        <Column field="status" header="Estado" sortable>
          <template #body="{ data }">
            <span :class="data.status === 'Pagado' ? 'text-green-500' : 'text-yellow-500'">
              {{ data.status }}
            </span>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { getInvoicesByProductId, getProductById, updateProduct } from '@/services/products'
import { toast, Toaster } from 'vue-sonner'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { Button, Card, DataTable, Column, Image } from 'primevue'
import { formatCurrency } from '@/utils'
import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
})
const queryClient = useQueryClient()
const router = useRouter()

const { data: invoices } = useQuery({
  queryKey: ['product', props.id],
  queryFn: () => getInvoicesByProductId(props.id as string),
})

const selectedInvoices = ref([])

const { data, isLoading } = useQuery({
  queryKey: ['product-detail', props.id],
  queryFn: () => getProductById(props.id as string),
})

const changeProductStatus = useMutation({
  mutationKey: ['deactivate-product'],
  mutationFn: (active: boolean) => {
    const formData = new FormData()
    formData.append('active', active.toString())
    return updateProduct(props.id as string, formData)
  },
  onSuccess: () => {
    toast.success('Producto actualizado con éxito')
    // Refetch product details
    queryClient.invalidateQueries({ queryKey: ['product-detail', props.id] })
  },
})

const deactivateProduct = () => {
  changeProductStatus.mutate(false)
}

const activateProduct = () => {
  changeProductStatus.mutate(true)
}

const editProduct = () => {
  router.push(`/add`)
}
</script>
