<script setup lang="ts">
import { useCart } from '@moonbase.sh/vue'
import { formatCurrency } from '@/utils/formatCurrency'

const { items, total, checkout } = useCart()
const checkingOut = ref(false)
</script>

<template>
  <div class="rounded-b shadow-lg flex flex-col bg-gray-700 p-3 max-w-xs w-full z-10 text-gray-100">
    <h2 class="inline self-center text-lg pb-2 px-4 mb-2 border-b-2 border-gray-400">
      Cart
    </h2>
    <span v-if="items.length === 0" class="text-center py-3 italic text-gray-500">
      No products in cart
    </span>
    <CartItem
      v-for="item in items"
      :key="item.id"
      :cart-item="item"
    />
    <div v-if="items.length > 0" class="w-full mt-4 p-2 rounded bg-gray-800 text-gray-100 grid grid-cols-2 justify-between">
      <label class="text-blue-500 font-semibold text-lg">Total</label>
      <span class="text-blue-500 font-semibold text-lg text-right">{{ formatCurrency(total.amount, total.currency) }}</span>
      <span class="col-span-2 pt-2 text-gray-400 text-sm text-center">
        Sales tax to be calculated at checkout
      </span>
    </div>
    <button
      v-if="items.length > 0"
      class="mt-2 border-gray-100 flex items-center justify-center disabled:border-gray-200 border-2 rounded text-gray-100 disabled:test-gray-200 w-full text-center py-2 font-semibold transition-colors hover:bg-blue-800 hover:text-blue-100 disabled:hover:bg-blue-900 disabled:hover:text-blue-200"
      :disabled="checkingOut"
      @click="checkout('/')"
    >
      <Spinner v-if="checkingOut" class="mr-2 h-4 w-4" />
      Checkout
    </button>
  </div>
</template>
