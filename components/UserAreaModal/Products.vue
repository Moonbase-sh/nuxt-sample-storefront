<script setup lang="ts">
import { useInventory } from '@moonbase.sh/vue'
import ProductDownloads from '@/components/UserAreaModal/ProductDownloads.vue'

const { getProducts } = useInventory()

let response = await getProducts()
const products = response.items

// The products response is paginated, in this
// example we load everything before rendering.
while (response.hasMore && response.next) {
  response = await getProducts(response.next)
  products.push(...response.items)
}

const hasDownloads = products.some(p => p.downloads)
</script>

<template>
  <table class="min-w-full divide-y divide-gray-900 border-t border-gray-900 self-start">
    <thead class="bg-gray-800">
      <tr>
        <th
          scope="col"
          class="w-full py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6"
        >
          Product
        </th>
        <th
          v-if="hasDownloads"
          scope="col"
          class="px-3 py-3.5 text-right text-sm font-semibold text-gray-500"
        >
          Downloads
        </th>
      </tr>
    </thead>
    <tbody class="divide-y-2 divide-gray-800">
      <tr v-for="product in products" :key="product.id">
        <td
          class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6"
        >
          <div class="flex items-center">
            <div class="h-10 w-10 shrink-0">
              <img
                v-if="product.iconUrl"
                class="h-10 w-10 rounded"
                :src="product.iconUrl"
                alt=""
              >
              <div
                v-else
                class="flex h-full w-full items-center justify-center rounded border-2 border-dashed border-gray-500"
              />
            </div>
            <div class="ml-4">
              <div class="font-medium text-sm text-gray-100">
                {{ product.name }}
              </div>
            </div>
          </div>
        </td>
        <td
          v-if="hasDownloads"
          class="whitespace-nowrap px-3 py-4"
        >
          <div
            v-if="product.currentVersion != null"
            class="flex items-center justify-end gap-4"
          >
            <span class="text-gray-400 text-sm">
              Version {{ product.currentVersion }}
            </span>
            <ProductDownloads
              v-if="product.downloads"
              :downloads="product.downloads"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
