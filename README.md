# squoosh-github-action
Optimize images with squoosh

Initially based on the [Crush](https://github.com/crush-pics/crush-pics-github-action)  and rewritten to do it with [GoogleSquoosh](https://github.com/GoogleChromeLabs/squoosh)


## Example usage

```
name: Optimize images
on:
  pull_request:
    branches:
      - master
    paths:
      - '**.jpg'
      - '**.jpeg'
      - '**.png'
      - '**.gif'
jobs:
  crush:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Optimize images
        uses: denisdavydenko/squoosh-github-action@master
        with:
          repo-token: ${{ secrets.GIT_HUB_TOKEN }}
```
