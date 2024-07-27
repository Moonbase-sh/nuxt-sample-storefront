<script setup lang="ts">
import { useBundles, useProducts } from '@moonbase.sh/vue'

const bundles = useBundles()
const products = useProducts()
</script>

<template>
  <div class="grid grid-cols-3 gap-4 max-w-screen-lg">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
    <BundleCard v-for="bundle in bundles" :key="bundle.id" :bundle="bundle" />
  </div>
</template>
