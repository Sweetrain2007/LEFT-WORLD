(() => {
"use strict";
// Layout only; original Stage data remains the single content source.
const changjiangFolderLayout = [
  {
    "stageId": "autumn-fantasia",
    "desktop": {
      "x": 49,
      "y": 36.0
    },
    "mobile": {
      "x": 49,
      "y": 36.0
    }
  },
  {
    "stageId": "hour-25",
    "desktop": {
      "x": 46,
      "y": 41.35
    },
    "mobile": {
      "x": 42,
      "y": 41.35
    }
  },
  {
    "stageId": "one-way-screening",
    "desktop": {
      "x": 50,
      "y": 46.7
    },
    "mobile": {
      "x": 52,
      "y": 46.7
    }
  },
  {
    "stageId": "countdown",
    "desktop": {
      "x": 46.5,
      "y": 52.05
    },
    "mobile": {
      "x": 42.5,
      "y": 52.05
    }
  },
  {
    "stageId": "circle",
    "desktop": {
      "x": 51,
      "y": 57.4
    },
    "mobile": {
      "x": 52.5,
      "y": 57.4
    }
  },
  {
    "stageId": "maze",
    "desktop": {
      "x": 47,
      "y": 62.75
    },
    "mobile": {
      "x": 43,
      "y": 62.75
    }
  },
  {
    "stageId": "land",
    "desktop": {
      "x": 51.5,
      "y": 68.1
    },
    "mobile": {
      "x": 53,
      "y": 68.1
    }
  },
  {
    "stageId": "butterfly-effect",
    "desktop": {
      "x": 47.5,
      "y": 73.44999999999999
    },
    "mobile": {
      "x": 43.5,
      "y": 73.44999999999999
    }
  },
  {
    "stageId": "born-in-flames",
    "desktop": {
      "x": 51,
      "y": 78.8
    },
    "mobile": {
      "x": 53.5,
      "y": 78.8
    }
  },
  {
    "stageId": "all-in",
    "desktop": {
      "x": 47,
      "y": 84.15
    },
    "mobile": {
      "x": 43,
      "y": 84.15
    }
  },
  {
    "stageId": "bloom",
    "desktop": {
      "x": 50.5,
      "y": 89.5
    },
    "mobile": {
      "x": 53,
      "y": 89.5
    }
  },
  {
    "stageId": "landing-day",
    "desktop": {
      "x": 46.5,
      "y": 94.85
    },
    "mobile": {
      "x": 42.5,
      "y": 94.85
    }
  }
];
const viewport=document.querySelector(".desktop-scroll");
if (viewport && matchMedia("(max-width:700px)").matches) viewport.scrollLeft=(viewport.scrollWidth-viewport.clientWidth)/2;
const overlay=document.querySelector(".folder-overlay");
if(!overlay)return;
for(const item of changjiangFolderLayout){
 const stage=window.LEFT_STAGE_ARCHIVES?.[item.stageId];if(!stage)continue;
 const link=document.createElement("a");link.className="stage-folder";link.dataset.stageId=item.stageId;
 link.href="changjiang-stage-"+stage.number+".html";link.setAttribute("aria-label",stage.title);
 for(const mode of ["desktop","mobile"]){link.style.setProperty("--"+mode+"-x",item[mode].x+"%");link.style.setProperty("--"+mode+"-y",item[mode].y+"%");}
 const icon=document.createElement("img");icon.src="assets/changjiang-desktop/folder.svg";icon.alt="";
 const label=document.createElement("span");label.textContent=stage.date||stage.name;
 link.append(icon,label);overlay.append(link);
}
})();