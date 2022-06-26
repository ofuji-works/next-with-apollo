// https://nextjs.org/docs/testing#jest-and-react-testing-library
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // ルートディレクトリ
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  // tsconfigで設定しているaliasのパスがある場合、追記しパスを解決する
  moduleNameMapper: {
    "^@/pages/(.*)$":"<rootDir>/pages/$1",
    "^@/apis$": "<rootDir>/apis",
    "^@/config$": "<rootDir>/config",
    "^@/libs$": "<rootDir>/libs",
    "^@/provider$": "<rootDir>/provider"
  },
  testEnvironment: 'jest-environment-jsdom',
  // 実行するテストファイルおよびディレクトリの指定
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts', '<rootDir>/__tests__/**/*.spec.tsx'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)