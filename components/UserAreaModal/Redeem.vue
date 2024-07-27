<script setup lang="ts">
import { ref } from 'vue'
import type { Voucher } from '@moonbase.sh/vue'
import { useVoucher } from '@moonbase.sh/vue'
import Spinner from '@/components/Spinner.vue'

const { redeem } = useVoucher()

const redeeming = ref(false)

const voucher = ref<Voucher | null>(null)
const error = ref<Error | null>(null)
const code = ref('')

async function tryRedeem() {
  redeeming.value = true
  error.value = null

  try {
    voucher.value = await redeem(code.value)
  }
  catch (e) {
    error.value = e as Error
  }

  redeeming.value = false
}
</script>

<template>
  <div>
    <transition
      mode="out-in"
      enter-active-class="transform transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-8"
      enter-to-class="opacity-100"
      leave-active-class="transform transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -translate-x-8"
    >
      <div v-if="!voucher" class="space-y-4 p-4 flex flex-col items-center w-full">
        <form class="space-y-6 mx-auto max-w-md" @submit.prevent="tryRedeem">
          <div>
            <label for="code" class="block text-sm font-medium text-white">
              Voucher code
            </label>
            <div class="mt-1">
              <input
                id="code"
                v-model="code"
                name="code"
                type="text"
                required
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              >
            </div>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              class="rounded-md flex items-center whitespace-nowrap bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              :disabled="redeeming"
            >
              <Spinner v-if="redeeming" class="mr-2 h-4 w-4" />
              Redeem
            </button>
          </div>
        </form>

        <div v-if="error" class="flex items-center justify-center gap-2">
          <p class="text-sm font-semibold text-red-400">
            {{ error.message }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-center w-full p-4"
      >
        <div
          class="mx-auto mb-8 mt-1 max-w-sm space-y-2 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm"
        >
          <h3 class="text-lg font-medium text-gray-900">
            You got: <strong>{{ voucher.name }}</strong>
          </h3>
          <h4 v-if="voucher.description" class="text-sm font-medium text-gray-700">
            {{ voucher.description }}
          </h4>
          <h4 class="text-sm font-medium text-gray-800">
            Code: <strong class="font-bold">{{ voucher.code }}</strong>
          </h4>

          <div v-if="voucher.redeemsProducts.length > 0">
            <span class="font-semibold text-gray-700">
              Contains:
            </span>

            <div class="divide-y divide-gray-200">
              <div
                v-for="{ value, quantity } in voucher.redeemsProducts" :key="value.id"
                class="flex items-center space-x-3 py-2"
              >
                <div class="shrink-0">
                  <img v-if="value.iconUrl" class="h-10 w-10 rounded" :src="value.iconUrl" alt="">
                  <div
                    v-else
                    class="flex h-10 w-10 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    {{ value.name }} <span v-if="quantity !== 1">x {{ quantity }}</span>
                  </p>
                  <p class="truncate text-sm text-gray-500">
                    {{ value.tagline }}
                  </p>
                </div>
              </div>

              <div v-for="{ value, quantity } in voucher.redeemsBundles" :key="value.id" class="py-2">
                <div class="flex items-center space-x-3">
                  <div class="shrink-0">
                    <img v-if="value.iconUrl" class="h-10 w-10 rounded" :src="value.iconUrl" alt="">
                    <div
                      v-else
                      class="flex h-10 w-10 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900">
                      {{ value.name }} <span v-if="quantity !== 1">x {{ quantity }}</span>
                    </p>
                    <p class="truncate text-sm text-gray-500">
                      {{ value.tagline }}
                    </p>
                  </div>
                </div>
                <div class="divide-y divide-gray-200 pl-8">
                  <div v-for="product in value.products" :key="product.id" class="flex items-center space-x-3 py-2">
                    <div class="shrink-0">
                      <img v-if="product.iconUrl" class="h-10 w-10 rounded" :src="product.iconUrl" alt="">
                      <div
                        v-else
                        class="flex h-10 w-10 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900">
                        {{ product.name }}
                      </p>
                      <p class="truncate text-sm text-gray-500">
                        {{ product.tagline }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
