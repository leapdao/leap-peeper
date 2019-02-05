const ethers = require('ethers');
const operatorAbi = require('../utils/abis/operator');
const { notNotifiedRecently } = require('../utils');

module.exports = async (config, provider, db) => {
  const operator = new ethers.Contract(config.operatorAddr, operatorAbi, provider);

  const { signer } = await operator.slots(0);
  const costOfTenPeriods = ethers.utils.parseUnits('10', 'gwei').mul(100000 * 10); // 100k gas, 10gwei has price
  const signerBalance = await provider.getBalance(signer);
  if (signerBalance < costOfTenPeriods) {
    if (await notNotifiedRecently(db, 'validatorBalance')) {
      return `
        💥 *Validator node is running out of ether.*
        Account: ${signer}
        Balance: ${ethers.utils.formatEther(signerBalance)}
      `;
    }
  }
};
