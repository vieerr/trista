// Primevue components being used on microfrontends should be imported here to avoid tree shaking
// them away when building the shell application.
<template>
  <Button style="display: none" label="shell" />
  <DataTable paginator  style="display: none" />
  <Column style="display: none" />
  <Form style="display: none" />
  <Fieldset style="display: none" />
  <FloatLabel style="display: none" />
  <InputText style="display: none" />
  <Select style="display: none" />
  <DatePicker style="display: none" />
  <Message style="display: none" />
  <Divider style="display: none" />
  <Checkbox style="display: none" />
  <CheckboxGroup style="display: none" />
  <Fieldset legend="Cliente" style="display: none" />
  <Card style="display: none" />
</template>

<script setup lang="ts">
import {
  Checkbox,
  Card,
  CheckboxGroup,
  Button,
  DataTable,
  Column,
  Fieldset,
  FloatLabel,
  InputText,
  Select,
  DatePicker,
  Message,
  Divider,
} from "primevue";
import { Form, } from "@primevue/forms";
</script>
