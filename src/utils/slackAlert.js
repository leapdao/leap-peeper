const fetch = require('node-fetch');

module.exports = (slackAlertUrl, slackChannel, env, text) => {
  if (!slackAlertUrl || !slackChannel) return Promise.reject('is not configured');

  const alertText = `${text}\n\nEnvironment: *${env}*`;

  return new Promise((fulfill, reject) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        channel: slackChannel,
        username: 'peeper',
        text: alertText,
        icon_emoji: ':rotating_light:',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return fetch(slackAlertUrl, options).then(res => fulfill(res), err => reject(JSON.stringify(err)));
  });
};
