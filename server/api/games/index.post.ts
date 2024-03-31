export default defineEventHandler(async (event) => {
  //TODO: this piece not working
  // const config = useRuntimeConfig();
  // const body = await readBody(event);
  // const data = await $fetch(`${config.public.apiUrl}/games`, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "post",
  //   body,
  // });
  return {
    body: {
      data: "hello",
    },
  };
});
