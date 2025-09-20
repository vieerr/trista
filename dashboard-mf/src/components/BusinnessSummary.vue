<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-semibold">Resumen del negocio</h2>

    <!-- If still loading, show skeletons -->
    <template v-if="isLoading">
      <!-- Chart skeleton -->
      <Card class="p-4">
        <CardHeader>
          <Skeleton class="h-6 w-40 mb-2" />
          <Skeleton class="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-[300px] w-full" />
        </CardContent>
      </Card>

      <!-- Tables skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="p-4">
          <CardHeader>
            <Skeleton class="h-6 w-32 mb-2" />
            <Skeleton class="h-4 w-56" />
          </CardHeader>
          <CardContent class="space-y-2">
            <Skeleton class="h-10 w-full" v-for="i in 5" :key="i" />
          </CardContent>
        </Card>

        <Card class="p-4">
          <CardHeader>
            <Skeleton class="h-6 w-32 mb-2" />
            <Skeleton class="h-4 w-56" />
          </CardHeader>
          <CardContent class="space-y-2">
            <Skeleton class="h-10 w-full" v-for="i in 5" :key="i" />
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- Once all loaded, show actual components -->
    <template v-else>
      <SalesChart :data="salesData" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopProducts :products="products" />
        <TopCustomers :customers="customers" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import SalesChart from './SalesChart.vue'
import TopProducts from './TopProducts.vue'
import TopCustomers from './TopCustomers.vue'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/vue-query'
import { getSalesOverTime, getTopCustomers, getTopProducts } from '@/services/analytics'
import { computed } from 'vue'

const { data: salesData, isLoading: isSalesDataLoading } = useQuery({
  queryKey: ['salesData'],
  queryFn: () => getSalesOverTime(),
})

const { data: products, isLoading: isProductsLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => getTopProducts(),
})

const { data: customers, isLoading: isCustomersLoading } = useQuery({
  queryKey: ['customers'],
  queryFn: () => getTopCustomers(),
})

const isLoading = computed(
  () => isSalesDataLoading.value || isProductsLoading.value || isCustomersLoading.value,
)
</script>
