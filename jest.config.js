/** @type {import('jest').Config} */
module.exports = {
  // Use ts-jest preset for TypeScript support
  preset: "ts-jest",

  // Test environment
  testEnvironment: "jsdom",

  // Setup files to run before tests
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Module name mapping for path aliases (adjust based on your tsconfig)
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tesseract/(.*)$": "<rootDir>/packages/$1/src",
  },

  // Transform files
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // Test file patterns
  testMatch: [
    "<rootDir>/**/__tests__/**/*.(ts|tsx|js)",
    "<rootDir>/**/*.(test|spec).(ts|tsx|js)",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/index.{ts,tsx}",
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Ignore patterns
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/build/",
  ],

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,
};
