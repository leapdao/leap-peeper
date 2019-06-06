# Leap Network Monitoring λ

## Installation

`yarn`

### If you don't already have the serverless cli installed, do that
`yarn global add serverless`

### If it's the first time you use aws, you need to configure credentials
https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md

## Configuration

Some of these have default values per network, see npm scripts in `package.json`.

- SLACK_HOOK. Slack hook URL
- SLACK_CHANNEL. Slack channel/DM to post to (e.g. `#mainnet` or `@kosta`)
- NODE_URL. Leap JSON RPC url
- ENV. Environment e.g. `mainnet` or `testnet`
- SAFE_BLOCK_TIME. Number of seconds between blocks considered as OKAY. Alert will be triggered, if there is no block produced in `SAFE_BLOCK_TIME` seconds
- SAFE_PERIOD_TIME. Number of seconds between periods considered as OKAY. Alert will be triggered, if there is no period submitted in `SAFE_PERIOD_TIME` seconds.
- VAL_BALANCE_THRESHOLD. Minimum safe amount of Ether for validator balance (in wei). Alert will be triggered, if the balance is lower than `VAL_BALANCE_THRESHOLD`. If ommited, the default value will be used which should be enough to submit 10 periods with 20 gwei gas price.


## Local development

Start local deployment:
```
NODE_URL=<node-json-rpc-url> SLACK_HOOK=<slack-hook-url> SLACK_CHANNEL=@kosta yarn start
```

Open `http://localhost:3001` to trigger peeper check

## Deployment

Dev (local):
```
NODE_URL=<node-json-rpc-url> SLACK_HOOK=<slack-hook-url> SLACK_CHANNEL=@kosta yarn start
```

Testnet (AWS Lambda):
```
SLACK_HOOK=<slack-hook-url> yarn deploy:testnet
```

Mainnet (AWS Lambda):
```
SLACK_HOOK=<slack-hook-url> yarn deploy:mainnet
```

## License
Serverless Boilerplate is [MIT licensed](https://opensource.org/licenses/MIT).
