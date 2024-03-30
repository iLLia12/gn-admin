<template>
  <label
    for="description"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Description</label
  >
  <textarea
    id="description"
    rows="4"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Description..."
    :value="modelValue"
    @input="handleInputUpdate"
  ></textarea>
</template>
<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    label: String,
    type: String,
  },
});

function handleInputUpdate(e) {
  emit("update:modelValue", e.target.value);
}
</script>
