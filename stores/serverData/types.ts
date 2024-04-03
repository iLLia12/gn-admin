import type { Filter } from "~/types";
import type { Ref } from "vue";

export type State = {
  filters: Ref<Filter[]>;
};

export type Actions = {
  fetchFilters: () => Promise<void>;
};
