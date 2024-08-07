<script setup lang="ts">
import { useAuth, useCart } from '@moonbase.sh/vue'
import { useQueryParameter } from '~/utils/useQueryParameter'

useHead({
  title: 'Moonbase Sample Store',
})

const route = useRoute()
const { user, loaded: userHasBeenLoaded } = useAuth()
const { items } = useCart()

const cartOpen = ref(false)
const loggingIn = ref(false)
const confirmingAccount = ref(false)
const resettingPassword = ref(false)
const autoActivating = ref(false)
const userAreaOpen = ref(false)

watch(items, (newCart) => {
  if (newCart.length > 0) {
    // If there are any items in the cart when it changes, open it
    cartOpen.value = true
  }
}, {
  deep: true,
})

watch(user, (newUser) => {
  if (!newUser && userAreaOpen)
    userAreaOpen.value = false

  if (newUser && loggingIn.value)
    loggingIn.value = false
})

onMounted(() => {
  // This simple storefront example also handles some
  // critical user flows like account confirmation, etc.
  // Normally, you will probably have separate routes
  // for the different views, but here we simplify.
  if (route.fullPath.startsWith('/sign-in') && !user.value) {
    loggingIn.value = true
  }
  else if (route.fullPath.startsWith('/confirm-account')) {
    confirmingAccount.value = true
  }
  else if (route.fullPath.startsWith('/reset-password')) {
    resettingPassword.value = true
  }
  else if (route.fullPath.startsWith('/auto-activate')) {
    autoActivating.value = true
  }
})
</script>

