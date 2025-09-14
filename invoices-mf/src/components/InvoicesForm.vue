<template>
  <div class="container mx-auto p-4 border-2 shadow-md border-gray-300 rounded-lg w-2/3">
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="w-full p-5 mx-auto">
      <div class="flex justify-between gap-4">
        <Fieldset legend="Cliente" class="flex flex-col w-full gap-4">
          <FloatLabel variant="on" class="my-3">
            <InputText id="number" name="number" type="text" fluid />
            <label for="number">Número</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <Select name="client" :options="clients" optionLabel="name" fluid />
            <label for="client">Cliente</label>
            <Message v-if="$form.client?.invalid" severity="error" size="small" variant="simple">{{
              $form.client.error?.message
            }}</Message>
          </FloatLabel>
        </Fieldset>
        <Fieldset legend="Detalles" class="flex flex-col w-full gap-4">
          <FloatLabel variant="on" class="my-3">
            <DatePicker name="date" fluid :defaultValue="new Date()" />
            <label for="date">Fecha de emisión</label>
          </FloatLabel>

          <FloatLabel variant="on" class="my-3">
            <Select
              name="payment-method"
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
              :options="[
                { label: t('payment_periods.cash'), value: '0' },
                { label: t('payment_periods.7_days'), value: '7' },
                { label: t('payment_periods.15_days'), value: '15' },
                { label: t('payment_periods.1_month'), value: '30' },
                { label: t('payment_periods.2_months'), value: '60' },
              ]"
              optionLabel="label"
              fluid
            />
            <label for="payment-period">{{ t('payment_period') }}</label>
          </FloatLabel>
          <FloatLabel variant="on" class="my-3">
            <Select
              name="city.name"
              :options="clients"
              optionLabel="name"
              :placeholder="t('select')"
              fluid
            />
          </FloatLabel>
        </Fieldset>
      </div>
      <InvoicesFormTable />

      <Button type="submit" severity="secondary" label="Submit" />
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
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { Form } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useI18n } from 'vue-i18n'
import InvoicesFormTable from './InvoicesFormTable.vue'

const { t } = useI18n()

const toast = useToast()

const clients = ref([
  { name: 'Jhon Doe', id: '1' },
  { name: 'Jane Roe', id: '2' },
  { name: 'Alex Smith', id: '3' },
  { name: 'Maria Garcia', id: '4' },
])

const initialValues = reactive({
  number: '',
})

const resolver = ref(
  zodResolver(
    z.object({
      city: z.union([
        z.object({
          name: z.string().min(1, 'City is required.'),
        }),
        z.any().refine(() => false, { message: 'City is required.' }),
      ]),
    }),
  ),
)

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  }
}
</script>
