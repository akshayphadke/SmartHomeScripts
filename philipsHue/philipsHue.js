var fs = require('fs');
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var changeDefaultColor = require("./changeDefaultColor");

var hue = new HueApi();

var host;
var user;

(function loadBridgeConfig() {
  var bridgeConfig;
  fs.readFile('bridge-config.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      bridgeConfig = JSON.parse(data);
      host = bridgeConfig.bridgeIp;
      // console.log(bridgeIp);
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
      console.log(err);
      createUserAndCreateFile();
    } else {
      user = JSON.parse(data);
      startOps();
    }
  });
}

function createUserAndCreateFile() {
  const userDescription = "js code username";
  hue.registerUser(host, userDescription)
        .then((result) => {
            console.log("Created user: " + JSON.stringify(result));
            fs.writeFile('user.txt', JSON.stringify(result), 'utf8', (err, data) => {
              if (err) {
                console.log(err);
                throw err;
              } else {
                user = JSON.stringify(result);
                startOps();
              }
            });
        })
        .fail((err) => {
            console.log(err);
        })
        .done();
}

// ====================== Do whatever operations you need to do  ======================

function startOps() {
  api = new HueApi(host, user);
  changeDefaultColor.start(api);
}
