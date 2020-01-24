const {sendMessage, setChatTitle, deleteMessage,} = require('./methods');
var CronJob = require('cron').CronJob;
var fs = require('fs');
const moderation = data => {

  if (!data) {
    return false;
  }

  const {message, callback_query} = data;

  if (callback_query) {
     //console.log(callback_query)
  }
  

  if (message) {

    const {message_id, text = '', from: {username, last_name, first_name}, chat: {id: chat_id}} = message;

    new CronJob('0 20 * * 1-5', function() {
        console.log('Каждый день в 8 вечера бот опрашивает всех разработчиков и спрашивает статус по задачам');
        sendMessage({chat_id, text: 'Какой статус по задачам?'})
      }, null, true, 'Europe/Moscow');
      
    new CronJob('0 10 * * 1-5', function() {
        console.log('Каждый день в 10 утра бот опрашивает всех разработчиков и спрашивает время их прихода на работу');
        sendMessage({chat_id, text: 'Введи время прихода на работу'})
      }, null, true, 'Europe/Moscow');
      
    new CronJob('0 21 * * 1-5', function() {
        console.log('спрашивает статус по задачам. Ждет час на ответ и дальше эти ответы отсылает каждому манагеру ');
        sendMessage({chat_id, text: 'Ответ принят'})
      }, null, true, 'Europe/Moscow');
      
    new CronJob('0 11 * * 1-5', function() {
        console.log('спрашивает время их прихода на работу. Ждет час на ответ и дальше эти ответы отсылает каждому манагеру ');
        sendMessage({chat_id, text: 'Ответ принят'})
      }, null, true, 'Europe/Moscow');

    console.log(text)
    if (global.lastAction && global.lastAction === 'updatechattitle') {

      setChatTitle({chat_id, title: text});
      global.lastAction = '';
    }

    if (text.search(/^\/h/i) >= 0) {
      const responseText = `Список доступных команд:
      /h - выводит список команд
      /t - записывает информацию о времени прибытия на работу
      /s - записывает информацию о состоянии выполнения задач
      /Привет - общение с ботом :)
      /Удали - удаляет текущее сообщение
      /Введите новое название чата - переименовывает чат      
      `;
      sendMessage({chat_id, text: responseText})
    }
    if (text.search(/^\/t/i) >= 0) {
        const userName = username || last_name || first_name;
        const responseText = `Принято, @${userName}`;
        sendMessage({chat_id, text: responseText})
      }
      
    if (text.search(/^\/s/i) >= 0) {
        const userName = username || last_name || first_name;
        const responseText = `Принято, @${userName}`;
        sendMessage({chat_id, text: responseText})
      }
    if (text.search(/^\/Привет/i) >= 0) {
      const userName = username || last_name || first_name;
      const responseText = `Привет, @${userName}`;
      sendMessage({chat_id, text: responseText})
    }

    if (text.search(/^\/Удали/i) >= 0) {
      deleteMessage({chat_id, message_id})
    }

    if (text.search(/^\/Введите новое название чата/i) >= 0) {
      sendMessage({chat_id, text: 'Введите новое название чата'});
      global.lastAction = 'updatechattitle'
    }
  }
};

module.exports = moderation;