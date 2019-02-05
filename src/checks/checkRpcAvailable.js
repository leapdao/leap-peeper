const { getLastBlock, notNotifiedRecently } = require('../utils');

module.exports = async (nodeUrl, db) => {
  try {
    await getLastBlock(nodeUrl);
  } catch (e) {
    if (await notNotifiedRecently(db, 'rpc')) {
      return `
        💥 *JSON RPC is not available*
        Node URL: ${nodeUrl}
      `;
    }
  }
};
