<template>
  <aside class="h-screen w-64 bg-white shadow-lg flex flex-col">
    <!-- Logo -->

    <!-- Menu -->
    <Menu :model="menuItems" class="flex-1 p-2">
      <template #start>
        <div
          class="flex items-center h-14 mx-2 border-b border-gray-200"
        >
          <span class="font-semibold"> (╥‸╥) </span>
          <span class="font-semibold ml-2 text-2xl text-gray-600 font-mono"> trista </span>
          <!-- <img src="/trista-logo.svg" alt="Logo" class="h-12" /> -->
        </div>
      </template>
      <template #item="{ item, props }">
        <a
          v-ripple
          class="flex justify-between items-center m-0 p-0 group"
          v-bind="props.action"
        >
          <div class="p-0">
            <span :class="item.icon" />
            <span class="ml-3 text-sm">{{ t(`${item.label}`) }}</span>
          </div>

          <Button
            variant="outlined"
            size="small"
            v-if="item.createButton"
            @click.stop="item.createCommand"
            icon="pi pi-plus"
            class="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        </a>
      </template>
    </Menu>

    <!-- User footer -->
    <div class="p-4 border-t">
      <button
        v-ripple
        class="flex items-center w-full text-left hover:bg-gray-100 p-2 rounded-lg transition"
      >
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          class="mr-3"
          shape="circle"
        />
        <div>
          <p class="font-semibold">Amy Elsner</p>
          <p class="text-sm text-gray-500">Admin</p>
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Badge from "primevue/badge";
import { Button } from "primevue";
import { useI18n } from "vue-i18n";
const router = useRouter();
const { t } = useI18n();

const menuItems = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => router.push("/home"),
  },
  {
    label: "Invoices",
    icon: "pi pi-receipt",
    command: () => router.push("/invoices"),
    createButton: true,
    createCommand: () => router.push("/invoices/add"),
  },
  {
    label: "Products",
    icon: "pi pi-box",
    command: () => router.push("/products"),
    createButton: true,
    createCommand: () => router.push("/products/add"),
  },
]);
</script>
