module.exports = {
  preset:'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/?(*.)+(test).ts"],
  resetMocks: true,
  clearMocks: true,
  transform: {'^.+\\.ts?$': 'ts-jest'}
}
