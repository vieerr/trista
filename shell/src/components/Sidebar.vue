<template>
  <div class="flex h-screen">
    <button
      class="absolute md:hidden top-0 left-4 z-auto p-4 rounded-full hover:bg-green-500 transition text-green-700"
      @click="isOpen = true"
    >
      <i class="pi pi-bars"></i>
    </button>

    <aside
      :class="[
        'bg-white shadow-lg flex flex-col fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40',
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64',
        'md:translate-x-0 md:relative md:w-64',
      ]"
    >
      <!-- Menu -->
      <Menu :model="menuItems" class="flex-1 p-2">
        <template #start>
          <div class="flex items-center h-14 mx-2 border-b border-gray-200">
            <span class="font-semibold"> (╥‸╥) </span>
            <span class="font-semibold ml-2 text-2xl text-gray-600 font-mono">
              trista
            </span>
            <!-- Close button (only on mobile) -->
            <Button
              v-if="isOpen"
              variant="text"
              severity="contrast"
              class="ml-auto md:hidden"
              @click="isOpen = false"
            >
              <i class="pi pi-times"></i>
            </Button>
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

    <!-- Page content -->
    <main class="flex-1 p-6 md:ml-64">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import { Button } from "primevue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();
const isOpen = ref(false);

const menuItems = ref([
  {
    label: "Dashboard",
    icon: "pi pi-home",
    command: () => router.push("/"),
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
