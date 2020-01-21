const {sendMessage, setChatTitle, deleteMessage,} = require('./methods');

const moderation = data => {

  if (!data) {
    return false;
  }

  const {message, callback_query} = data;

  if (callback_query) {
    // console.log(callback_query)
  }

  if (message) {

    const {message_id, text = '', from: {username, last_name, first_name}, chat: {id: chat_id}} = message;

    if (global.lastAction && global.lastAction === 'updatechattitle') {

      setChatTitle({chat_id, title: text});
      global.lastAction = '';
    }

    if (text.search(/^Привет/i) >= 0) {
      const userName = username || last_name || first_name;
      const responseText = `Привет, @${userName}`;
      sendMessage({chat_id, text: responseText})
    }

    if (text.search(/^Удали/i) >= 0) {
      deleteMessage({chat_id, message_id})
    }

    if (text.search(/^\/updatechattitle/i) >= 0) {
      sendMessage({chat_id, text: 'Введите новое название чата'});
      global.lastAction = 'updatechattitle'
    }
  }
};

module.exports = moderation;