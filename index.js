const core = require('@actions/core');

const setup = require('./src/setup-dependencies');

(async () => {
  try {
    await setup();
  } catch (error) {
    core.setFailed(error.message);
  }
})();