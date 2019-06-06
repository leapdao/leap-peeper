const ethers = require('ethers');
const { checkValidatorBalance, checkPeriodSubmission, checkBlockProduced, checkRpcAvailable } = require('./checks');
const { respond, getNodeConfig, slackAlert } = require('./utils');
const Db = require('./utils/db');
const NETWORKS = require('./utils/knownNetworks');

let simpledb;
if (process.env.IS_OFFLINE !== 'true') {
  const AWS = require('aws-sdk');
  simpledb = new AWS.SimpleDB({ region: 'eu-west-1' });
}

const handler = async (event, context, callback) => {
  let config = { network: 'n/a' };
  const nodeUrl = process.env.NODE_URL;
  const db = new Db(simpledb, 'leap_peeper', process.env.ENV);

  const issues = [];
  issues.push(await checkRpcAvailable(nodeUrl, db));

  const nodeRpcIsAvailable = !issues[0];
  if (nodeRpcIsAvailable) {
    config = await getNodeConfig(nodeUrl);
    config.safeBlockTime = process.env.SAFE_BLOCK_TIME;
    config.safePeriodTime = process.env.SAFE_PERIOD_TIME;
    config.valBalanceThreshold = process.env.VAL_BALANCE_THRESHOLD;

    let providerUrl = config.rootNetwork;
    if (config.rootNetworkId) {
      config.rootNetworkConfig = NETWORKS[config.rootNetworkId];
      providerUrl = config.rootNetworkConfig.provider.http;
    }

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    issues.push(await checkValidatorBalance(config, provider, db));
    issues.push(await checkPeriodSubmission(config, provider, db));
    issues.push(await checkBlockProduced(config, db));
  }

  const issuesStr = issues.join('\n').trim();
  if (issuesStr) {
    await slackAlert(process.env.SLACK_HOOK, process.env.SLACK_CHANNEL, config.network, issuesStr);
  }

  return respond(200);
};

exports.handler = handler;
