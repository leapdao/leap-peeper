const respond = require('./respond');
const getNodeConfig = require('./getNodeConfig');
const slackAlert = require('./slackAlert');
const getLastBlock = require('./getLastBlock');
const notNotifiedRecently = require('./notNotifiedRecently');

const easyDate = date => date.toLocaleString('en-GB', { timeZone: 'UTC' });

module.exports = { respond, getNodeConfig, slackAlert, getLastBlock, notNotifiedRecently, easyDate };
