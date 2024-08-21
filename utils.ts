export const utilsResponse = (
  status: number,
  message: string,
  data: Object | null
) => {
  return { status, message, data };
};
