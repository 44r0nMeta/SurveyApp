<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'createSurvey' }"
          class="
            py-2
            px-3
            text-white
            bg-emerald-500
            rounded-md
            hover:bg-emeral-600
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 -mt-1 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="{2}"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div v-if="surveysLoading" class="flex justify-center text-3xl">
      Loading...
    </div>
    <div v-else>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListComponent
          v-for="(survey, index) in surveys.data"
          :key="survey.id"
          :survey="survey"
          class="opacity-0 animate-fade-in-down"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @delete="deleteSurvey(survey)"
        />
      </div>

      <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            v-for="(link, index) in surveys.links"
            :key="index"
            :disable="!link.url"
            v-html="link.label"
            href="#"
            @click.prevent="getForPage(link)"
            aria-current="page"
            class="relative inline-flex rounded-md items-center mx-1 px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
            ]"
          ></a>
        </nav>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
//import HeaderComponent from "../components/layouts/HeaderComponent.vue";
import PageComponent from "../components/PageComponent.vue";
import SurveyListComponent from "../components/SurveyListComponent.vue";
import { useSurveyStore } from "../stores/surveyStore";

/*
  Uses
*/
const show = ref(false);
const surveyStore = useSurveyStore();

/*
  Computed
*/
const surveys = computed(() => {
  return surveyStore.$state.surveys;
});

const surveysLoading = computed(() => {
  return surveyStore.$state.surveys.loading;
});

/*
  Methods
*/
const deleteSurvey = (survey) => {
  if (
    confirm(
      `Are you sure you want to delete this survey? \n\t Operation can't ne reversible !`
    )
  ) {
    //delete
    surveyStore.deleteSurvey(survey.id).then(() => {
      surveyStore.getAllSurveys();
    });
  }
};


const getForPage = (link) => {
  if (!link.url || link.active) {
    return;
  }

  surveyStore.getAllSurveys(link.url)
}

surveyStore.getAllSurveys();
//LifeCycle
// onMounted(() => {
//   surveyStore.getAllSurveys();
// });
</script>
