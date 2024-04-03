<template>
  <div>
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="flex justify-between p-6">
            <div>Filters</div>
            <div>
              <button
                @click="handleCreateGame"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
            </div>
          </div>
          <div class="overflow-hidden">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
              <thead>
                <tr>
                  <th
                    v-for="th in thead"
                    :key="th.name"
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    {{ th.name }}
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="game in games"
                  :key="game.name"
                  class="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    {{ game.name }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {{ game.slug }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {{ game.year }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {{ game.description }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {{ game.created_at }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {{ game.updated_at }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {{ game.deleted_at }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                  >
                    <button
                      @click="() => handleDelete(game.id)"
                      type="button"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const { data, pending, error, refresh, status } = await useFetch("/api/games");

const thead = [
  {
    name: "name",
  },
  {
    name: "slug",
  },
  {
    name: "year",
  },
  {
    name: "description",
  },
  {
    name: "create at",
  },
  {
    name: "updated at",
  },
  {
    name: "delete at",
  },
];

const games = computed(() => {
  return data.value?.body.data || [];
});
console.log("games: ", games.value);

function handleCreateGame() {
  router.push({ name: "games-create" });
}
async function handleDelete(id: number) {
  const { data } = await useFetch(`/api/games/${id}`, {
    method: "delete",
  });
  await refresh();
  console.log("data: ", data);
}
</script>
