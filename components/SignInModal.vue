<script setup lang="ts">
import { useAuth } from '@moonbase.sh/vue'
import Spinner from '@/components/Spinner.vue'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const { signIn } = useAuth()

const username = ref('')
const password = ref('')

const error = ref<string | null>(null)
const working = ref(false)

async function logIn() {
  error.value = null
  working.value = true
  try {
    await signIn(username.value, password.value)
    emits('close')
  }
  catch (err) {
    error.value = (err as Error).message
  }
  finally {
    working.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-40 overflow-y-auto" @click="$emit('close')">
    <div class="fixed inset-0 z-40 bg-gray-800/75" />
    <form
      class="space-y-6 z-50 mt-10 mx-auto relative rounded-b shadow-lg flex flex-col bg-gray-700 py-4 px-8 max-w-lg w-full text-gray-100"
      @click.stop
      @submit.prevent="logIn"
    >
      <h2 class="inline self-center text-lg pb-2 px-4 border-b-2 border-gray-400">
        Log in
      </h2>

      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-white"
        >
          Email address
        </label>
        <div class="mt-2">
          <input
            id="email"
            v-model="username"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-6 text-white"
        >
          Password
        </label>
        <div class="mt-2">
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div v-if="error" class="text-center font-medium text-red-400 leading-6">
        {{ error }}
      </div>

      <div class="mt-8 flex justify-center">
        <button
          type="submit"
          class="rounded-md flex items-center whitespace-nowrap bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          :disabled="working"
        >
          <Spinner v-if="working" class="mr-2 h-4 w-4" />
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>
