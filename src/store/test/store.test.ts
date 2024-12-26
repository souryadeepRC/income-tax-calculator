import { rootStore } from "src/store/root-store";
import { rootReducer } from "../root-reducer";

// Mock process.env.ENVIRONMENT for testing
describe("Redux Store", () => {
  it("should create a store with the correct rootReducer", () => {
    // Testing the structure of the store
    const store = rootStore;

    // Check if store has the rootReducer correctly applied
    expect(store.getState()).toBeDefined();
    expect(store.getState()).toEqual(
      rootReducer(undefined, { type: "@@INIT" })
    );
  });
});
