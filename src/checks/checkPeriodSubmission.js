const ethers = require('ethers');
const bridgeAbi = require('../utils/abis/bridge');
const { notNotifiedRecently } = require('../utils');

module.exports = async (config, provider, db) => {
  const bridge = new ethers.Contract(config.bridgeAddr, bridgeAbi, provider);

  const tipHash = await bridge.tipHash();
  const lastPeriod = await bridge.periods(tipHash);

  const timeAgo = Math.abs(lastPeriod.timestamp - Date.now() / 1000);
  const fortyMinutes = 40 * 60;

  if (fortyMinutes < timeAgo) {
    if (await notNotifiedRecently(db, 'periodSub')) {
      return `
        💥 *Last period was submitted more than 30 minutes ago*
        Height: ${lastPeriod.height}
        Time: ${new Date(lastPeriod.timestamp * 1000)}
        Tip hash: ${tipHash}
      `;
    }
  }
};
