<template>
  <Toaster richColors position="top-right" />
  <div class="corner-div relative p-4 bg-white-100 bg-white rounded-md shadow-md overflow-hidden">
    <Form
      v-slot="$form"
      :initialValues="formValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="w-full p-5 mx-auto bg-white"
    >
      <h2 class="text-lg font-mono font-thin text-center text-gray-700 py-10">
        Super Awesome Company
      </h2>

      <div class="flex justify-between gap-4">
        <Fieldset legend="Cliente" class="flex flex-col w-full gap-4">
          <FloatLabel variant="on" class="my-3">
            <InputText
              :defaultValue="formValues.number"
              id="number"
              name="number"
              type="text"
              fluid
            />
            <label for="number">Número</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <Select
              v-model="formValues.client"
              name="client"
              :options="clients"
              optionLabel="name"
              fluid
            />
            <label for="client">Cliente</label>
            <Message v-if="$form.client?.invalid" severity="error" size="small" variant="simple">{{
              $form.client.error?.message
            }}</Message>
          </FloatLabel>
        </Fieldset>
        <Fieldset legend="Detalles" class="flex flex-col w-full gap-4">
          <FloatLabel variant="on" class="my-3">
            <DatePicker name="date" fluid :defaultValue="moment().toDate()" />
            <label for="date">Fecha de emisión</label>
          </FloatLabel>

          <FloatLabel variant="on" class="my-3">
            <Select
              name="payment_method"
              v-model="formValues['payment_method']"
              :options="[
                { label: t('payment_methods.cash'), value: 'cash' },
                { label: t('payment_methods.credit_card'), value: 'credit_card' },
                { label: t('payment_methods.bank_transfer'), value: 'bank_transfer' },
              ]"
              optionLabel="label"
              fluid
            />
            <label for="payment_method">{{ t('payment_method') }}</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <Select
              name="payment_period"
              :options="paymentPeriodOptions"
              optionLabel="label"
              fluid
              v-model="selectedPaymentPeriod"
            />
            <label for="payment_period">{{ t('payment_period') }}</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <DatePicker name="due_date" :modelValue="dueDate" fluid />
            <label for="due_date">{{ t('invoices_form.due_date') }}</label>
          </FloatLabel>
        </Fieldset>
      </div>
      <InvoicesFormTable ref="tableRef" />

      <Button type="submit" icon="pi pi-save" :label="t('save')" />
    </Form>
  </div>
</template>

<script lang="ts" setup>
import Fieldset from 'primevue/fieldset'
import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { Toaster, toast } from 'vue-sonner'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import InvoicesFormTable from '@/components/InvoicesForm/InvoicesFormTable.vue'
import { createInvoice, getInvoicesCount } from '@/services/invoices'
import moment from 'moment'
import type { Invoice, ProductRow } from '@/types'
import { useMutation } from '@tanstack/vue-query'
import { invoiceSchema } from '@/validators/InvoicesValidator'

const { t } = useI18n()

interface FormValues {
  number: string
  client: { name: string; id: string } | null
  date: Date
  payment_method: { label: string; value: string }
  payment_period: { label: string; value: string }
  due_date: Date
  products: ProductRow[]
}

const tableRef = ref()

const clients = ref([
  { name: 'Jhon Doe', id: '1' },
  { name: 'Jane Roe', id: '2' },
  { name: 'Alex Smith', id: '3' },
  { name: 'Maria Garcia', id: '4' },
])

const paymentPeriodOptions = [
  { label: t('payment_periods.cash'), value: '0' },
  { label: t('payment_periods.7_days'), value: '7' },
  { label: t('payment_periods.15_days'), value: '15' },
  { label: t('payment_periods.1_month'), value: '30' },
  { label: t('payment_periods.2_months'), value: '60' },
]

const selectedPaymentPeriod = ref(paymentPeriodOptions[0])

const dueDate = computed(() => {
  const days = parseInt(selectedPaymentPeriod.value.value)
  return moment().add(days, 'days').toDate()
})

const formValues = reactive<FormValues>({
  number: '999',
  client: null,
  date: new Date(),
  payment_method: {
    label: t('payment_methods.cash'),
    value: 'cash',
  },
  payment_period: selectedPaymentPeriod.value,
  due_date: dueDate.value,
  products: [] as ProductRow[],
})

watch(selectedPaymentPeriod, (newPeriod) => {
  formValues['due_date'] = moment().add(parseInt(newPeriod.value), 'days').toDate()
})

onMounted(async () => {
  formValues.number = (await getInvoicesCount()) + 1 + ''
})

const schema = invoiceSchema
const resolver = ref(zodResolver(schema))

const { mutate: createInvoiceMutation } = useMutation({
  mutationFn: (newInvoice: Invoice) => createInvoice(newInvoice),
  onSuccess: () => {
    toast.success('Factura creada con éxito')
  },
  onError: () => {
    toast.error('Error al crear la factura')
  },
})

const onFormSubmit = (e: FormSubmitEvent) => {
  console.log('Form submission event:', e)

  const productRows = tableRef.value.getProductRows() || []
  formValues.products = productRows

  const totals = tableRef.value.totals || {}

  const formData = {
    number: formValues.number,
    client_id: formValues.client?.id,
    client_name: formValues.client?.name,
    client_official_id: '123456789',
    client_phone: '0992468823',
    operation_date: moment(formValues.date).format('DD-MM-YYYY'),
    type: 'Simple',
    payment_method: formValues['payment_method'].value,
    payment_period: formValues['payment_period'].value,
    due_date: moment(formValues['due_date']).format('DD-MM-YYYY'),
    products: formValues.products,
    amount: totals.amount,
    subtotal: totals.subtotal,
    discount: totals.discount,
    taxable_base: totals.taxable_base,
    taxes: totals.taxes,
    total: totals.total,
    created_at: moment().format('DD-MM-YYYY HH:mm:ss'),
    status: 'Pending',
  }

  const { success } = schema.safeParse(formData)

  if (success) {
    createInvoiceMutation(formData as unknown as Invoice)
  }
}
</script>
