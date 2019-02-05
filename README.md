# Leap Network Monitoring λ

## Installation

`yarn`

### If you don't already have the serverless cli installed, do that
`yarn global add serverless`

### If it's the first time you use aws, you need to configure credentials
https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md

## Development

To start offline development:
```
NODE_URL=<node-json-rpc-url> SLACK_HOOK=<slack-hook-url> SLACK_CHANNEL=@kosta yarn start
```

## Deployment

Dev:
```
NODE_URL=<node-json-rpc-url> SLACK_HOOK=<slack-hook-url> SLACK_CHANNEL=@kosta yarn start
```

Testnet:
```
SLACK_HOOK=<slack-hook-url> yarn deploy:testnet
```

Mainnet:
```
SLACK_HOOK=<slack-hook-url> yarn deploy:mainnet
```

### Environments
Environments and environment variables can be configured in `env.yml`. `dev` is the one used by default. 

## License
Serverless Boilerplate is [MIT licensed](https://opensource.org/licenses/MIT).
