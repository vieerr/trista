<template>
  <div class="pb-10">
    <h2>
      {{ t('invoices_detail.title') + ' #' + $route.params.id }}
    </h2>
    <div class="flex gap-2 mt-4">
      <Button
        variant="outlined"
        size="small"
        icon="pi pi-print"
        :label="t('invoices_detail.print')"
      />
      <Button
        variant="outlined"
        size="small"
        icon="pi pi-file-pdf"
        :label="t('invoices_detail.downloadPDF')"
      />
      <!-- TODO: implement share functionality -->
      <Button
        hidden
        variant="outlined"
        size="small"
        icon="pi pi-share"
        :label="t('invoices_detail.share')"
      />
      <!-- TODO: implement more actions functionality -->
      <Button
        hidden
        variant="outlined"
        size="small"
        icon="pi pi-ellipsis-v"
        :label="t('invoices_detail.moreActions')"
      />
    </div>
    <!-- TODO: implement payment details and history -->

    <div class="corner-div relative p-4 bg-white-100 bg-white rounded-md shadow-md overflow-hidden">
      <div class="w-full p-5 mx-auto bg-white">
        <h2 class="text-lg font-mono font-thin text-center text-gray-700 py-10">
          Super Awesome Company
        </h2>
        <p class="text-center mb-5 absolute top-10 right-10">
          <span class="text-gray-500 text-lg font-medium">
            <span class="text-2xl font-light"> No. </span>
            {{ invoice?.number }}
          </span>
        </p>

        <div class="flex flex-col justify-between mb-5">
          <div class="flex justify-between">
            <p>
              <span class="text-gray-500 font-light"> {{ t('invoices_detail.client') }}: </span>
              <span class="text-gray-500 font-medium">
                {{ invoice?.client }}
              </span>
            </p>
            <p>
              <span class="text-gray-600 font-light"> {{ t('invoices_detail.date') }}: </span>
              <span class="text-gray-500 font-medium">
                {{ moment(invoice?.date, 'DD-MM-YYYY').locale('es').format('DD/MM/YYYY') }}
              </span>
            </p>
          </div>
          <Divider />
          <div class="flex justify-between">
            <p>
              <span class="text-gray-500 font-light"> {{ t('invoices_detail.clientId') }}: </span>
              <span class="text-gray-500 font-medium">
                9999999999999
                <!-- {{ invoice?.clientId }} -->
              </span>
            </p>
            <p>
              <span class="text-gray-600 font-light"> {{ t('invoices_detail.due_date') }}: </span>
              <span class="text-gray-500 font-medium">
                {{ moment(invoice?.due_date, 'DD-MM-YYYY').locale('es').format('DD/MM/YYYY') }}
              </span>
            </p>
          </div>
          <Divider />
          <div class="flex justify-between">
            <p>
              <span class="text-gray-500 font-light">
                {{ t('invoices_detail.clientPhone') }}:
              </span>
              <span class="text-gray-500 font-medium">
                0991234567
                <!-- {{ invoice?.clientPhone }} -->
              </span>
            </p>
          </div>
          <Divider />
        </div>

        <div class="card">
          <DataTable :value="invoice?.products" tableStyle="min-width: 50rem" class="text-sm">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
              <template #body="slotProps">
                <span v-if="col.type === 'currency'"> ${{ slotProps.data[col.field] }} </span>
                <span v-else-if="col.type === 'percentage'">
                  {{ slotProps.data[col.field] }}%
                </span>
                <span v-else>
                  {{ slotProps.data[col.field] }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>

        <div class="w-1/3 my-10 ml-auto text-md">
          <p class="text-gray-600 my-2 grid grid-cols-2 gap-7">
            <span class="text-gray-600 font-semibold text-right">Subtotal:</span>
            <span class="text-right"> $99 </span>
          </p>
          <p class="text-gray-600 my-2 grid grid-cols-2 gap-7">
            <span class="text-gray-600 font-semibold text-right">Discount:</span>
            <span class="text-right"> -$9.90 </span>
          </p>
          <p class="text-gray-600 my-2 grid grid-cols-2 gap-7">
            <span class="text-gray-600 font-semibold text-right">Taxable Base:</span>
            <span class="text-right"> $79.90 </span>
          </p>
          <div
            v-for="(tax, index) in [
              { name: 'IVA 12%', amount: 9.59 },
              { name: 'ICE 5%', amount: 3.99 },
            ]"
            :key="index"
            class="text-gray-600 my-2 grid grid-cols-2 gap-7"
          >
            <span class="text-gray-600 font-semibold text-right">{{ tax.name }}:</span>
            <span class="text-right"> ${{ tax.amount.toFixed(2) }} </span>
          </div>
          <Divider />
          <p class="text-gray-600 my-3 grid grid-cols-2 gap-7">
            <span class="text-gray-600 text-2xl font-semibold text-right">Total:</span>
            <span class="text-right text-2xl"> $99.00 </span>
          </p>
        </div>

        <div class="flex flex-col mb-5 text-left">
          <div>
            <div class="grid grid-cols-2 text-left">
              <p>
                <span class="text-gray-500 font-light">
                  {{ t('invoices_detail.payment_method') }}:
                </span>
              </p>
              <p>
                <span class="text-gray-500 font-medium">
                  {{ invoice?.paymentMethod }}
                </span>
              </p>
            </div>
            <Divider />
          </div>
          <div>
            <div class="grid grid-cols-2 text-left">
              <p>
                <span class="text-gray-500 font-light">
                  {{ t('invoices_detail.payment_period') }}:
                </span>
              </p>
              <p>
                <span class="text-gray-500 font-medium">
                  <!-- {{ invoice?.paymentPeriod }} -->
                  De contado
                </span>
              </p>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import moment from 'moment'
import { DataTable } from 'primevue'
import { Column } from 'primevue'
import Button from 'primevue/button'
import type { Invoice } from '@/types'
import { fetchInvoiceById } from '@/services/invoices'
import { useQuery } from '@tanstack/vue-query'
import { Divider } from 'primevue'

const { t } = useI18n()

const props = defineProps({
  id: String,
})

const { data: invoice } = useQuery<Invoice | null>({
  queryKey: ['invoice', props.id],
  queryFn: () => fetchInvoiceById(props.id as string),
})

const columns = [
  { field: 'productName', header: t('invoices_detail.product') },
  {
    field: 'reference',
    header: t('invoices_detail.reference'),
  },
  { field: 'price', header: t('invoices_detail.price'), type: 'currency' },
  { field: 'discount', header: t('invoices_detail.discount'), type: 'percentage' },
  { field: 'taxRate', header: t('invoices_detail.tax'), type: 'percentage' },
  { field: 'description', header: t('invoices_detail.description') },
  { field: 'quantity', header: t('invoices_detail.quantity') },
  { field: 'total', header: t('invoices_detail.total'), type: 'currency' },
]
</script>
