<template>
  <label
      for="name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >{{ label }}</label
  >
  <input
      id="name"
      type="file"
      name="files[]"
      multiple
      class="bg-gray-50 border border-gray-300 text-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="john.doe@company.com"
      required
      :disabled="disabled"
      @change="handleInputChange"
  />
  <div class="file-stack">
    <div :key="file.name" v-for="file in files">
      <div class="inline-block mr-4 mt-2">{{file.name}}</div>
      <div class="inline-block cursor-pointer" @click="() => handleDeleteFile(file)">x</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
const emit = defineEmits(["change"]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

const files = ref<File[]>([])

function handleInputChange(e: any) {
  for(let i of e.target.files as File[]) {
    files.value.push(i)
  }
}
function handleDeleteFile(file: File) {
  files.value = files.value.filter((f) => f.name != file.name)
}

watch(files.value, () => {
  emit("change", files.value);
})
</script>
