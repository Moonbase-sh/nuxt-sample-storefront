<script setup lang="ts">
import type { StorefrontBundle } from '@moonbase.sh/vue'
import { useCart } from '@moonbase.sh/vue'

const props = defineProps<{
  bundle: StorefrontBundle
}>()

const cart = useCart()

function addToCart() {
  cart.addToCart(props.bundle)
}
</script>

<template>
  <div class="rounded-lg shadow-lg hover:shadow-xl max-w-prose overflow-hidden transition-shadow duration-500">
    <div class="aspect-square bg-blue-800">
      <img v-if="bundle.iconUrl" class="h-full w-auto mx-auto" :src="bundle.iconUrl" alt="">
    </div>
    <div class="flex p-4 items-center">
      <div class="flex-grow">
        <h2 class="pb-4 text-xl font-semibold text-gray-800">
          {{ bundle.name }}
        </h2>
        <p class="text-gray-700">
          {{ bundle.tagline }}
        </p>
      </div>
      <div class="flex flex-col items-center justify-around">
        <div class="pb-2 text-lg whitespace-nowrap">
          {{ bundle.defaultVariation ? formatCurrency(bundle.defaultVariation.price[cart.currency.value], cart.currency.value) : null }}
        </div>
        <button
          class="whitespace-nowrap py-2 px-4 rounded text-gray-100 transition-colors duration-500 bg-blue-800 hover:bg-blue-600"
          @click="addToCart()"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
