var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var logger = require("./log.js")

module.exports =  {

  start : function(api) {

    const interval = 15;
    const DEFAULT_YELLOW_LIGHT_COLOR_TEMP = 366;
    const DAYLIGHT_COLOR_TEMP = 156;

    setInterval(() => {
      api.lights()
          .then((result) => {
            if (!result || !result.lights) {
              return;
            }

            // logger.info("Found " + result.lights.length + " lights");

            for (var light of result.lights) {
              if (light.state.on && light.state.ct == DEFAULT_YELLOW_LIGHT_COLOR_TEMP) {
                state = lightState.create().colorTemp(DAYLIGHT_COLOR_TEMP);
                api.setLightState(light.id, state)
                    .then(() => {
                      logger.info("Light Color changed for: " + light.name);
                    })
                    .fail((err) => {
                      logger.error("Failed to set light color " + err);
                    })
                    .done();
              }
            }
          })
          .fail((err) => {
            // console.log(err);
            logger.error(error);
          })
          .done();
    }, interval * 1000);
  }
}
