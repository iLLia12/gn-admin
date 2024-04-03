<template>
  <div class="flex h-full text-blue-400">
    <aside class="bg-blue-950 w-20">
      <p>SIDE BAR</p>
      <ul>
        <li :key="item.name" v-for="item in sideMenu">
          <NuxtLink :to="{ name: item.routeName }"> {{ item.name }}</NuxtLink>
        </li>
      </ul>
    </aside>
    <div class="w-full">
      <header class="header bg-indigo-950 h-14">Header</header>
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useServerData from "~/stores/serverData";
const { fetchFilters, fetchTags } = useServerData();
const sideMenu = [
  {
    name: "Games",
    routeName: "games",
  },
  {
    name: "Tags",
    routeName: "tags",
  },
  {
    name: "Filters",
    routeName: "filters",
  },
];

fetchFilters();
fetchTags();
</script>
