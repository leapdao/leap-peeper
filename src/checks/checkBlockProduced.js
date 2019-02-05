const { getLastBlock, notNotifiedRecently } = require('../utils');

module.exports = async (config, db) => {
  const { number, timestamp } = await getLastBlock(config.nodeUrl);

  const lastBlockTime = parseInt(timestamp, 16);
  const timeAgo = Math.abs(lastBlockTime - Date.now() / 1000);

  if (120 < timeAgo) {
    if (await notNotifiedRecently(db, 'newBlock')) {
      return `
        💥 *Last block was created more than 2 minutes ago*
        Height: ${parseInt(number, 16)}
        Time: ${new Date(lastBlockTime * 1000)}
      `;
    }
  }
};
