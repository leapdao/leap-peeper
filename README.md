# Leap Network Monitoring λ

## Installation

`yarn`

### If you don't already have the serverless cli installed, do that
`yarn global add serverless`

### If it's the first time you use aws, you need to configure credentials
https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md

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
