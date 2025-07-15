/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  projects: [
    "<rootDir>/packages/file-upload/jest.config.js",
    "<rootDir>/packages/restful-tasks/jest.config.cjs",
    "<rootDir>/packages/stripe-webhooks/jest.config.js",
  ],
};
