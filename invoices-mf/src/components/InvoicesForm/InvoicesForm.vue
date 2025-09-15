<template>
  <div class="container mx-auto p-4 border-2 shadow-md border-gray-300 rounded-lg w-2/3">
    <Form
      v-slot="$form"
      :initialValues="formValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="w-full p-5 mx-auto"
    >
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
              name="payment-method"
              v-model="formValues['payment-method']"
              :options="[
                { label: t('payment_methods.cash'), value: 'cash' },
                { label: t('payment_methods.credit_card'), value: 'credit_card' },
                { label: t('payment_methods.bank_transfer'), value: 'bank_transfer' },
              ]"
              optionLabel="label"
              fluid
            />
            <label for="payment-method">{{ t('payment_method') }}</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <Select
              name="payment-period"
              :options="paymentPeriodOptions"
              optionLabel="label"
              fluid
              v-model="selectedPaymentPeriod"
            />
            <label for="payment-period">{{ t('payment_period') }}</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <DatePicker name="due-date" :modelValue="dueDate" fluid />
            <label for="due-date">{{ t('due_date') }}</label>
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
import { useToast } from 'primevue/usetoast'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import InvoicesFormTable from '@/components/InvoicesForm/InvoicesFormTable.vue'
import { getInvoicesCount } from '@/services/invoices'
import moment from 'moment'
import type { ProductRow } from '@/types'

const toast = useToast()
const { t } = useI18n()

interface FormValues {
  number: string
  client: { name: string; id: string } | null
  date: Date
  'payment-method': { label: string; value: string }
  'payment-period': { label: string; value: string }
  'due-date': Date
  products: ProductRow[]
}

const tableRef = ref()

const clients = ref([
  { name: 'Jhon Doe', id: '1' },
  { name: 'Jane Roe', id: '2' },
  { name: 'Alex Smith', id: '3' },
  { name: 'Maria Garcia', id: '4' },
])

// Define payment period options
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
  'payment-method': {
    label: t('payment_methods.cash'),
    value: 'cash',
  },
  'payment-period': selectedPaymentPeriod.value,
  'due-date': dueDate.value,
  products: [] as ProductRow[],
})

watch(selectedPaymentPeriod, (newPeriod) => {
  formValues['due-date'] = moment().add(parseInt(newPeriod.value), 'days').toDate()
})

onMounted(async () => {
  formValues.number = (await getInvoicesCount()) + 1 + ''
})

// Define Zod schema
const schema = z.object({
  number: z.string().min(1, { message: 'Número es requerido' }),
  client: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    // .nullable()
    .refine((val) => val !== null, {
      message: 'Cliente es requerido',
    }),
  date: z.date().optional(),
  'payment-method': z.object({ label: z.string(), value: z.string() }).optional(),
  'payment-period': z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  'due-date': z.date().optional(),
  products: z
    .array(
      z.object({
        productId: z.string(),
      }),
    )
    .min(1, { message: 'Al menos un producto es requerido' }),
})

const resolver = ref(zodResolver(schema))

const onFormSubmit = (e: FormSubmitEvent) => {
  console.log('Form submission event:', e)

  const productRows = tableRef.value.getProductRows() || []
  console.log(productRows)
  formValues.products = productRows // Sync with form data

  const { success, error } = schema.safeParse(formValues)
  console.log('Validation result:', { success, error })

  const formData = {
    number: formValues.number,
    clientId: formValues.client?.id,
    clientName: formValues.client?.name,
    date: formValues.date,
    'payment-method': formValues['payment-method'].value,
    'payment-period': formValues['payment-period'].value,
    'due-date': formValues['due-date'],
    products: formValues.products,
  }

  if (success) {
    console.log('Form is valid with data:', formData)
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })

    // Submit formData to your API here
  } else {
    toast.add({
      severity: 'error',
      summary: 'Please fix validation errors',
      life: 3000,
    })
  }
}
</script>
