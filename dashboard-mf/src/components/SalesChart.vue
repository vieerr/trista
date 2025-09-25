<template>
  <Card class="p-4">
    <CardHeader>
      <CardTitle>Total de ventas</CardTitle>
      <CardDescription class="flex flex-row justify-between items-center gap-1">
        La gráfica muestra el valor de tus ventas con impuestos incluidos.
        <div>
          <span class="text-2xl font-light text-primary">{{
            formatCurrency(reactiveData.reduce((acc, curr) => acc + curr.value, 0))
          }}</span>
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
import moment from 'moment'
import { formatCurrency } from '@/utils'
import { computed } from 'vue'

const props = defineProps<{ data: { date: string; value: number }[] }>()
const reactiveData = computed(() => props.data)

// Get all days of current month
const startOfMonth = moment().startOf('month')
const endOfMonth = moment().endOf('month')

const allDays: string[] = []
const current = startOfMonth.clone()
while (current.isSameOrBefore(endOfMonth)) {
  allDays.push(current.format('YYYY-MM-DD')) // keep ISO format for datetime
  current.add(1, 'day')
}

// Build data aligned with all days
const salesData = computed(() =>
  allDays.map((day) => {
    const found = reactiveData.value.find((d) => moment(d.date).isSame(day, 'day'))
    return {
      x: day,
      y: found ? found.value : 0,
    }
  }),
)

const series = computed(() => [
  {
    name: 'Ventas',
    data: salesData.value,
  },
])

const chartOptions = {
  chart: {
    id: 'sales-chart',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
  },
  xaxis: {
    type: 'datetime', // important!
    labels: {
      format: 'd MMM', // -> "1 Sept", "3 Sept" etc.
    },
  },
  stroke: { curve: 'straight', width: 2, colors: ['#0e9f6e'] },
  yaxis: {
    labels: {
      formatter: (val: number) => `${formatCurrency(val)}`,
    },
  },
  tooltip: {
    theme: 'light',
    x: { format: 'd MMM yyyy' }, // tooltip shows full date
  },
}
</script>
