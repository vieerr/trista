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
              v-model="formValues.number"
              id="number"
              name="number"
              type="text"
              fluid
              readonly
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

      <div class="flex justify-end gap-4 mt-10">
        <Button
          type="button"
          icon="pi pi-times"
          severity="secondary"
          :label="t('invoices_form.cancel')"
          @click="() => goToTable()"
        />
        <Button
          type="button"
          icon="pi pi-plus"
          severity="secondary"
          :label="t('invoices_form.create_again')"
          @click="() => handleCreateAgain()"
        />
        <Button type="submit" icon="pi pi-save" :label="t('invoices_form.save')" />
      </div>
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
import { reactive, ref, watch, computed } from 'vue'
import { Toaster, toast } from 'vue-sonner'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import InvoicesFormTable from '@/components/InvoicesForm/InvoicesFormTable.vue'
import { createInvoice, getInvoicesCount } from '@/services/invoices'
import moment from 'moment'
import type { Invoice, ProductRow } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { invoiceSchema } from '@/validators/InvoicesValidator'
import { useRouter } from 'vue-router'
import type { ZodError } from 'zod'
import type { InvoicesFormData } from '@/types'

const router = useRouter()
const queryClient = useQueryClient()
const { t } = useI18n()

const tableRef = ref()

const clients = ref([
  { name: 'Jhon Doe', id: '1', official_id: '123456789', phone: '0991234567' },
  { name: 'Jane Roe', id: '2', official_id: '987654321', phone: '0997654321' },
  { name: 'Alex Smith', id: '3', official_id: '456789123', phone: '0994567890' },
  { name: 'Maria Garcia', id: '4', official_id: '789123456', phone: '0997891234' },
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

const formValues = reactive<InvoicesFormData>({
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

const { data: invoiceCount } = useQuery({
  queryKey: ['invoice-count'],
  queryFn: getInvoicesCount,
})

watch(
  invoiceCount,
  (count) => {
    formValues.number = ((count ?? 0) + 1).toString()
  },
  { immediate: true },
)

const schema = invoiceSchema
const resolver = ref(zodResolver(schema))

const { mutate: createInvoiceMutation } = useMutation({
  mutationFn: (newInvoice: Invoice) => createInvoice(newInvoice),
  onSuccess: () => {
    toast.success('Factura creada con éxito')
    queryClient.invalidateQueries({ queryKey: ['invoices'] })
    queryClient.invalidateQueries({ queryKey: ['invoice-count'] })
  },
  onError: () => {
    toast.error('Error al crear la factura')
  },
})

const goToTable = () => {
  router.push(router.getRoutes().find((route) => route.name === 'InvoicesTable')!.path)
}

const handleCreateAgain = () => {
  onFormSubmit()
  formValues.client = null
  formValues.date = new Date()
  formValues.payment_method = {
    label: t('payment_methods.cash'),
    value: 'cash',
  }
  formValues.payment_period = paymentPeriodOptions[0]
  formValues.due_date = moment().toDate()
  formValues.products = []
  tableRef.value.resetTable()
  formValues.number = (invoiceCount?.value ?? 0) + 1 + ''
}

const onFormSubmit = () => {
  const productRows = tableRef.value.getProductRows() || []
  formValues.products = productRows

  const totals = tableRef.value.totals || {}

  const formData = {
    number: formValues.number,
    client_id: formValues.client?.id,
    client_name: formValues.client?.name,
    client_official_id: formValues.client?.official_id,
    client_phone: formValues.client?.phone,
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

  const { success, error } = schema.safeParse(formData)
  if (success) {
    createInvoiceMutation(formData as unknown as Invoice)
  } else {
    console.error('Validation errors:', error)
    toast.error(
      'Error en la validación del formulario:\n' +
        (error as ZodError).issues.map((err) => err.message).join('\n'),
    )
  }
}
</script>
