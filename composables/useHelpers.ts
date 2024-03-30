const useHelpers = () => {
  function toKebabCase(str: string) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  return {
    toKebabCase,
  };
};

export default useHelpers;
