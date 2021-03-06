const Client = require('../models/client');

module.exports = {
  async clientExist(searchParams) {
    return await Client.exists(searchParams);
  },
  prepareReplyData(command) {
    const username = command.splitArgs[0].slice(1);
    const message = command.splitArgs.slice(1).join(' ');
    return [username, message];
  },
  prepareStartMessagingNotice(ctx, clientUsername) {
    return `${ctx.i18n.t('StartMessagingWithClient')} @${clientUsername}`;
  },
  prepareEndMessagingNotice(ctx, clientUsername) {
    return `${ctx.i18n.t('EndDialogNotice')} @${clientUsername}`;
  }
};
