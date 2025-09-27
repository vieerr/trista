<script setup lang="ts">
import { AVMedia } from 'vue-audio-visual'
import { reactive, computed, defineProps, ref } from 'vue'
import { Dialog, Button } from 'primevue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const state = reactive({
  status: 'idle' as 'idle' | 'recording' | 'loading' | 'done' | 'processed',
  mediaStream: null as MediaStream | null,
  mediaRecorder: null as MediaRecorder | null,
  audioChunks: [] as BlobPart[],
  audioBlob: null as Blob | null,
})

// Nueva variable para almacenar la respuesta de la API
const apiResponse = ref<string>('')
const apiData = ref<any>(null)

const buttonLabel = computed(() => {
  switch (state.status) {
    case 'idle':
      return 'Empezar'
    case 'recording':
      return 'Detener'
    case 'loading':
      return 'Grabación lista'
    case 'done':
      return 'Reiniciar'
    case 'processed':
      return 'Nueva Grabación'
    default:
      return 'Start Recording'
  }
})

const buttonIcon = computed(() => {
  switch (state.status) {
    case 'idle':
      return 'pi pi-microphone'
    case 'recording':
      return 'pi pi-stop'
    case 'loading':
      return 'pi pi-check'
    case 'done':
    case 'processed':
      return 'pi pi-replay'
    default:
      return 'pi pi-microphone'
  }
})

