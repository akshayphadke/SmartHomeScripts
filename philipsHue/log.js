var log4js = require('log4js');

log4js.configure({
  appenders: { philips: { type: 'file', filename: './logs/philips-log.log' } },
  categories: { default: { appenders: ['philips'], level: 'info' } }
});

const logger = log4js.getLogger('philips');

module.exports =  {

  error : function(msg) {
    console.log("Writing errors to log file");
    logger.error(msg);
  },

  info : function(msg) {
    console.log("Writing info to log file");
    logger.info(msg);
  }
}
