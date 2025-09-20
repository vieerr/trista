<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-semibold">Resumen del negocio</h2>

    <!-- Chart -->
    <SalesChart :data="salesData" />

    <!-- Tables -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TopProducts :products="products" />
      <TopCustomers :customers="customers" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SalesChart from './SalesChart.vue'
import TopProducts from './TopProducts.vue'
import TopCustomers from './TopCustomers.vue'

const salesData = [
  { date: '2025-09-01', value: 0 },
  { date: '2025-09-13', value: 120 },
  { date: '2025-09-15', value: 60 },
  { date: '2025-09-17', value: 200 },
  { date: '2025-09-19', value: 30 },
]

const products = [
  { concept: 'Camisa Polo', items: 10, total: 242 },
  { concept: 'Pintura al óleo de gato', items: 3, total: 113.25 },
  { concept: 'Pantalón de mezclilla', items: 1, total: 55.1 },
]

const customers = [{ concept: 'Público en general', documents: 11, total: 410.35 }]
</script>
