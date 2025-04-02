import { Account, Client, ID } from "appwrite";
import APIConfig from "./api-config";
import { CreateUserParam, LoginUserParam } from "src/types/AppServiceTypes";
import dbService from "./Database";
// utils
import { isDevelopment } from "./service-utils";
// mocks
import mockAuthService from "./mocks/Auth";

class AuthService {
  client = new Client();
  account: any;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }: CreateUserParam) {
    await this.account.create(ID.unique(), email, password, name);
    await this.account.createEmailPasswordSession(email, password);
    await dbService.createDetails("income", {
      category: "BASIC",
      amount: 0,
      group: "salary",
    });
    await dbService.createDetails("income", {
      category: "HRA",
      amount: 0,
      group: "salary",
    });

    return;
  }

  async login({ email, password }: LoginUserParam) {
    await this.account.createEmailPasswordSession(email, password);
    return await this.getCurrentUser();
  }

  async getCurrentUser() {
    return this.account.get();
  }

  async logout() {
    return await this.account.deleteSession("current");
  }
}

export default isDevelopment() ? mockAuthService : new AuthService();
