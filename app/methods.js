const {requestMethod} = require('./utils');

const sendMessage = data => {
  requestMethod({methodName: 'sendMessage', data});
};

const deleteMessage = data => {
  requestMethod({methodName: 'deleteMessage', data});
};

const setChatTitle = data => {
  requestMethod({methodName: 'setChatTitle', data});
};


module.exports = {sendMessage, setChatTitle, deleteMessage};