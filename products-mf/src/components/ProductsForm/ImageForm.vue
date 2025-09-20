<template>
  <FileUpload
    name="demo[]"
    url="/api/upload"
    accept="image/*"
    @select="onSelectedFiles"
    :multiple="false"
    :fileLimit="1"
    :maxFileSize="1000000"
    class="h-72"
  >
    <template #empty>
      <!-- <span>Drag and drop files to here to upload.</span> -->
    </template>
    <template #header="{ chooseCallback, clearCallback, files }">
      <div
        class="w-full h-52 flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer"
        @click="chooseCallback"
      >
        <div v-if="existingImage">
          <div class="w-full h-full relative">
            <img :src="existingImage" alt="Preview" class="w-full h-full object-cover rounded" />
          </div>
        </div>
        <div v-else>
          <div v-if="files.length > 0" class="w-full h-full relative">
            <img
              :src="fileObjectURL(files[0])"
              alt="Preview"
              class="w-full h-full object-cover rounded"
            />
            <button
              @click.stop="clearCallback"
              class="absolute top-2 right-2 bg-red-400 text-white rounded-full p-1 h-7 w-7 hover:bg-red-600"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
          <div v-else class="flex flex-col items-center text-gray-400">
            <i class="pi pi-image mb-10" style="font-size: 4.5rem"></i>
            <p>{{ t('products_form.selectImage') }}</p>
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <div></div>
    </template>
  </FileUpload>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/stores/productStore'
import FileUpload from 'primevue/fileupload'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const productStore = useProductStore()
const existingImage = ref<string | null>(productStore.selectedProduct?.image_url || null)
console.log(existingImage.value)
const files = ref<File[]>([])

const onSelectedFiles = (event: { files: File[] }) => {
  files.value = event.files
  existingImage.value = null
  console.log(files.value[0])
}

const fileObjectURL = (file: File) => {
  return URL.createObjectURL(file)
}

defineExpose({
  files,
})
</script>
