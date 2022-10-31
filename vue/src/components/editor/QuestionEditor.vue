<template>
  <div class="flex items-center justify-between">
    <h4 class="text-lg font-bold">
      {{ `${index + 1}.  ${model.question}` }}
    </h4>
    <div class="flex items-center">
      <!-- Add new Question -->
      <button
        type="button"
        @click="addQuestion()"
        class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
      >
        Add &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <!-- End Add new Question -->

      <!-- Delete question -->
      <button
        type="button"
        @click="deleteQuestion()"
        class="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-4"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        &nbsp; Delete
      </button>
      <!-- End Delete question -->
    </div>
  </div>

  <div class="grid gap-3 grid-cols-12">
    <!-- Question Content -->
    <div class="mt-3 col-span-9">
      <label
        :for="`question_text_${model.id}`"
        class="block text-sm font-medium text-gray-700"
        >Question Text</label
      >
      <input
        type="text"
        :name="`question_text_${model.data}`"
        :id="`question_text_${model.id}`"
        v-model="model.question"
        @change="dataChange"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
      />
    </div>
    <!-- End Question Content -->

    <!-- Question Type -->
    <div class="mt-3 col-span-3">
      <label
        :for="`question_type_${model.id}`"
        class="block text-sm font-medium text-gray-700"
        >Question Type</label
      >
      <select
        name="question_type"
        :id="`question_type_${model.id}`"
        v-model="model.type"
        @change="typeChange"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
    <!-- End Question Type -->
  </div>

  <!-- Question Description -->
  <div class="mt-3 col-span-9">
    <label
      :for="`question_description_${model.id}`"
      class="block text-sm font-medium text-gray-700"
      >Description</label
    >
    <textarea
      name="question_description"
      :id="`question_description_${model.id}`"
      v-model="model.description"
      @change="descriptionChange"
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
    />
  </div>
  <!-- End Question Description -->

  <!-- Data -->
  <div>
    <div v-if="shouldHaveOption()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options

        <!-- Add New Option -->
        <button
          type="button"
          @click="addOption"
          class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
        >
          Add Options &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <!-- End Add New Option -->
      </h4>

      <!-- Option List -->
      <div
        v-if="model.data.options.length === 0"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm">{{ index + 1 }}</span>
        <input
          type="text"
          v-model="option.text"
          @change="dataChange"
          class="w-full rounded-sm py-1 px-2 text-xs border border-gray-400 focus:border-indigo-500"
        />

        <!-- Delete Option -->
        <button
          type="button"
          @click="removeOption(option)"
          class="h-6 w-6 flex items-center rounded-full border border-transparent hover:border-red-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-red-500"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <!-- End Delete Option -->
      </div>
      <!-- End Option List -->
    </div>
  </div>
  <!-- End Data -->
  <hr class="my-4" />
</template>

<script setup>
/**
 * Imports
 */
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useSurveyStore } from "../../stores/surveyStore";
import {v4 as uuidv4 } from 'uuid';

/*
  Uses
*/
const surveyStore =  useSurveyStore()
/*
  Emits
*/
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);
/*
  Props
*/
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
  },
});

/*
  Data
*/

const model = ref(JSON.parse(JSON.stringify(props.question)));

//Compputed
const questionTypes = computed(() => {
  return surveyStore.$state.questionTypes
})


/*
  methods
*/
  const upperCaseFirst = (str) => {
    //str = String(str)
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const shouldHaveOption = () => {
    return ['select','radio','checkbox'].includes(model.value.type)
  }

  const getOptions = () => {
    return model.value.data.options
  }

  const setOptions = (options) => {
    model.value.data.options = options
  }

  const addOption = () => {
    setOptions([
      ...getOptions(),
      {uuid: uuidv4(), text: ''}
    ]);
    dataChange();
  }

//Remove Option
  const removeOption = (op) => {
    setOptions(getOptions().filter((opt) => opt !== op))
    dataChange()
  }

  const typeChange = () => {
    if (shouldHaveOption()) {
      setOptions(getOptions() || [])
    }
    dataChange()
  }

  const descriptionChange = () => {
    dataChange()
  }

  //dataChange func to Emit changes
  const dataChange = ()=> {
    const data = JSON.parse(JSON.stringify(model.value))
    if (!shouldHaveOption()) {
      delete data.data.options
    }
    emit('change', data)
  }

  const addQuestion = ()=> {
    emit('addQuestion', props.index + 1)
  }

  const deleteQuestion = ()=> {
    emit('deleteQuestion', props.question)
  }

</script>
