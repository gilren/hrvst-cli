# Harvest CLI

This is a <b>quick and dirty</b> fork of [hrvst-cli] https://github.com/kgajera/hrvst-cli to make it work for multiples accounts.

## Config

config.json file looks like this :

```json
{
  "accessToken": "{{ACCESS_TOKEN}}",
  "accountIds": {
    "{{ACCOUNT_NAME_1}}": "{{ACCOUNT_ID_1}}",
    "{{ACCOUNT_NAME_DEFAULT}}": "{{ACCOUNT_ID_DEFAULT}}"
  },
  "accountId": "{{ACCOUNT_ID_DEFAULT}}"
}
```
