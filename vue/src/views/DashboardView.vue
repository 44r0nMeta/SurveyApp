<template>
  <PageComponent>
    <template v-slot:header>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    </template>
    <template v-slot:default>
      <div v-if="loading" class="flex justify-center">Loading...</div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-down text-gray-700"
      >
        <div
          class="bg-white shadow-md p-3 text-center flex flex-col order-1 animate-fade-in-down lg:order-2"
          style="animation-delay: 0.1s"
        >
          <h3 class="text-2xl font-semibold">Total Surveys</h3>
          <div class="text-6xl font-semibold flex-1 flex items-center justify-center">
            {{ data?.totalSurveys }}
          </div>
        </div>
        <div
          class="bg-white shadow-md p-3 text-center flex flex-col order-2 animate-fade-in-down lg:order-4 animation-delay: 0.2s"
        >
          <h3 class="text-2xl font-semibold">Total Answers</h3>
          <div class="text-6xl font-semibold flex-1 flex items-center justify-center">
            {{ data?.totalAnswers }}
          </div>
        </div>
        <div
          class="row-span-2 bg-white shadow-md p-4 order-3 animate-fade-in-down lg:order-1"
        >
          <h3 class="text-2xl font-semibold">Latest Survey</h3>
          <img
            :src="data?.latestSurvey?.image_url"
            alt="latest_survey"
            class="w-[240]px"
          />
          <h3 class="font-bold text-xl mb-3">
            {{ data?.latestSurvey?.title }}
          </h3>
          <div class="flex justify-between text-sm mb-1">
            <div>Create Date:</div>
            <div>{{ data?.latestSurvey?.created_at }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Expire Date:</div>
            <div>{{ data?.latestSurvey?.expire_date || '-' }}</div>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <div>Status:</div>
            <div>{{ Boolean(data?.latestSurvey?.status) ? 'Active': 'Draft' }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Answers:</div>
            <div>{{ data?.latestSurvey.answers }}</div>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <div>Questions:</div>
            <div>{{ data?.latestSurvey.questions }}</div>
          </div>
          <div class="flex justify-between">
            <router-link
              :to="{
                name: 'showSurvey',
                params: { id: data?.latestSurvey?.id },
              }"
              class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Survey
            </router-link>
            <button
              class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="h-5 w-4 mr-2"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 50"
              >
                <title>closed-eye</title>
                <path
                  d="M1.05,7.37A4.49,4.49,0,1,1,7.93,1.61a114.61,114.61,0,0,0,14.88,15C35.48,27,48.63,32.25,61.67,32.24S87.79,27,100.37,16.49A112.38,112.38,0,0,0,114.94,1.64a4.48,4.48,0,0,1,6.92,5.69,129.09,129.09,0,0,1-10,10.85l5.91,5.42a4.47,4.47,0,1,1-6,6.6l-6.59-6a86.1,86.1,0,0,1-13.43,9.06l3.73,8A4.48,4.48,0,0,1,87.35,45l-3.74-8a61.24,61.24,0,0,1-17.56,4V48.9a4.48,4.48,0,0,1-8.95,0V41A61.75,61.75,0,0,1,39.58,37l-3.76,8a4.48,4.48,0,1,1-8.11-3.79l3.74-8A88.78,88.78,0,0,1,18,24.2l-6.55,6a4.47,4.47,0,1,1-6-6.6l5.83-5.34A130.63,130.63,0,0,1,1.05,7.37Z"
                />
              </svg>
              View Answers
            </button>
          </div>
        </div>
        <div class="row-span-2 bg-white shadow-md p-3 order-4 animate-fade-in-down lg:order-2 animation-delay: 0.3s">
          <div class="flex justify-between items-center mb-3 px-2">
            <h3 class="text-2xl font-semibold">Latest Answers</h3>
            <a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration">View all</a>
          </div>
          <a href="#" v-for="answer in data?.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
            <div class="font-semibold">{{ answer?.survey?.title }}</div>
            <small>
              Answer made at:
              <i class="font-semibold">{{ answer.end_date }}</i>
            </small>
          </a>
        </div>
      </div>
    </template>
  </PageComponent>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import PageComponent from "../components/PageComponent.vue";
import { useSurveyStore } from "../stores/surveyStore";

//Uses
const surveyStore = useSurveyStore();

//Computed
const loading = computed(() => {
  return surveyStore.dashboard.loading;
});

const data = computed(() => {
  return surveyStore.dashboard.data;
});

surveyStore.getDashboardStatistic;

</script>

<style lang="scss" scoped></style>
