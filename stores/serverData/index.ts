import { defineStore } from "pinia";
import type { Filter, Tag } from "~/types";
import type { Actions, State } from "~/stores/serverData/types";

const useServerDataStore = defineStore("serverData", (): State & Actions => {
  const filters = ref<Filter[]>([]);
  const tags = ref<Tag[]>([]);
  async function fetchFilters() {
    console.log("fetching filters...");
    const { data } = await useFetch("/api/filters");
    filters.value = data.value?.body.data || [];
  }
  async function fetchTags() {
    console.log("fetching tags...");
    const { data } = await useFetch("/api/tags");
    tags.value = data.value?.body.data || [];
  }

  return { filters, tags, fetchFilters, fetchTags };
});

export default useServerDataStore;
