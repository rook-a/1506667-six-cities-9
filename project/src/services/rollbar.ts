import Rollbar from 'rollbar';

export const rollbarConfig: Rollbar.Configuration = {
  accessToken: '5a09cc4879534a72b3afd23cce6f87df',
  hostSafeList: ['localhost:3000'],
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
      },
    },
  },
};

export const rollbar = new Rollbar(rollbarConfig);
