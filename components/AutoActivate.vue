<script setup lang="ts">
import {useActivationRequest, useAuth} from '@moonbase.sh/vue'

const props = defineProps<{
  token: string;
}>()

const { user, loaded: userLoaded } = useAuth()
const {
  loading,
  error,
  activationRequest,
  isInstalled,
  fulfillLicense,
  fulfillTrial
} = useActivationRequest(props.token)

const fulfilled = ref(false)
</script>

<template>
  <div v-if="loading || !userLoaded" class="flex justify-center py-8">
    <Spinner class="h-6 w-6" />
  </div>
  <div v-else-if="isInstalled" class="flex justify-center py-8">
    <span>Done!</span>
  </div>
  <div
    v-else-if="activationRequest && !fulfilled"
    class="space-y-6 flex flex-col py-4 px-8"
  >
    <h2 class="inline self-center text-lg pb-2 px-4 border-b-2 border-gray-400">
      Activate <strong>{{ activationRequest.product.name }}</strong>
    </h2>

    <!--  Trial activation  -->
    <div v-if="activationRequest.trialEligibility?.eligible" class="flex flex-col items-center space-y-4">
      <span class="text-gray-200 text-sm">
        You are eligible to start a {{ activationRequest.trialEligibility.numberOfDaysRemaining }} day trial
      </span>

      <span v-if="!user && activationRequest.trialEligibility.requiresAccount">
        Please sign in to activate trial
        <!-- TODO: Just embed the login form here -->
      </span>
      <button
        v-else
        type="button"
        @click="(fulfilled = true) && fulfillTrial()"
        class="rounded-md flex items-center whitespace-nowrap bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Start trial
      </button>
    </div>

    <!--  License activation  -->
    <div v-if="!user" class="text-center">
      Please sign in to use license
    </div>
    <div v-else-if="activationRequest.licenseEligibility?.eligible" class="flex flex-col items-center space-y-4">
      <span class="text-gray-200 text-sm">
        You have a license to use for this product
      </span>

      <button
        type="button"
        @click="(fulfilled = true) && fulfillLicense()"
        class="rounded-md flex items-center whitespace-nowrap bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Use license
      </button>
    </div>

    <div v-if="error" class="text-center font-medium text-red-400 leading-6">
      {{ error }}
    </div>
  </div>
  <div v-else-if="fulfilled && !isInstalled" class="flex justify-center py-8">
    <Spinner class="h-6 w-6 mr-4" />
    <span>Activating software..</span>
  </div>
</template>
