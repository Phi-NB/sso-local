export const params =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : undefined;

export const createParams = (
  name: string,
  value: string,
  searchParams: any
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
};
