<script lang="ts">
import type {InjectionKey} from "vue";

export const modalKey: InjectionKey<{
  close: () => void;
}> = Symbol('modal')
</script>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const error = ref<null | string>(null)

onErrorCaptured((err) => {
  error.value = err.message
  return false
})

provide(modalKey, {
  close: () => emit('close')
})
</script>

<template>
  <div class="fixed inset-0 z-40 overflow-y-auto" @click="$emit('close')">
    <div class="fixed inset-0 z-40 bg-gray-800/75" />
    <div
      class="z-50 mt-10 mx-auto relative rounded-b shadow-lg bg-gray-700 max-w-lg w-full text-gray-100"
      @click.stop
    >
      <div v-if="error" class="mt-4 py-4 text-center text-red-500">
        Error:
        <br>
        {{ error }}
      </div>
      <Suspense v-else>
        <slot />

        <template #fallback>
          <div class="mt-4 py-4">
            <Spinner class="h-6 w-6 mx-auto" />
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
