<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <RouterLink
            :to="{ name: 'register' }"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register account here
          </RouterLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <AlertComponent v-if="errorMsg" class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert" >
          <svg class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" ></path> </svg>
          <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
            {{ errorMsg }}
          </div>
          <span @click="errorMsg = null" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close" >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" ></path> </svg>
          </span>
        </AlertComponent>
        <!--input type="hidden" name="remember" value="true" /-->
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              v-model="LoginData.email"
              type="email"
              autocomplete="email"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              v-model="LoginData.password"
              type="password"
              autocomplete="current-password"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember"
              v-model="LoginData.remember"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit" :disabled="loading" :class="{'cursor-not-allowed hover:bg-indigo-400 bg-indigo-400' : loading}"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>

            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import AlertComponent from "../components/AlertComponent.vue";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import axiosClient from "../axiosClient";
/*
  Uses
*/
const userStore = useUserStore();
const router = useRouter();

/*
  Datas
*/
const LoginData = reactive({
  email: null,
  password: null,
  remember: false,
});

let errorMsg = ref("");

const loading = ref(false)
/*
  Methods
*/
const login = () => {
  errorMsg.value = "";
  loading.value = true
  userStore
    .login(LoginData)
    .then(() => {
      loading.value = false
      router.push({
        name: 'dashboard'
      })
    })
    .catch((err) => {
      loading.value = false
      typeof err.response.data.message != undefined && err.response.status === 422
        ? (errorMsg.value = err.response.data.message)
        : err.response.status === 500
        ? (errorMsg.value = "Something went wrong")
        : "";
      // console.log(err);
    });
};

watch(
  () => userStore.$state.authenticated,
  (newVal) => {
    if (newVal) {
      router.push({
        name: "dashboard",
      });
    }
  },
  { immediate: true }
);

//Aaron Meta1
</script>
