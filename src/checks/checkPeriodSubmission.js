const ethers = require('ethers');
const bridgeAbi = require('../utils/abis/bridge');
const { notNotifiedRecently, easyDate } = require('../utils');
const { durationInWords } = require('../utils/duration');

const operatorLink = config => {
  if (!config.rootNetworkConfig) return '';
  return `Operator: <${config.rootNetworkConfig.etherscanBase}/address/${config.operatorAddr}|etherscan>`;
};

module.exports = async (config, provider, db) => {
  const bridge = new ethers.Contract(config.bridgeAddr, bridgeAbi, provider);

  const tipHash = await bridge.tipHash();
  const lastPeriod = await bridge.periods(tipHash);

  const lastPeriodDate = new Date(lastPeriod.timestamp * 1000);
  const timeAgo = Math.abs(lastPeriod.timestamp - Date.now() / 1000);
  const safeTime = Number(config.safePeriodTime);
  if (safeTime < timeAgo) {
    if (await notNotifiedRecently(db, 'periodSub')) {
      return `
💥 *Last period was submitted more than ${Math.trunc(safeTime / 60)} minutes ago*

Period height: ${lastPeriod.height}
Time: ${easyDate(lastPeriodDate)} UTC (${durationInWords(timeAgo)} ago)
Tip hash: ${tipHash}
${operatorLink(config)}
      `;
    }
  }
};
