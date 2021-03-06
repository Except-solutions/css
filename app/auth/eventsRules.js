const _ = require('lodash'),
  translateEventsArray = require('./utils'),
  i18n = require('../locales');

module.exports = {
  commands: {
    addManager: {
      value: ['i_am_manager'],
      permissions: ['all']
    },
    registerGroup: {
      value: ['its_manager_group'],
      permissions: ['manager'],
      approve: true
    },
    replyClient: {
      value: ['reply'],
      permissions: ['manager'],
      approve: true
    },
    start: {
      value: ['start'],
      permissions: ['all']
    }
  },
  regularMessage: {
    // Special Event:
    userReplyEvent: {
      value: ['reply'],
      permissions: ['all']
    },
    // FillProfile Events:
    clientFillProfile: {
      value: translateEventsArray(i18n, 'FillProfileButton'),
      permissions: ['all']
    },
    clientCancelFillProfile: {
      value: translateEventsArray(i18n, 'CancelFillProfile'),
      permissions: ['all']
    },
    // Dialog Events:
    GoToDialogueWithManagersGroup: {
      value: translateEventsArray(i18n, 'GoToDialogueWithManagersGroup'),
      permissions: ['all']
    },
    EndMessaging: {
      value: translateEventsArray(i18n, 'EndMessaging'),
      permissions: ['manager']
    }
  },
  hasPermission(type, message, user) {
    const rule = this.findByMessage(type, message);

    if (_.includes(rule.permissions, 'all')) {
      return true;
    }

    if (_.includes(rule.permissions, user.getType())) {
      if (_.has(rule, 'approve')) {
        return Boolean(user.approved);
      }
      return true;
    }

    return false;
  },
  findByMessage(type, message) {
    const rulesTypes = this[type];
    const rulesKeys = Object
      .keys(rulesTypes)
      .map(key => rulesTypes[key])
      .filter(item => item.value.includes(message));
 
    if (!_.isEmpty(rulesKeys)) {
      return _.first(rulesKeys);
    } else {
      return this.regularMessage.userReplyEvent;
    }
  },
  isSpecialMessage(message) {
    return !_.isEmpty(Object.keys(this.regularMessage)
      .filter(key => {
        return this.regularMessage[key].value.includes(message.text);
      })
    );
  }
};
