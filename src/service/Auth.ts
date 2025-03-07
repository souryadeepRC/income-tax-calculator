import { Account, Client, ID } from "appwrite";
import APIConfig from "./api-config";
import { CreateUserParam, LoginUserParam } from "src/types/AppServiceTypes";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(APIConfig.appUrl).setProject(APIConfig.projectId);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }: CreateUserParam) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  async login({ email, password }: LoginUserParam) {
    try {
      const userAccount = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userAccount;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  async getCurrentUser() {
    return this.account.get();
  }

  async logout() {
    try {
      const response = await this.account.deleteSession("current");
      console.log(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }
}

const authService = new AuthService();
export default authService;
