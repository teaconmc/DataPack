
var pisConfig = {
  "default": {
    "arriveDistance": 100,
    "arriveDistanceTerm": 100,
    "departDistance": 30,
    "departDistanceSpecDep": 30,
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
    "10s": { "annRouteName": "rel", isLoopLine: true,
      "destName": "内环|CW Loop", "headSideDest": "R 内环|CW Loop",
      "destInfo": "本列车运行红线\n内环方向"
    },
    "10x": { "annRouteName": "rel", isLoopLine: true,
      "destName": "外环|ACW Loop", "headSideDest": "R 外环|ACW Loop",
      "destInfo": "本列车运行红线\n外环方向"
    },
    "11s": { "annRouteName": "rel",
      "headSideDest": "RA 北角|North Point",
      "destInfo": "本列车运行红线\n外环方向, 终点是小镇西\n之后, 直通运行黄线\n北角码头方向"
    },
    "11x": { "annRouteName": "rel",
      "headSideDest": "R 小镇西|West Yuushya",
      "destInfo": "本列车运行红线\n内环方向, 终点是小镇西"
    },
    "20s": { "annRouteName": "aml",
      "headSideDest": "A 北角|North Point",
      "destInfo": "本列车运行黄线\n北角码头方向"
    },
    "20x": { "annRouteName": "aml",
      "headSideDest": "AR 小镇西|West Yuushya",
      "destInfo": "本列车运行黄线\n小镇西方向\n之后, 直通运行红线\n内环方向"
    }
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

