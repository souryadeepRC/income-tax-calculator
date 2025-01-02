/* eslint-disable */
export const updateState = (field: string, value: any) => (object: any) => {
  return {
    ...object,
    [field]: value,
  };
};
