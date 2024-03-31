export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const config = useRuntimeConfig();
  const data = await $fetch(`${config.public.apiUrl}/games/${id}`, {
    method: "delete",
  });
  return {
    body: {
      data,
    },
  };
});
