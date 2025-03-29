const APIConfig = {
  appUrl: import.meta.env.VITE_APP_WRITE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_ID,
  collectionId: {
    userIncome: import.meta.env.VITE_COLLECTION_USER_INCOME_ID,
    userDeduction: import.meta.env.VITE_COLLECTION_USER_DEDUCTION_ID,
  },
  bucketId: "",
};
export default APIConfig;
