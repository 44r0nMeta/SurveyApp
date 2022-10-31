<template>
  <div
    v-if="notification.show"
    class="
      fixed
      w-[300px]
      left-4
      bottom-4
      py-3
      px-5
      text-white
      animate-fade-in-down
    "
    :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
  >
    {{ notification.message }}
  </div>
</template>

<script setup>
/*
  Imports
*/

import { useSurveyStore } from "../stores/surveyStore";
import { computed } from "vue";

const surveyStore = useSurveyStore();

const notification = computed(() => {
  return surveyStore.$state.notification;
});

</script>
