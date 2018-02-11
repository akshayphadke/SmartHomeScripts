var fs = require('fs');
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var changeDefaultColor = require("./changeDefaultColor");
var logger = require("./log.js")


var hue = new HueApi();

var host;
var user;

(function loadBridgeConfig() {
  var bridgeConfig;
  fs.readFile('bridge-config.json', 'utf8', (err, data) => {
    if (err) {
      logger.error("*******Bridge connecting error**********" + err);
      throw err;
    } else {
      logger.info("Obtained Bridge config");
      bridgeConfig = JSON.parse(data);
      host = bridgeConfig.bridgeIp;
      // logger.info(bridgeIp);
      createUserIfNotExist();
    }
  });
})();

// ====================== Read user or create user  ======================

// Need to press the link button if doing this for first time.
// This will create a new file user.json which will be read the next time.
function createUserIfNotExist() {

  fs.readFile('user.txt', 'utf8', (err, data) => {
    if (err) {
      logger.error(err);
      createUserAndCreateFile();
    } else {
      logger.info("Obtained user info");
      user = JSON.parse(data);
      startOps();
    }
  });
}

function createUserAndCreateFile() {
  const userDescription = "js code username";
  hue.registerUser(host, userDescription)
        .then((result) => {
            logger.error("Created user: " + JSON.stringify(result));
            fs.writeFile('user.txt', JSON.stringify(result), 'utf8', (err, data) => {
              if (err) {
                logger.error(err);
                throw err;
              } else {
                user = JSON.stringify(result);
                startOps();
              }
            });
        })
        .fail((err) => {
            logger.error(err);
        })
        .done();
}

// ====================== Do whatever operations you need to do  ======================

function startOps() {
  logger.info("Starting registered operations");
  api = new HueApi(host, user);
  changeDefaultColor.start(api);
}
