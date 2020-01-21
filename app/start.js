const moderation = require('./moderation');
const {requestMethod} = require('./utils');

const start = async (lastId = '') => {

  try {
    const updates = await requestMethod({methodName: 'getUpdates', data: {offset: lastId}});

    if (!updates || !updates.length) {
      await start(lastId);
    }

    updates.forEach(update => {
      moderation(update);
      lastId = update.update_id;
    });

    await start(lastId + 1);

  } catch (e) {
    console.log(e)
  }
};

module.exports = start;