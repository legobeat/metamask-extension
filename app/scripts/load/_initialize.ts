/* eslint-disable @typescript-eslint/no-require-imports */
// currently only used in webpack build.

// The root compartment will populate this with hooks
global.stateHooks = {} as typeof stateHooks;

if (process.env.ENABLE_SENTRY === 'true') {
  require('../sentry-install');
}
if (process.env.ENABLE_SNOW === 'true') {
  require('@lavamoat/snow/snow.prod');
  require('../use-snow');
}
if (process.env.ENABLE_LOCKDOWN === 'true') {
  require('../lockdown-run');
  require('../lockdown-more');
}

require('../init-globals');
require('../runtime-cjs');

export {};
