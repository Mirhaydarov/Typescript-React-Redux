module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
  },
  setupFilesAfterEnv: ['<rootDir>enzyme.config.ts'],
  snapshotSerializers: ['jest-serializer-html'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>__mocks__/fileMock.ts',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};