// Función para procesar el audio (llamar a la API)
async function processAudio() {
  if (!state.audioBlob) return

  state.status = 'loading'
  const formData = new FormData()
  formData.append('audio', state.audioBlob, 'recording.webm')

  try {
    const response = await fetch('http://localhost:3000/process-audio', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Server response:', result)

    // Guardar la respuesta para debugging
    apiResponse.value = JSON.stringify(result, null, 2)
    apiData.value = result
    state.status = 'processed'
  } catch (error) {
    console.error('Error uploading audio:', error)
    apiResponse.value = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    state.status = 'done'
  }
}

// Función para iniciar/detener grabación (sin envío automático)
async function startStopRecording() {
  if (state.status === 'idle') {
    try {
      state.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      state.audioChunks = []
      state.mediaRecorder = new MediaRecorder(state.mediaStream)
      state.mediaRecorder.ondataavailable = (e) => state.audioChunks.push(e.data)
      state.mediaRecorder.onstop = () => {
        state.audioBlob = new Blob(state.audioChunks, { type: 'audio/webm' })
        state.status = 'done'
        console.log('Recording done, blob:', state.audioBlob)
        // Limpiar respuesta anterior
        apiResponse.value = ''
        apiData.value = null
      }
      state.mediaRecorder.start()
      state.status = 'recording'
    } catch (error) {
      console.error('Error accessing microphone:', error)
      state.status = 'idle'
    }
  } else if (state.status === 'recording') {
    state.status = 'loading'
    state.mediaRecorder?.stop()
    state.mediaStream?.getTracks().forEach((track) => track.stop())
  } else if (
    state.status === 'done' ||
    state.status === 'loading' ||
    state.status === 'processed'
  ) {
    // Reiniciar
    state.status = 'idle'
    state.audioBlob = null
    apiResponse.value = ''
    apiData.value = null
  }
}

// Función para facturar
function facturar() {
  console.log('Facturando con datos:', apiData.value)
  // Aquí iría la lógica para crear la factura
  alert('Factura creada exitosamente')
  closeModal()
}

// Función para editar
function editar() {
  console.log('Editando datos:', apiData.value)
  // Aquí iría la lógica para editar los datos extraídos
  // Por ahora, solo mostramos un mensaje
  alert('Modo edición - Aquí se podrían modificar los datos extraídos')
}

// Función para intentar de nuevo
function intentarDeNuevo() {
  state.status = 'idle'
  state.audioBlob = null
  apiResponse.value = ''
  apiData.value = null
}

// Función para cancelar
function cancelRecording() {
  if (state.status === 'recording') {
    state.mediaRecorder?.stop()
    state.mediaStream?.getTracks().forEach((track) => track.stop())
  }
  state.status = 'idle'
  state.audioBlob = null
  apiResponse.value = ''
  apiData.value = null
  emit('update:open', false)
}

function closeModal() {
  cancelRecording()
}
</script>

<template>
  <Dialog
    :visible="open"
    @update:visible="closeModal"
    modal
    header="Factura por Voz"
    class="w-full max-w-md rounded-xl shadow-2xl"
  >
    <span class="text-gray-500"> Mejorado con IA. </span>
    <div class="flex flex-col items-center justify-center space-y-12">
      <div class="flex items-center justify-center py-5">
        <div
          v-if="state.mediaStream && state.status !== 'processed'"
          class="flex items-center justify-center w-32 h-32 rounded-full bg-white-100 shadow-sm border-1 border-gray-400 relative overflow-hidden"
        >
          <AVMedia
            :media="state.mediaStream"
            :line-width="2"
            :line-color="'#10b981'"
            type="frequ"
            :canv-height="128"
            :canv-width="128"
            frequ-direction="mo"
          />
        </div>
        <div
          v-else-if="state.status === 'processed'"
          class="flex items-center justify-center w-32 h-32 rounded-full bg-green-100 border-2 border-green-400"
        >
          <i class="pi pi-check text-green-600" style="font-size: 2rem"></i>
        </div>
        <div
          v-else
          class="flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-400"
        >
          <i class="pi pi-microphone text-gray-400" style="font-size: 2rem"></i>
        </div>
      </div>

      <!-- Botones durante grabación/procesamiento -->
      <div v-if="state.status !== 'processed'" class="flex flex-col space-y-4 w-full">
        <div class="flex justify-center space-x-4">
          <Button
            size="small"
            :label="buttonLabel"
            :icon="buttonIcon"
            :disabled="state.status === 'loading'"
            @click="startStopRecording"
          />

          <!-- Botón de procesar (solo visible cuando hay audio grabado) -->
          <Button
            size="small"
            v-if="state.status === 'loading' || state.status === 'done'"
            label="Procesar Audio"
            icon="pi pi-send"
            @click="processAudio"
            :disabled="state.status === 'loading' && apiResponse === ''"
          />

          <!-- Botón de cancelar -->
          <Button
            size="small"
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            @click="cancelRecording"
          />
        </div>
      </div>

      <!-- Botones cuando hay respuesta de la API -->
      <div v-if="state.status === 'processed'" class="flex flex-col space-y-4 w-full">
        <div class="text-center mb-4">
          <h3 class="font-semibold text-green-600">¡Audio procesado exitosamente!</h3>
          <p class="text-sm text-gray-600">Se han extraído los datos de la factura</p>
        </div>

        <div class="grid grid-cols-3 max-h-18 gap-2">
          <Button outlined size="small" label="Editar" icon="pi pi-pencil" @click="editar" />

          <Button
            size="small"
            outlined
            label="Intentar de nuevo"
            icon="pi pi-refresh"
            severity="secondary"
            @click="intentarDeNuevo"
          />
          <Button
            outlined
            size="small"
            label="Cancelar"
            icon="pi pi-times"
            severity="danger"
            @click="cancelRecording"
          />
        </div>
        <Button
          size="small"
          label="Facturar"
          icon="pi pi-file-pdf"
          severity="success"
          @click="facturar"
        />
      </div>

      <!-- Área de debugging para mostrar la respuesta de la API -->
      <div v-if="apiResponse" class="w-full mt-4 p-3 bg-gray-100 rounded-lg">
        <h3 class="font-semibold text-gray-700 mb-2">Respuesta de la API (Debug):</h3>
        <pre class="text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-40">{{
          apiResponse
        }}</pre>
      </div>
    </div>
  </Dialog>
</template>
