export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const data = await $fetch(`${config.public.apiUrl}/filters`);
  return {
    body: {
      data,
    },
  };
});
