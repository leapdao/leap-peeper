const fetch = require('node-fetch');

module.exports = url =>
  fetch(url, {
    method: 'POST',
    body: '{"jsonrpc":"2.0","id":3,"method":"eth_getBlockByNumber","params":["latest"]}',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(resp => resp.result);
