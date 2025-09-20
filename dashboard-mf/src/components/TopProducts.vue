<template>
  <Card class="p-4">
    <CardHeader>
      <CardTitle>Productos más vendidos</CardTitle>
      <CardDescription> El total vendido tiene impuestos incluidos. </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader class="text-gray-700">
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead>N° Items</TableHead>
            <TableHead>Total Vendido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow class="text-gray-500" v-for="(product, i) in products" :key="i">
            <TableCell>{{ product.concept }}</TableCell>
            <TableCell>{{ product.items }}</TableCell>
            <TableCell>€{{ product.total.toFixed(2) }}</TableCell>
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

defineProps<{ products: { concept: string; items: number; total: number }[] }>()
</script>
