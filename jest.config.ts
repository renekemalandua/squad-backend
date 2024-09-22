//import type { Config } from '@jest/types';
//const config: Config.InitialOptions = {
//  preset: 'ts-jest',
//  testEnvironment: 'node',
//};

import type {Config} from 'jest';

const config: Config = {
    clearMocks: true,
    coverageProvider: "v8",
    rootDir: "src",
    testRegex: ".*\\..*spec\\.ts$",
    transform: {
      "^.+\\.ts?$": 'ts-jest',
    },
  };

export default config;
