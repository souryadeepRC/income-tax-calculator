import { CreateUserParam, LoginUserParam } from "src/types/AppServiceTypes";
import mockDBService from "./Database";

class MockAuthService {
  constructor() {}

  async createUser({ email, name }: CreateUserParam) {
    await new Promise((resolve) =>
      setTimeout(() => resolve({ email, name }), 1000)
    );
    await mockDBService.createDetails("income", {
      category: "BASIC",
      amount: 0,
      group: "salary",
    });
    await mockDBService.createDetails("income", {
      category: "HRA",
      amount: 0,
      group: "salary",
    });

    return;
  }

  async login({ email }: LoginUserParam) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ email, name: "Mock User" }), 1000)
    ); // Mocking user data
  }

  async getCurrentUser() {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve({ email: "mockeduser@example.com", name: "Mock User" }),
        1000
      )
    );
  }

  async logout() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

const mockAuthService = new MockAuthService();
export default mockAuthService;
