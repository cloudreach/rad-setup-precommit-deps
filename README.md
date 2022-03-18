# rad-setup-precommit-deps
Gtihub Action to set up dependencies used for precommit checks in pipelines

## Inputs
| Name | Description | Default |
| ---- | ----------- |---------|
| tflint_version | TFLint version to install | v0.34.1 | 
| terraform_docs_version | terrafrom-docs version to install | latest |

## Example Workflow
```yaml
name: Static Testing
on: [pull_request]
jobs:
  pre-commit:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python 3.8
      uses: actions/setup-python@v1
      with:
        python-version: 3.8
    - uses: cloudreach/rad-setup-precommit-deps@master
      name: Setup precommit dependencies
      with:
        tflint_version: v0.34.1
    - name: Pre-commit
      run: |
        pip install pre-commit
        pre-commit run --all-files
```