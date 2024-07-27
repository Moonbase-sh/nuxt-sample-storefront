<script setup lang="ts">
import { useAuth } from '@moonbase.sh/vue'
import { ref } from 'vue'
import Spinner from '@/components/Spinner.vue'

const { user, update, setPassword, signOut } = useAuth()

const name = ref<string>(user.value?.name ?? '')
const email = ref<string>(user.value?.email ?? '')
const communicationPreferences = ref(user.value?.communicationPreferences ?? {
  newsletterOptIn: false,
})

const saving = ref(false)
const error = ref<Error | null>(null)
const emailNeedsConfirmation = ref(false)

const oldPassword = ref<string>('')
const newPassword = ref<string>('')

const passwordChangeSaving = ref(false)
const passwordChangeError = ref<Error | null>(null)

const loggingOut = ref(false)

async function save() {
  saving.value = true
  error.value = null

  try {
    const result = await update(name.value, email.value, undefined, communicationPreferences.value)
    if (result.needsEmailConfirmationToken)
      emailNeedsConfirmation.value = true
  }
  catch (err) {
    error.value = err as Error
  }

  saving.value = false
}

async function changePassword() {
  passwordChangeSaving.value = true
  passwordChangeError.value = null
  try {
    await setPassword(oldPassword.value, newPassword.value)

    oldPassword.value = ''
    newPassword.value = ''
  }
  catch (err) {
    passwordChangeError.value = err as Error
  }

  passwordChangeSaving.value = false
}

async function logOut() {
  loggingOut.value = true
  await signOut()
}
</script>

<template>
  <div class="space-y-8 pb-8">
    <form
      class="space-y-6 mx-auto max-w-md"
      @submit.prevent="save"
    >
      <div>
        <label for="name" class="block text-sm font-medium text-white">
          Name
        </label>
        <div class="mt-1">
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            autocomplete="name"
            required
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-white">
          Name
        </label>
        <div class="mt-1">
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

      <div class="relative flex items-start">
        <div class="flex h-6 items-center">
          <input id="newsletter-opt-in" v-model="communicationPreferences.newsletterOptIn" aria-describedby="newsletter-opt-in-description" name="newsletter-opt-in" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600">
        </div>
        <div class="ml-3 text-sm leading-6">
          <label for="newsletter-opt-in" class="font-medium text-gray-100">Newsletter subscription</label>
          <p id="newsletter-opt-in-description" class="text-gray-400">
            Receive updates and offers by email
          </p>
        </div>
      </div>

      <button
        type="submit"
        class="rounded-md flex items-center whitespace-nowrap bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        :disabled="saving"
      >
        <Spinner v-if="saving" class="mr-2 h-4 w-4" />
        Save
      </button>

      <div v-if="error" class="flex items-center justify-center gap-2">
        <p class="text-sm font-semibold text-red-400">
          {{ error.message }}
        </p>
      </div>
    </form>

    <form
      class="space-y-6 mx-auto max-w-md"
      @submit.prevent="changePassword"
    >
      <div>
        <label for="old-password" class="block text-sm font-medium text-white">
          Current password
        </label>
        <div class="mt-1">
          <input
            id="old-password"
            v-model="oldPassword"
            name="old-password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label for="new-password" class="block text-sm font-medium text-white">
          New password
        </label>
        <div class="mt-1">
          <input
            id="new-password"
            v-model="newPassword"
            name="new-password"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <button
        type="submit"
        class="rounded-md flex items-center whitespace-nowrap bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        :disabled="passwordChangeSaving"
      >
        <Spinner v-if="passwordChangeSaving" class="mr-2 h-4 w-4" />
        Save
      </button>

      <div v-if="passwordChangeError" class="flex items-center justify-center gap-2">
        <p class="text-sm font-semibold text-red-400">
          {{ passwordChangeError.message }}
        </p>
      </div>
    </form>

    <button
      type="button"
      class="rounded-md mx-auto flex items-center whitespace-nowrap bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      :disabled="loggingOut"
      @click="logOut"
    >
      <Spinner v-if="loggingOut" class="mr-2 h-4 w-4" />
      Sign out
    </button>
  </div>
</template>
