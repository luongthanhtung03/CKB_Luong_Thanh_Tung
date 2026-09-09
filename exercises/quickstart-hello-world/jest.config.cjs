/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // puts offckb's native ckb-debugger on PATH; see tests/jest.setup.cjs
  globalSetup: "<rootDir>/tests/jest.setup.cjs",
  collectCoverageFrom: [
    "contracts/*/src/**/*.ts",
    "!dist/**"
  ]
};
