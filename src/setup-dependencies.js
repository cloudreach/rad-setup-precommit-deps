const os = require('os');
const path = require('path');

const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function downloadTool(tool, url) {
  core.debug(`Downloading ${tool} CLI from ${url}`);
  const pathToCLITar = await tc.downloadTool(url);

  core.debug(`Extracting ${tool} zip file`);
  const pathToCLI = await tc.extractTar(pathToCLITar);
  core.debug(`${tool} path is ${pathToCLI}.`);

  if (!pathToCLITar || !pathToCLI) {
    throw new Error(`Unable to download ${tool} from ${url}`);
  }

  return pathToCLI;
}

async function run() {
  try {
    const tfDocsInputVersion = core.getInput('terraform_docs_version');

    core.debug(`Getting download URL for terraform-docs version ${tfDocsInputVersion}`);
    const tfdocsURL = `https://github.com/terraform-docs/terraform-docs/releases/download/${tfDocsInputVersion}/terraform-docs-${tfDocsInputVersion}-linux-amd64.tar.gz`;

    const pathToTFDocs = await downloadTool("terraform-docs", tfdocsURL);

    core.addPath(pathToTFDocs);

    const tfLintInputVersion = core.getInput('tflint_version');
    core.debug(`Getting download URL for tflint version ${tfLintInputVersion}`);
    const tflintURL = `https://github.com/terraform-linters/tflint/releases/download/${tfLintInputVersion}/tflint_linux_amd64.tar.gz`;

    const pathToTFLint = await downloadTool("tflint", tflintURL);

    core.addPath(pathToTFLint);
  } catch (ex) {
    core.error(ex);
    throw ex;
  }
}

module.exports = run;