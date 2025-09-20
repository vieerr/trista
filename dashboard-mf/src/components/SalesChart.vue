<template>
  <Card class="p-4">
    <CardHeader>
      <CardTitle>Total de ventas</CardTitle>
      <CardDescription class="flex flex-row justify-between items-center gap-1">
        La gráfica muestra el valor de tus ventas con impuestos incluidos.
        <div>
          <span class="text-2xl font-light text-primary"
            >${{ props.data.reduce((acc, curr) => acc + curr.value, 0).toLocaleString() }}</span
          >
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ApexChart type="line" height="300" :options="chartOptions" :series="series" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import ApexChart from 'vue3-apexcharts'
const props = defineProps<{ data: { date: string; value: number }[] }>()

const series = [
  {
    name: 'Ventas',
    data: props.data.map((d) => d.value),
  },
]

const chartOptions = {
  chart: { id: 'sales-chart' },
  xaxis: { categories: props.data.map((d) => d.date) },
  stroke: { curve: 'straight' },
  tooltip: { theme: 'light' },
}
</script>
