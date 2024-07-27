<script setup lang="ts">
import type { Activation } from '@moonbase.sh/vue'
import { ActivationMethod, useInventory } from '@moonbase.sh/vue'
import { computed, ref } from 'vue'
import Spinner from '@/components/Spinner.vue'

type RevokableActivation = Activation & { revoking: boolean }

const props = defineProps<{
  licenseId: string
}>()

const emit = defineEmits<{
  (e: 'revoked', activation: Activation): void
}>()

const { getLicenseActivations, revokeActivation } = useInventory()

let response = await getLicenseActivations(props.licenseId)
const activations = ref<RevokableActivation[]>(response.items.map(a => ({ ...a, revoking: false })))

// The activations response is paginated, in this
// example we load everything before rendering.
while (response.hasMore && response.next) {
  response = await getLicenseActivations(props.licenseId, response.next)
  activations.value.push(...response.items.map(a => ({ ...a, revoking: false })))
}

// Only online activated devices will ever be revokable
const hasRevokableActivations = computed(() => activations.value.some(a => a.activationMethod === ActivationMethod.Online))

async function revoke(activation: RevokableActivation) {
  activation.revoking = true
  await revokeActivation(activation)
  emit('revoked', activation)
  activations.value.splice(activations.value.indexOf(activation), 1)
}
</script>

<template>
  <table v-if="activations.length > 0" class="min-w-full divide-y divide-gray-900 border-t border-gray-900 self-start">
    <thead class="bg-gray-800">
      <tr>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"
        >
          Device
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-center text-sm font-semibold text-gray-500"
        >
          Activation Method
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-center text-sm font-semibold text-gray-500"
        >
          Last Online
        </th>
        <th
          v-if="hasRevokableActivations"
          scope="col"
          class="px-3 py-3.5 text-center text-sm font-semibold text-gray-500"
        >
          <span class="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y-2 divide-gray-800">
      <tr v-for="activation in activations" :key="activation.id">
        <td
          class="whitespace-nowrap px-3 py-4"
        >
          {{ activation.name }}
        </td>
        <td
          class="whitespace-nowrap text-center px-3 py-4"
        >
          {{ activation.activationMethod }}
        </td>
        <td
          class="whitespace-nowrap text-center px-3 py-4"
        >
          {{ activation.lastValidatedAt?.toLocaleDateString() }}
        </td>
        <td
          v-if="hasRevokableActivations"
          class="whitespace-nowrap text-right px-3 py-4"
        >
          <button
            class="text-red-400 flex whitespace-nowrap items-center"
            @click="revoke(activation)"
          >
            <Spinner v-if="activation.revoking" class="h-4 w-4 mr-2" />
            Revoke
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="p-4 text-center">
    No activations found
  </div>
</template>
