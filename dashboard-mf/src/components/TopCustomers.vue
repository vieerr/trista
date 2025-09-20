<template>
  <Card class="p-4">
    <CardHeader>
      <CardTitle>Mejores clientes</CardTitle>
      <CardDescription> El total vendido tiene impuestos incluidos. </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader class="text-gray-700">
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead>N° Documentos</TableHead>
            <TableHead>Total Vendido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow class="text-gray-500" v-for="(customer, i) in customers" :key="i">
            <TableCell>{{ customer.concept }}</TableCell>
            <TableCell>{{ customer.documents }}</TableCell>
            <TableCell>€{{ customer.total.toFixed(2) }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

defineProps<{ customers: { concept: string; documents: number; total: number }[] }>()
</script>