<template>
  <div class="w-full shadow z-30">
    <header class="grid grid-cols-3 justify-between items-center max-w-screen-md mx-auto relative">
      <svg viewBox="0 0 512 512" class="h-12 w-12 py-2">
        <g>
          <path
            fill="currentColor"
            d="m493.17795,174.6135c6.257,75.3 -30.577,150.948 -100.579,190.758c-66.292,37.697 -145.001,33.405 -205.402,-4.415c0.409,-1.248 0.638,-2.577 0.638,-3.96c0,-7.026 -5.717,-12.743 -12.743,-12.743c-2.876,0 -5.524,0.969 -7.659,2.582c-18.813,-15.259 -35.159,-34.207 -47.856,-56.534c-54.663,-96.122 -21.054,-218.358 75.069,-273.021a201.218,201.218 0 0 1 33.302,-15.124c-32.428,3.667 -64.663,13.809 -94.827,30.962c-104.526,59.443 -149.511,183.241 -113.473,293.249c-3.376,3.057 -5.513,7.459 -5.513,12.362c0,9.207 7.491,16.698 16.698,16.698c0.136,0 0.267,-0.017 0.401,-0.02a252.205,252.205 0 0 0 8.683,16.691c67.869,119.344 219.635,161.073 338.98,93.204a250.416,250.416 0 0 0 32.893,-22.333c1.045,0.331 2.157,0.513 3.311,0.513c6.047,0 10.968,-4.921 10.968,-10.968c0,-0.605 -0.063,-1.196 -0.157,-1.775c69.545,-64.988 96.008,-165.054 67.266,-256.126m-446.526,25.112a5.071,5.071 0 0 1 -5.066,-5.066a5.072,5.072 0 0 1 5.066,-5.067a5.073,5.073 0 0 1 5.066,5.067a5.072,5.072 0 0 1 -5.066,5.066m-15.819,153.944c-8.238,0 -14.94,-6.702 -14.94,-14.94c0,-8.239 6.702,-14.941 14.94,-14.941c8.239,0 14.941,6.702 14.941,14.941c-0.001,8.238 -6.703,14.94 -14.941,14.94m144.258,-7.659c6.057,0 10.985,4.928 10.985,10.986c0,6.058 -4.928,10.985 -10.985,10.985c-6.058,0 -10.986,-4.928 -10.986,-10.985c0.001,-6.059 4.928,-10.986 10.986,-10.986m70.829,133.004c-5.079,0 -9.21,-4.132 -9.21,-9.21c0,-5.079 4.131,-9.21 9.21,-9.21c5.078,0 9.209,4.131 9.209,9.21c0,5.078 -4.13,9.21 -9.209,9.21m169.18,-37.289c-5.078,0 -9.209,-4.132 -9.209,-9.21s4.131,-9.209 9.209,-9.209s9.21,4.131 9.21,9.209s-4.132,9.21 -9.21,9.21"
          />
          <path
            fill="currentColor"
            d="m144.78195,275.9675c46.746,82.201 151.278,110.943 233.48,64.197c59.864,-34.044 91.363,-98.736 86.013,-163.13a170.094,170.094 0 0 0 -5.515,-31.052c-23.045,0.567 -63.864,10.137 -104.194,61.671c-52.045,66.5 -186.285,49.153 -228.855,17.372c3.503,17.443 9.796,34.632 19.071,50.942m233.513,-65.677a8.663,8.663 0 1 1 -8.663,8.663a8.662,8.662 0 0 1 8.663,-8.663m-37.006,62.618c7.02,0 12.712,5.691 12.712,12.712s-5.692,12.712 -12.712,12.712c-7.021,0 -12.712,-5.691 -12.712,-12.712s5.691,-12.712 12.712,-12.712m-102.544,12.712a6.78,6.78 0 1 1 0,13.56a6.78,6.78 0 0 1 0,-13.56"
          />
          <ellipse fill="currentColor" ry="7.3075" rx="7.3075" cy="152.05851" cx="251.33138" />
          <ellipse fill="currentColor" ry="5.35076" rx="5.35076" cy="210.31151" cx="204.89499" />
          <ellipse fill="currentColor" ry="12.09273" rx="12.09273" cy="200.15625" cx="302.28597" />
        </g>
      </svg>
      <h1 class="text-center">
        Moonbase.sh Sample Store
      </h1>
      <div class="justify-self-end h-full">
        <!--
          The user authentication is only relevant client side,
          since the server will not know the local state
          of the customer.
        -->
        <ClientOnly>
          <button
            v-if="!user && userHasBeenLoaded" class="h-full px-4 focus:outline-none transition-colors duration-300" :class="{
              'bg-gray-700 text-gray-300 hover:bg-gray-800': loggingIn,
              'hover:bg-black hover:bg-opacity-30': !loggingIn,
            }" @click="loggingIn = !loggingIn"
          >
            Log in
          </button>
          <button
            v-else-if="user"
            class="h-full px-4 focus:outline-none transition-colors duration-300 hover:bg-black hover:bg-opacity-30"
            @click="userAreaOpen = !userAreaOpen"
          >
            {{ user.name }}
          </button>
        </ClientOnly>
        <button
          class="h-full px-4 focus:outline-none transition-colors duration-300" :class="{
            'bg-gray-700 text-gray-300 hover:bg-gray-800': cartOpen,
            'hover:bg-black hover:bg-opacity-30': !cartOpen,
          }" @click="cartOpen = !cartOpen"
        >
          Cart
        </button>
        <!--
          The cart dropdown is only relevant client side,
          since the server will not know the local state
          of the customer.
        -->
        <ClientOnly>
          <Suspense>
            <CartDropdown
              class="absolute bottom-0 right-0 transition duration-300 transform translate-y-full" :class="{
                'opacity-100 visible': cartOpen,
                'opacity-0 invisible': !cartOpen,
              }"
            />
          </Suspense>
        </ClientOnly>
      </div>
    </header>
  </div>
  <main class="w-full flex justify-center p-4 md:p-8">
    <Suspense>
      <ProductList />
    </Suspense>
  </main>

  <!-- This app has a number of modals that are conditionally visible. -->
  <!-- To keep this implementation simple, we just control them all here. -->

  <SimpleModal v-if="loggingIn" @close="loggingIn = false">
    <SignIn />
  </SimpleModal>

  <SimpleModal v-if="userAreaOpen" @close="userAreaOpen = false">
    <UserArea />
  </SimpleModal>

  <SimpleModal v-if="confirmingAccount" @close="confirmingAccount = false">
    <ConfirmAccount
      :email="useQueryParameter('email')"
      :code="useQueryParameter('code')"
    />
  </SimpleModal>

  <SimpleModal v-if="resettingPassword" @close="resettingPassword = false">
    <ResetPassword
      :email="useQueryParameter('email')"
      :code="useQueryParameter('code')"
    />
  </SimpleModal>

  <SimpleModal v-if="autoActivating" @close="autoActivating = false">
    <AutoActivate
      :token="useQueryParameter('token')"
    />
  </SimpleModal>
</template>
