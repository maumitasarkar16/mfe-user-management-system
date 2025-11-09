// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"], // 
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json", useESM: true }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mjs"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"], // 
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};