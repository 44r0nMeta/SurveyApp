<template>
  <div class="py-5 px-8">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <form v-else @submit.prevent="submitSurvey" class="container mx-auto">
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">
          <img :src="survey.image_url" alt="" />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
          <p class="text-gray-500 text-sm" v-html="survey.description"></p>
        </div>
      </div>

      <div
        v-if="surveyFinished"
        class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank You for participating in this survey !
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="
            inline-flex
            justify-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Submit Another response
        </button>
      </div>

      <div v-else>
        <hr class="my-3" />
        <div v-for="(question, index) of survey.questions" :key="question.id">
          <QuestionViewerComponent
            v-model="answers[question.id]"
            :question="question"
            :index="index"
          />
        </div>
        <button
          type="submit"
          class="
            inline-flex
            justify-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import QuestionViewerComponent from "../components/viewer/QuestionViewerComponent.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSurveyStore } from "../stores/surveyStore";

//Uses
const route = useRoute();
const surveyStore = useSurveyStore();

//Vars
const surveyFinished = ref(false);
const answers = ref({});
//Computed
const loading = computed(() => {
  return surveyStore.currentSurvey.loading;
});

const survey = computed(() => {
  return surveyStore.currentSurvey.data;
});


//Methods
const submitSurvey = () => {
  //console.log(JSON.stringify(answers.value, undefined, 2));
  surveyStore.saveSurveyAnswers(
    survey.value.id,
    answers.value,
  ).then((response) => {
    if (response.status === 201) {
      surveyFinished.value = true
    }
  })
}

const submitAnotherResponse = () => {
  answers.value = {}
  surveyFinished.value = false
}

onMounted(() => {
  surveyStore.getSurveyBySlug(route.params.slug)
})
//4h01
</script>
