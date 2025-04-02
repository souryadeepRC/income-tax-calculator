import { Client, ID, Databases } from "appwrite";
import APIConfig from "./api-config";
// utils
import { isDevelopment } from "./service-utils";
// mocks
import mockDatabaseService from "./mocks/Database";

type DocumentType = "income" | "deduction";
const getCollectionId = (type: DocumentType): string => {
  return type === "income"
    ? APIConfig.collectionId.userIncome
    : APIConfig.collectionId.userDeduction;
};
class DBService {
  client: Client = new Client();
  database: Databases;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.database = new Databases(this.client);
  }

  async createDetails(type: DocumentType, data: object) {
    return await this.database.createDocument(
      APIConfig.databaseId,
      getCollectionId(type),
      ID.unique(),
      data
    );
  }
  async getAllDetails(type: DocumentType) {
    return await this.database.listDocuments(
      APIConfig.databaseId,
      getCollectionId(type),
      []
    );
  }
  async updateDetails(type: DocumentType, data: object & { id: string }) {
    const { id, ...updatedValue } = data || {};
    return await this.database.updateDocument(
      APIConfig.databaseId,
      getCollectionId(type),
      id,
      updatedValue
    );
  }
  async storeDetails(type: DocumentType, data: any) {
    if (data?.id) {
      return this.updateDetails(type, data);
    }
    return this.createDetails(type, data);
  }
  async deleteDetails(type: DocumentType, documentId: string) {
    return await this.database.deleteDocument(
      APIConfig.databaseId,
      getCollectionId(type),
      documentId
    );
  }
}

export default isDevelopment() ? mockDatabaseService : new DBService();
