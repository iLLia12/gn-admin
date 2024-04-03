<template>
  <div class="flex items-center mb-4">
    <input
      id="default-checkbox"
      type="checkbox"
      :checked="modelValue"
      @click="handleChange"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label
      for="default-checkbox"
      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

function handleChange(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).checked);
}
</script>
