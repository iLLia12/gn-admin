import { defineStore } from "pinia";
import type { Filter } from "~/types";
import type { Actions, State } from "~/stores/serverData/types";

const useServerDataStore = defineStore("serverData", (): State & Actions => {
  const filters = ref<Filter[]>([]);
  async function fetchFilters() {
    console.log("fetching filters...");
    const { data } = await useFetch("/api/filters");
    filters.value = data.value?.body.data || [];
  }

  return { filters, fetchFilters };
});

export default useServerDataStore;
