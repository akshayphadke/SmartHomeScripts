var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

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

            for (var light of result.lights) {
              if (light.state.on && light.state.ct == DEFAULT_YELLOW_LIGHT_COLOR_TEMP) {
                state = lightState.create().colorTemp(DAYLIGHT_COLOR_TEMP);
                api.setLightState(light.id, state)
                    .then(() => {
                      console.log("Light Color changed for: " + light.name);
                    })
                    .done();
              }
            }
          })
          .done();
    }, interval * 1000);
  }
}
