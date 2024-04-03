import type { Filter, Tag } from "~/types";
import type { Ref } from "vue";

export type State = {
  filters: Ref<Filter[]>;
  tags: Ref<Tag[]>;
};

export type Actions = {
  fetchFilters: () => Promise<void>;
  fetchTags: () => Promise<void>;
};
