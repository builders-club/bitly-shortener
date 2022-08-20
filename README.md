# Bitly Url Shortener

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](.github/CODE_OF_CONDUCT.md)

This action creates a short URL from Bit.ly for a given URL.

## Inputs

### `bitly_token`

**Required** Bit.ly API Token. 

### `long_url`

**Required** Full URL to be shortened.

### `bitly_custom_domain`

Optional custom domain that is configured with Bit.ly

### `link_title`

Optional title of the link to record in Bit.ly

## Outputs

### `bitly_link`

Shortened URL from Bit.ly

## Example usage

```yaml
name: Test Action

on:
  workflow_dispatch:

jobs:
  shorten:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Bitly shortener
        id: shortener
        uses: builders-club/bitly-url-shortener@v1
        with:
          bitly_token: ${{ secrets.BITLY_TOKEN }}
          long_url: https://github.com/${{ github.repository }}/commit/${{ github.sha }}

      - name: outputs
        run: echo "${{ steps.shortener.outputs.bitly_link }}" / https://github.com/${{ github.repository }}/commit/${{ github.sha }}
```
