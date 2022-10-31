<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-500">
          {{ route.params.id ? model.title : "Create a survey" }}
        </h1>
        <button
          v-if="route.params.id && !surveyLoading"
          type="button"
          @click="deleteSurvey"
          class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 -mt-1 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path fill-rule="evenodd" clip-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Survey
        </button>
      </div>
    </template>
    <template v-slot:default>
      <div v-if="surveyLoading" class="flex justify-center text-3xl">Loading...</div>
      <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <!-- Survey Fields -->
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <!-- Image -->
            <div>
              <label for="" class="block text-sm font-medium text-gray-700">Image</label>
              <div class="mt-1 flex items-center">
                <img
                  class="w-64 h-48 object-cover"
                  v-if="model.image_url"
                  :src="model.image_url"
                  :alt="model.title"
                />
                <span
                  v-else
                  class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-[80%] w-[80%] text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      clip-rule="evenodd"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    /></svg
                ></span>
                <button
                  type="button"
                  class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <input
                    type="file"
                    @change="onImageChoose"
                    class="absolute left-0 top-0 rigth-0 bottom-0 opacity-0 cursor-pointer"
                  />
                  Change
                </button>
              </div>
            </div>
            <!--/ End Image -->

            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                v-model="model.title"
                type="text"
                name="title"
                id="title"
                autocomplete="survey_title"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
              />
            </div>
            <!--/ Title -->

            <!-- Description -->
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <div class="mt-1">
              <textarea
                v-model="model.description"
                name="description"
                id="description"
                rows="3"
                autocomplete="survey_description"
                placeholder="Describe the survey"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
              ></textarea>
            </div>
            <!--/ End Description -->

            <!-- Expire Date -->
            <div>
              <label for="expire_date" class="block text-sm font-medium text-gray-700"
                >Expire Date</label
              >
              <input
                v-model="model.expire_date"
                type="datetime-local"
                name="expire_date"
                id="expire_date"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
              />
            </div>
            <!--/ Expire Date -->

            <!-- Status -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  v-model="model.status"
                  type="checkbox"
                  name="status"
                  id="status"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700">Active</label>
              </div>
            </div>
            <!--/ Status -->
          </div>
          <!--/ Survey Fields -->

          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h3 class="text-2x1 font-semibold flex items-center justify-between">
              Questions
              <button
                type="button"
                @click="addQuestion()"
                class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              >
                Add &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="{2}"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </h3>
            <div v-if="!model.questions.length" class="text-center text-gray-600">
              Oups! we don't have any question
            </div>
            <div v-for="(question, index) in model.questions" :key="question.id">
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
              <!-- <pre>{{ question }}</pre> -->
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </template>
  </PageComponent>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
//import HeaderComponent from "../components/layouts/HeaderComponent.vue";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";
import { useSurveyStore } from "../stores/surveyStore";
import { computed, watch } from "@vue/runtime-core";
import {v4 as uuidv4 } from 'uuid';

/*
  Uses
*/
const surveyStore = useSurveyStore();
const route = useRoute();
const router = useRouter();

/*
  Data
*/

const model = ref({
  title: null,
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: "",
  questions: [],
});


if (route.params.id) {
  surveyStore.getSurvey(route.params.id);
  // model.value = surveyStore.$state.surveys.find(
  //   (survey) => survey.id === parseInt(route.params.id)
  // );
}

/*
  Methods
*/

const saveSurvey = () => {
  const survey = model.value;
  surveyStore.saveSurvey(survey).then(({ data }) => {
    surveyStore.notify(
      'Survey was sucessfully up to date !',
      'success'
    )
    router.push({
      name: "showSurvey",
      params: { id: data.data.id },
    });
    // console.log(res);
  });
};

const deleteSurvey = () => {
  if (confirm(`Are you sure you want to delete this survey? \n\t Operation can't ne reversible !`)) {
    surveyStore.deleteSurvey(model.value.id).then(() => {
      router.push({
        name: 'surveys'
      })
    })
  }
}

const onImageChoose = (ev) => {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result;
    model.value.image_url = reader.result;
  };

  reader.readAsDataURL(file);
};

const addQuestion = (index) => {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
};

const deleteQuestion = (question) => {
  model.value.questions = model.value.questions.filter((q) => q.id !== question.id);
};

const questionChange = (question) => {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
};

/*
  Watchers
*/

watch(() => surveyStore.currentSurvey.data,(newValue, oldValue) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newValue)),
      status: newValue.status //!== "draft",
    };
  }, {immediate: true}
);

/*
  Computed
*/

const surveyLoading = computed(() => {
  return surveyStore.currentSurvey.loading;
});


</script>
