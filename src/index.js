const ethers = require('ethers');
const { checkValidatorBalance, checkPeriodSubmission, checkBlockProduced, checkRpcAvailable } = require('./checks');
const { respond, getNodeConfig, slackAlert } = require('./utils');
const Db = require('./utils/db');

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

    const provider = new ethers.providers.JsonRpcProvider(config.rootNetwork);

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
