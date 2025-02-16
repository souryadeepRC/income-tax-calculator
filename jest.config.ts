export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|module.scss|scss|less)$": "<rootDir>/__mocks__/fileMock.js",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 90,
      functions: 90,
      lines: 80,
    },
  },
  transformIgnorePatterns: ["/node_modules/"],
};
