<template>
  <div class="flex justify-center">
    <form class="w-full max-w-lg">
      <div class="mb-6">
        <Input label="Name" v-model="name" />
      </div>
      <div class="mb-6">
        <Input label="Slug" disabled v-model="slug" />
      </div>
      <div class="mb-6">
        <Input label="Year" v-model="year" />
      </div>
      <div class="mb-6">
        <TextArea label="Description" v-model="description" />
      </div>
      <div class="mb-6">
        <Uploader label="Picture" @change="handleUploaderChange" />
      </div>
      <div>
        <Button @click="handleSubmit" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useHelpers from "@/composables/useHelpers";
import Input from "@/components/controls/input";
import TextArea from "@/components/controls/textarea";
import Button from "@/components/controls/button";
import Uploader from "@/components/controls/uploader";

const { toKebabCase } = useHelpers();

const name = ref("");
const year = ref("");
const description = ref("");
const files = ref<File[]>([]);

const slug = computed(() => toKebabCase(name.value));

function prepareFormData() {
  const formData = new FormData();
  files.value.forEach(async (file) => {
    formData.append("images", file);
  });
  formData.append("name", name.value);
  formData.append("slug", slug.value);
  formData.append("year", year.value);
  formData.append("description", description.value);
  return formData;
}
function handleUploaderChange(f: File[]) {
  files.value = f;
}
async function handleSubmit() {
  const body = prepareFormData();
  const res = await $fetch("http://localhost/api/games", {
    headers: {
      Accept: "application/json",
    },
    method: "post",
    body,
  });
  console.log(res);
}
</script>
