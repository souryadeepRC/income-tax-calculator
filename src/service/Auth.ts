import { Account, Client, ID } from "appwrite";
import APIConfig from "./api-config";
import { CreateUserParam, LoginUserParam } from "src/types/AppServiceTypes";

class AuthService {
  client = new Client();
  account: any;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }: CreateUserParam) {
    await this.account.create(ID.unique(), email, password, name);
    return this.account.createEmailPasswordSession(email, password);
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

const authService = new AuthService();
export default authService;
