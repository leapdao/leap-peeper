const { getLastBlock, notNotifiedRecently } = require('../utils');

module.exports = async (config, db) => {
  const { number, timestamp } = await getLastBlock(config.nodeUrl);

  const lastBlockTime = parseInt(timestamp, 16);
  const timeAgo = Math.abs(lastBlockTime - Date.now() / 1000);
  const safeTime = Number(config.safeBlockTime);
  if (safeTime < timeAgo) {
    if (await notNotifiedRecently(db, 'newBlock')) {
      const safeTimeMinutes = Math.round((safeTime / 60) * 10) / 10;
      return `
        💥 *Last block was created more than ${safeTimeMinutes} minutes ago*
        Height: ${parseInt(number, 16)}
        Time: ${new Date(lastBlockTime * 1000)}
      `;
    }
  }
};
