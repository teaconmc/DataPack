
var pisConfig = {
  "default": {
    "arriveDistance": 100,
    "arriveDistanceTerm": 100,
    "departDistance": 30,
    "door": "both",
    "tbOnPlat": false
  },

  "stations": {
    "exc": { "door": "left", "specDep": true },
    "npp": { "door": "right", "specDep": true },
    "sob": { "door": "right" },
    "syr": { },
    "yfp": { "door": "left" },
    "yub": { "door": "right" },
    "wyu": { },
    "est": { "door": "right" },
    "xwm": { },
    "nzr": { "door": "left" },

  },

  "routes": {
    "10s": { "annRouteName": "rel", "destName": "内环|CW Loop", isLoopLine: true },
    "10x": { "annRouteName": "rel", "destName": "外环|ACW Loop", isLoopLine: true },
    "11s": { "annRouteName": "rel" },
    "11x": { "annRouteName": "rel" },
    "20s": { "annRouteName": "aml" },
    "20x": { "annRouteName": "aml" }
  },

  "routeStations": {
    "10s_syr": { "door": "right" }, 
    "10x_syr": { "door": "left" },
    "11s_syr": { "door": "right" },
    "11x_syr": { "door": "left" },
    
    "10s_wyu": { "door": "left" }, 
    "10x_wyu": { "door": "right" },
    "11s_wyu": { "door": "right" },
    "11x_wyu": { "door": "right" },
    "20s_wyu": { "door": "left" },
    "20x_wyu": { "door": "right" },
    
    "10s_xwm": { "door": "left" }, 
    "10x_xwm": { "door": "right" },
    "11s_xwm": { "door": "left" },
    "11x_xwm": { "door": "right" },
    "20s_xwm": { "door": "left" },
    "20x_xwm": { "door": "right" },

    "11s_wyu": { "specDep": true }
  },
};

