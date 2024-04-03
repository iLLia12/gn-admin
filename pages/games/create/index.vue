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
      <div class="mb-6">
        <fieldset>
          <legend @click="handleTest">Filters:</legend>
          <Checkbox
            :key="filter.name"
            :label="filter.name"
            v-model="filterIds[filter.id]"
            v-for="filter in filters"
          />
        </fieldset>
      </div>
      <div class="mb-6">
        <Autocomplete
          label="Tags"
          :items="tagSearchResult"
          v-model="tagSearchText"
          @update:modelValue="handleTagSearchTextChange"
          @keyup:enter="handleTagSearchEnter"
        />
      </div>
      <div class="mb-6">
        <Badge
          :key="tag.id"
          v-for="tag in tags"
          :title="tag.name"
          @delete="handleDeleteTag"
        />
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
import Autocomplete from "@/components/controls/autocomplete";
import TextArea from "@/components/controls/textarea";
import Button from "@/components/controls/button";
import Uploader from "@/components/controls/uploader";
import Badge from "@/components/controls/badge";
import Checkbox from "@/components/controls/checkbox";
import useServerDataStore from "~/stores/serverData";
import type { Tag } from "~/types";
import debounce from "lodash.debounce";

const { filters, tags } = useServerDataStore();
const { toKebabCase } = useHelpers();

const name = ref("");
const year = ref("");
const description = ref("");
const files = ref<File[]>([]);
const filterIds = ref<Record<string, boolean>>({});
const tagSearchText = ref("");

const slug = computed(() => toKebabCase(name.value));
const tagSearchResult = computed(() => {
  if (tagSearchText.value.length < 2) return [];
  return tags.filter((tag: Tag) => {
    return tag.name.toLowerCase().includes(tagSearchText.value);
  });
});

function prepareFormData() {
  const formData = new FormData();
  const _filterIds = [];
  for (const key in filterIds.value) {
    if (filterIds.value[key]) {
      _filterIds.push(key);
    }
  }
  const fileNames: string[] = [];
  files.value.forEach(async (file, index) => {
    const fileName = `image-${index}`;
    formData.append(fileName, file);
    fileNames.push(fileName);
  });
  // laravel media library requires file names as ["name-1", ...], addMultipleMediaFromRequest
  formData.append("fileNames", fileNames.join("."));
  formData.append("filters", _filterIds.join("."));
  formData.append("name", name.value);
  formData.append("slug", slug.value);
  formData.append("year", year.value);
  formData.append("description", description.value);
  return formData;
}
function handleTest() {
  console.log(filterIds.value);
}
function handleUploaderChange(f: File[]) {
  files.value = f;
}

const handleTagSearchTextChange = debounce(async (e) => {
  console.log("handleTagSearchTextChange: ", e);
}, 300);
function handleDeleteTag() {
  console.log("handleDeleteTag");
}
function handleTagSearchEnter() {
  console.log("handleTagSearchEnter");
  tagSearchText.value = "";
}
function handleFilterAutocompleteEnterKeyup() {
  console.log("handleFilterAutocompleteEnterKeyup");
}
function handleFilterSearchTextChange() {
  console.log("handleFilterSearchTextChange");
}
async function handleSubmit() {
  const body = prepareFormData();
  await $fetch("http://localhost/api/games", {
    headers: {
      Accept: "application/json",
    },
    method: "post",
    body,
  });
}
</script>
