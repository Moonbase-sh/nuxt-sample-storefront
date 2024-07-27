<script setup lang="ts">
import type { Download } from '@moonbase.sh/vue'
import { useInventory } from '@moonbase.sh/vue'

defineProps<{
  downloads: Download[]
}>()

// We use the `downloadProduct`
const { downloadProduct } = useInventory()
</script>

<template>
  <span>
    <button
      v-for="download in downloads"
      :key="download.key"
      class="-mx-px text-sm items-center bg-blue-500 p-2 text-gray-100 ring-1 ring-inset ring-blue-700 transition first:rounded-l-md last:rounded-r-md hover:bg-blue-600 focus:z-10"
      @click="downloadProduct(download)"
    >
      {{ download.platform }}
    </button>
  </span>
</template>
