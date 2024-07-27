<script setup lang="ts">
import { useAuth } from '@moonbase.sh/vue'
import Account from '@/components/UserAreaModal/Account.vue'
import Products from '@/components/UserAreaModal/Products.vue'
import Licenses from '@/components/UserAreaModal/Licenses.vue'
import Redeem from '@/components/UserAreaModal/Redeem.vue'

defineEmits<{
  (e: 'close'): void
}>()

const { user } = useAuth()

const views = [
  {
    title: 'Account',
    component: Account,
  },
  {
    title: 'Products',
    component: Products,
  },
  {
    title: 'Licenses',
    component: Licenses,
  },
  {
    title: 'Redeem',
    component: Redeem,
  },
]

const activeView = shallowRef(views[0])
</script>

<template>
  <div class="fixed inset-0 z-40 overflow-y-auto" @click="$emit('close')">
    <div class="fixed inset-0 z-40 bg-gray-800/75" />
    <div
      class="z-50 mt-10 mx-auto relative rounded-b shadow-lg flex flex-col bg-gray-700 pt-4 max-w-lg w-full text-gray-100"
      @click.stop
    >
      <h2 class="inline self-center text-lg pb-2 px-4 border-b-2 border-gray-400">
        Hello <strong>{{ user?.name }}</strong>
      </h2>

      <div class="grid grid-cols-4 mt-4">
        <button
          v-for="view in views"
          :key="view.title"
          class="py-3 whitespace-nowrap text-gray-400 data-[active=true]:text-gray-100 data-[active=true]:underline w-full hover:text-gray-200 transition-colors duration-200"
          :data-active="activeView.title === view.title"
          @click="activeView = view"
        >
          {{ view.title }}
        </button>
      </div>

      <Suspense :key="activeView.title">
        <component :is="activeView.component" class="mt-4" />

        <template #fallback>
          <div class="mt-4 py-4">
            <Spinner class="h-6 w-6 mx-auto" />
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
