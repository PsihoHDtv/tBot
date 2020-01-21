const Agent = require('socks5-https-client/lib/Agent');
const request = require('request');

const requestMethod = ({methodName, data}) => {

  return new Promise((resolve, reject) => {

    request({
      method: 'post',
      url: `https://api.telegram.org/bot${process.env.API_KEY}/${methodName}`,
      type: 'json',
      strictSSL: true,
      agentClass: Agent,
      agentOptions: {
        socksHost: '127.0.0.1',
        socksPort: 9050
      },
      formData: data
    }, (err, response, body) => {

      if (err) {
        reject(err);
        return false;
      }
      const {result} = JSON.parse(body);
      resolve(result)
    });

  });
};

module.exports = {requestMethod};