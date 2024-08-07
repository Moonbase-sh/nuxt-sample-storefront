<script setup lang="ts">
import type { CartItem } from '@moonbase.sh/vue'
import { useBundle, useCart, useProduct } from '@moonbase.sh/vue'

const props = defineProps<{
  cartItem: CartItem
}>()

const cart = useCart()

const itemName = computed(() => props.cartItem.type === 'Product'
  ? useProduct(props.cartItem.productId).value?.name
  : useBundle(props.cartItem.bundleId).value?.name)

function removeFromCart() {
  cart.removeFromCart(props.cartItem)
}
</script>

<template>
  <div class="flex items-center">
    <!-- <img class="w-12 h-12 rounded shadow overflow-hidden" :src="product.image" alt=""> -->
    <h3 class="flex-grow mx-2">
      {{ itemName }}
      <span v-if="cartItem.quantity > 1" class="text-gray-500">
        x{{ cartItem.quantity }}
      </span>
    </h3>
    <button
      class="text-sm text-red-600 py-1 px-2 transition-colors hover:bg-black hover:bg-opacity-30 rounded"
      @click="removeFromCart"
    >
      Remove
    </button>
  </div>
</template>
