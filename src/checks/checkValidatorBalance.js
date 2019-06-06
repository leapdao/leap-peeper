const ethers = require('ethers');
const operatorAbi = require('../utils/abis/operator');
const { notNotifiedRecently } = require('../utils');

module.exports = async (config, provider, db) => {
  const operator = new ethers.Contract(config.operatorAddr, operatorAbi, provider);

  const { signer } = await operator.slots(0);
  let balanceThreshold;
  if (config.valBalanceThreshold) {
    balanceThreshold = ethers.utils.bigNumberify(config.valBalanceThreshold);
  } else {
    balanceThreshold = ethers.utils.parseUnits('20', 'gwei').mul(100000 * 10); // 100k gas, 20gwei gas price
  }
  const signerBalance = await provider.getBalance(signer);
  if (signerBalance.lt(balanceThreshold)) {
    if (await notNotifiedRecently(db, 'validatorBalance')) {
      return `
        💥 *Validator node is running out of ether.*
        Account: ${signer}
        Balance: ${ethers.utils.formatEther(signerBalance)}
      `;
    }
  }
};
