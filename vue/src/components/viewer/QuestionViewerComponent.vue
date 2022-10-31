<template>
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium text-gray-900">
        {{ `${index + 1}. ${question.question}` }}
      </legend>
      <p class="text-gray-500 text-sm">
        {{ question?.description }}
      </p>
    </div>
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          :value="modelValue"
          @change="emits('update:modelValue', $event.target.value)"
          class="
            mt-1
            block
            w-full
            py-2
            px-3
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
          "
        >
          <option value="">Select Option</option>
          <option
            :value="option.text"
            v-for="option in question.data.options"
            :key="option.uuid"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div
          v-for="(option, index) in question.data.options"
          :key="option.uuid"
          class="flex items-center"
        >
          <input
            @change="emits('update:modelValue', $event.target.value)"
            :value="option.text"
            :name="`question${question.id}`"
            :id="option.uuid"
            type="radio"
            class="
              focus:ring-indigo-500
              h-5
              w-5
              text-indigo-600
              border-gray-300 m-1
            "
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'checkbox'">
        <div
          v-for="(option, index) in question.data.options"
          :key="option.uuid"
          class="flex items-center"
        >
          <input
            @change="onCheckboxChange"
            v-model="model[option.text]"
            :id="option.uuid"
            type="checkbox"
            class="
              focus:ring-indigo-500 m-1
              h-5
              w-5
              text-indigo-600
              border-gray-300 rounded
            "
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-700"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'text'">
        <input :value="modelValue" @input="emits('update:modelValue', $event.target.value)" type="text" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadown-sm sm:text-sm border-gray-300 rounded-md">
      </div>
      <div v-else-if="question.type === 'textarea'">
        <textarea :value="modelValue" @input="emits('update:modelValue',$event.target.value)" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadown-sm sm:text-sm border-gray-300 rounded-md"></textarea>
      </div>
    </div>
  </fieldset>
  <hr class="mb-4" />
</template>

<script setup>
import { ref } from "@vue/reactivity";

//Vars
let model;
if (question.type === "checkbox") {
  model = ref({});
}
//Props
const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
});

//Emits
const emits = defineEmits(["update:modelValue"]);

//Methods

const onCheckboxChange = ($event) => {
  const selectedOptions = []
  for (let text in model.value) {
    if (model.value[text]) {
      selectedOptions.push(text)
    }
  }
  emits('update:modelValue', selectedOptions)
}
</script>
