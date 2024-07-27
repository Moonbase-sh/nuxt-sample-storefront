<script setup lang="ts">
import { useInventory } from '@moonbase.sh/vue'
import { ref } from 'vue'
import Spinner from '@/components/Spinner.vue'
import LicenseActivations from '@/components/UserAreaModal/LicenseActivations.vue'

const { getLicenses } = useInventory()

let response = await getLicenses()
const licenses = ref(response.items)

// The licenses response is paginated, in this
// example we load everything before rendering.
while (response.hasMore && response.next) {
  response = await getLicenses(response.next)
  licenses.value.push(...response.items)
}

const inspectingActivationsForLicenseId = ref<string | null>(null)
</script>

<template>
  <table class="min-w-full divide-y divide-gray-900 border-t border-gray-900 self-start">
    <thead class="bg-gray-800">
      <tr>
        <th
          scope="col"
          class="w-full py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-6"
        >
          License
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-right text-sm font-semibold text-gray-500"
        >
          Activations
        </th>
      </tr>
    </thead>
    <tbody class="divide-y-2 divide-gray-800">
      <tr v-for="license in licenses" :key="license.id" class="relative">
        <td
          class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6"
        >
          <div class="flex items-center">
            <div class="h-10 w-10 shrink-0">
              <img
                v-if="license.product.iconUrl"
                class="h-10 w-10 rounded"
                :src="license.product.iconUrl"
                alt=""
              >
              <div
                v-else
                class="flex h-full w-full items-center justify-center rounded border-2 border-dashed border-gray-500"
              />
            </div>
            <div class="ml-4">
              <div class="font-medium text-sm text-gray-100">
                1 x {{ license.product.name }}
              </div>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
          <button
            class="text-blue-400"
            @click="inspectingActivationsForLicenseId = inspectingActivationsForLicenseId === license.id ? null : license.id"
          >
            {{ license.activeNumberOfActivations }} of
            {{ license.maxNumberOfActivations }} devices activated
          </button>
          <div
            v-if="inspectingActivationsForLicenseId === license.id"
            class="absolute inset-x-4 -bottom-2 translate-y-full bg-gray-900 z-10 rounded-lg overflow-hidden shadow"
          >
            <Suspense>
              <LicenseActivations :license-id="license.id" @revoked="license.activeNumberOfActivations--" />

              <template #fallback>
                <div class="py-4">
                  <Spinner class="h-5 w-5 mx-auto" />
                </div>
              </template>
            </Suspense>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
