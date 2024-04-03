export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const data = await $fetch(`${config.public.apiUrl}/tags`);
  return {
    body: {
      data,
    },
  };
});
