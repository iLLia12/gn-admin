<template>
  <label
    for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label
  >
  <input
    ref="reference"
    id="name"
    :type="type"
    :multiple="multiple"
    class="bg-gray-50 border border-gray-300 text-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    :placeholder="placeholder"
    required
    :disabled="disabled"
    :value="modelValue"
    @input="handleInputUpdate"
    @keyup="handleKeyUp"
  />
  <Teleport to="#teleports">
    <div
      v-if="items.length"
      ref="floating"
      :style="floatingStyles"
      class="border w-2/5 border-gray-100 bg-neutral-100 p-4"
    >
      <ul>
        <li :key="item.name" v-for="item in items">{{ item.name }}</li>
      </ul>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useFloating } from "@floating-ui/vue";
import type { PropType } from "vue";
const emit = defineEmits(["update:modelValue", "keyup:enter"]);

type Item = {
  id: number;
  name: string;
};

const props = defineProps({
  modelValue: {
    label: String,
    type: String,
  },
  items: {
    type: Array as PropType<Item[]>,
    default: () => [],
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
    default: "text",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const reference = ref(null);
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating, {
  placement: "bottom",
});

function handleInputUpdate(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
function handleKeyUp(e: KeyboardEvent) {
  if (e.key == "Enter") {
    emit("keyup:enter");
  }
}
</script>
