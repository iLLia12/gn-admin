<template>
  <label
    for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label
  >
  <input
    id="name"
    :type="type"
    :multiple="multiple"
    class="bg-gray-50 border border-gray-300 text-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="john.doe@company.com"
    required
    :disabled="disabled"
    :value="modelValue"
    @input="handleInputUpdate"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    label: String,
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text"
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

function handleInputUpdate(e) {
  emit("update:modelValue", e.target.value);
}
</script>
