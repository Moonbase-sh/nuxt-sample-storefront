<script setup lang="ts">
import { useAuth } from '@moonbase.sh/vue'

const { forgotPassword } = useAuth()

const email = ref('')
const error = ref<string | null>(null)
const working = ref(false)
const done = ref(false)

async function resetPassword() {
  error.value = null
  working.value = true

  try {
    await forgotPassword(email.value)
    done.value = true
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
  <form
    v-if="!done"
    class="space-y-6 flex flex-col py-4 px-8"
    @submit.prevent="resetPassword"
  >
    <h2 class="inline self-center text-lg pb-2 px-4 border-b-2 border-gray-400">
      Forgot your password?
    </h2>

    <div>
      <label
        for="email"
        class="block text-sm font-medium leading-6 text-white"
      >
        Enter your email to reset password:
      </label>
      <div class="mt-2">
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
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
        Reset password
      </button>
    </div>
  </form>
  <div v-else class="py-6 text-center">
    Done, an email is heading your way
  </div>
</template>
