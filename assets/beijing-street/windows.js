// Coordinates refer to the complete, unaltered street PNG (1719 × 904).
// houseId identifies the five illustrated houses from left to right.
const beijingWindows = [
  {
    "id": "beijing-window-01",
    "houseId": "house-01",
    "x": 13.14718,
    "y": 28.31858,
    "width": 2.15241,
    "height": 6.74779,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-02",
    "houseId": "house-01",
    "x": 8.31879,
    "y": 44.80088,
    "width": 2.38511,
    "height": 9.0708,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-03",
    "houseId": "house-01",
    "x": 17.27749,
    "y": 44.80088,
    "width": 2.32693,
    "height": 9.18142,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-04",
    "houseId": "house-01",
    "x": 8.37696,
    "y": 61.61504,
    "width": 2.32693,
    "height": 8.40708,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-05",
    "houseId": "house-01",
    "x": 17.27749,
    "y": 61.61504,
    "width": 2.44328,
    "height": 8.29646,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-06",
    "houseId": "house-01",
    "x": 8.31879,
    "y": 76.88053,
    "width": 2.32693,
    "height": 8.62832,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-07",
    "houseId": "house-02",
    "x": 28.3886,
    "y": 36.9469,
    "width": 2.03607,
    "height": 4.86726,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-08",
    "houseId": "house-02",
    "x": 38.56894,
    "y": 37.05752,
    "width": 1.97789,
    "height": 4.86726,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-09",
    "houseId": "house-02",
    "x": 28.27225,
    "y": 51.54867,
    "width": 2.38511,
    "height": 8.07522,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-10",
    "houseId": "house-02",
    "x": 38.45259,
    "y": 51.54867,
    "width": 2.21059,
    "height": 8.07522,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-11",
    "houseId": "house-03",
    "x": 47.99302,
    "y": 29.42478,
    "width": 1.80337,
    "height": 4.42478,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-12",
    "houseId": "house-03",
    "x": 55.43921,
    "y": 29.31416,
    "width": 1.7452,
    "height": 4.5354,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-13",
    "houseId": "house-03",
    "x": 48.28389,
    "y": 44.69027,
    "width": 2.26876,
    "height": 8.62832,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-14",
    "houseId": "house-03",
    "x": 55.14834,
    "y": 44.57965,
    "width": 2.26876,
    "height": 8.73894,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-15",
    "houseId": "house-03",
    "x": 55.38104,
    "y": 71.12832,
    "width": 2.26876,
    "height": 10.61947,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-16",
    "houseId": "house-04",
    "x": 69.45899,
    "y": 31.52655,
    "width": 2.15241,
    "height": 5.86283,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-17",
    "houseId": "house-04",
    "x": 65.61955,
    "y": 46.79204,
    "width": 2.32693,
    "height": 9.0708,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-18",
    "houseId": "house-04",
    "x": 73.82199,
    "y": 46.5708,
    "width": 2.32693,
    "height": 9.62389,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-19",
    "houseId": "house-05",
    "x": 84.11867,
    "y": 35.39823,
    "width": 1.80337,
    "height": 4.86726,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-20",
    "houseId": "house-05",
    "x": 93.0192,
    "y": 35.39823,
    "width": 1.91972,
    "height": 4.86726,
    "arched": true,
    "rows": 2
  },
  {
    "id": "beijing-window-21",
    "houseId": "house-05",
    "x": 83.88598,
    "y": 50.44248,
    "width": 2.26876,
    "height": 8.40708,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-22",
    "houseId": "house-05",
    "x": 93.07737,
    "y": 50.66372,
    "width": 2.26876,
    "height": 8.18584,
    "arched": false,
    "rows": 3
  },
  {
    "id": "beijing-window-23",
    "houseId": "house-05",
    "x": 83.94415,
    "y": 73.45133,
    "width": 2.44328,
    "height": 11.06195,
    "arched": false,
    "rows": 4
  }
];

// Stable cells: numbered left-to-right, top-to-bottom inside each existing window.
// Coordinates are relative to that window, inset from the painted mullions.
const beijingWindowCells = [
  {
    "id": "beijing-window-01-cell-01",
    "windowId": "beijing-window-01",
    "houseId": "house-01",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 37,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-01-cell-02",
    "windowId": "beijing-window-01",
    "houseId": "house-01",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 37,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-01-cell-03",
    "windowId": "beijing-window-01",
    "houseId": "house-01",
    "x": 3,
    "y": 46,
    "width": 41,
    "height": 51
  },
  {
    "id": "beijing-window-01-cell-04",
    "windowId": "beijing-window-01",
    "houseId": "house-01",
    "x": 57,
    "y": 46,
    "width": 40,
    "height": 51
  },
  {
    "id": "beijing-window-02-cell-01",
    "windowId": "beijing-window-02",
    "houseId": "house-01",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-02-cell-02",
    "windowId": "beijing-window-02",
    "houseId": "house-01",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-02-cell-03",
    "windowId": "beijing-window-02",
    "houseId": "house-01",
    "x": 3,
    "y": 36,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-02-cell-04",
    "windowId": "beijing-window-02",
    "houseId": "house-01",
    "x": 57,
    "y": 36,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-02-cell-05",
    "windowId": "beijing-window-02",
    "houseId": "house-01",
    "x": 3,
    "y": 71,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-02-cell-06",
    "windowId": "beijing-window-02",
    "houseId": "house-01",
    "x": 57,
    "y": 71,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-03-cell-01",
    "windowId": "beijing-window-03",
    "houseId": "house-01",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-03-cell-02",
    "windowId": "beijing-window-03",
    "houseId": "house-01",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-03-cell-03",
    "windowId": "beijing-window-03",
    "houseId": "house-01",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-03-cell-04",
    "windowId": "beijing-window-03",
    "houseId": "house-01",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-03-cell-05",
    "windowId": "beijing-window-03",
    "houseId": "house-01",
    "x": 3,
    "y": 71,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-03-cell-06",
    "windowId": "beijing-window-03",
    "houseId": "house-01",
    "x": 57,
    "y": 71,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-04-cell-01",
    "windowId": "beijing-window-04",
    "houseId": "house-01",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-04-cell-02",
    "windowId": "beijing-window-04",
    "houseId": "house-01",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-04-cell-03",
    "windowId": "beijing-window-04",
    "houseId": "house-01",
    "x": 3,
    "y": 36,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-04-cell-04",
    "windowId": "beijing-window-04",
    "houseId": "house-01",
    "x": 57,
    "y": 36,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-04-cell-05",
    "windowId": "beijing-window-04",
    "houseId": "house-01",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-04-cell-06",
    "windowId": "beijing-window-04",
    "houseId": "house-01",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-05-cell-01",
    "windowId": "beijing-window-05",
    "houseId": "house-01",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-05-cell-02",
    "windowId": "beijing-window-05",
    "houseId": "house-01",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-05-cell-03",
    "windowId": "beijing-window-05",
    "houseId": "house-01",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 29
  },
  {
    "id": "beijing-window-05-cell-04",
    "windowId": "beijing-window-05",
    "houseId": "house-01",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 29
  },
  {
    "id": "beijing-window-05-cell-05",
    "windowId": "beijing-window-05",
    "houseId": "house-01",
    "x": 3,
    "y": 73,
    "width": 41,
    "height": 25
  },
  {
    "id": "beijing-window-05-cell-06",
    "windowId": "beijing-window-05",
    "houseId": "house-01",
    "x": 57,
    "y": 73,
    "width": 40,
    "height": 25
  },
  {
    "id": "beijing-window-06-cell-01",
    "windowId": "beijing-window-06",
    "houseId": "house-01",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-06-cell-02",
    "windowId": "beijing-window-06",
    "houseId": "house-01",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-06-cell-03",
    "windowId": "beijing-window-06",
    "houseId": "house-01",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-06-cell-04",
    "windowId": "beijing-window-06",
    "houseId": "house-01",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-06-cell-05",
    "windowId": "beijing-window-06",
    "houseId": "house-01",
    "x": 3,
    "y": 73,
    "width": 41,
    "height": 25
  },
  {
    "id": "beijing-window-06-cell-06",
    "windowId": "beijing-window-06",
    "houseId": "house-01",
    "x": 57,
    "y": 73,
    "width": 40,
    "height": 25
  },
  {
    "id": "beijing-window-07-cell-01",
    "windowId": "beijing-window-07",
    "houseId": "house-02",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 42,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-07-cell-02",
    "windowId": "beijing-window-07",
    "houseId": "house-02",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 42,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-07-cell-03",
    "windowId": "beijing-window-07",
    "houseId": "house-02",
    "x": 3,
    "y": 52,
    "width": 41,
    "height": 46
  },
  {
    "id": "beijing-window-07-cell-04",
    "windowId": "beijing-window-07",
    "houseId": "house-02",
    "x": 57,
    "y": 52,
    "width": 40,
    "height": 46
  },
  {
    "id": "beijing-window-08-cell-01",
    "windowId": "beijing-window-08",
    "houseId": "house-02",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 41,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-08-cell-02",
    "windowId": "beijing-window-08",
    "houseId": "house-02",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 41,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-08-cell-03",
    "windowId": "beijing-window-08",
    "houseId": "house-02",
    "x": 3,
    "y": 51,
    "width": 41,
    "height": 47
  },
  {
    "id": "beijing-window-08-cell-04",
    "windowId": "beijing-window-08",
    "houseId": "house-02",
    "x": 57,
    "y": 51,
    "width": 40,
    "height": 47
  },
  {
    "id": "beijing-window-09-cell-01",
    "windowId": "beijing-window-09",
    "houseId": "house-02",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 29
  },
  {
    "id": "beijing-window-09-cell-02",
    "windowId": "beijing-window-09",
    "houseId": "house-02",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 29
  },
  {
    "id": "beijing-window-09-cell-03",
    "windowId": "beijing-window-09",
    "houseId": "house-02",
    "x": 3,
    "y": 39,
    "width": 41,
    "height": 25
  },
  {
    "id": "beijing-window-09-cell-04",
    "windowId": "beijing-window-09",
    "houseId": "house-02",
    "x": 57,
    "y": 39,
    "width": 40,
    "height": 25
  },
  {
    "id": "beijing-window-09-cell-05",
    "windowId": "beijing-window-09",
    "houseId": "house-02",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-09-cell-06",
    "windowId": "beijing-window-09",
    "houseId": "house-02",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-10-cell-01",
    "windowId": "beijing-window-10",
    "houseId": "house-02",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 29
  },
  {
    "id": "beijing-window-10-cell-02",
    "windowId": "beijing-window-10",
    "houseId": "house-02",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 29
  },
  {
    "id": "beijing-window-10-cell-03",
    "windowId": "beijing-window-10",
    "houseId": "house-02",
    "x": 3,
    "y": 39,
    "width": 41,
    "height": 25
  },
  {
    "id": "beijing-window-10-cell-04",
    "windowId": "beijing-window-10",
    "houseId": "house-02",
    "x": 57,
    "y": 39,
    "width": 40,
    "height": 25
  },
  {
    "id": "beijing-window-10-cell-05",
    "windowId": "beijing-window-10",
    "houseId": "house-02",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-10-cell-06",
    "windowId": "beijing-window-10",
    "houseId": "house-02",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-11-cell-01",
    "windowId": "beijing-window-11",
    "houseId": "house-03",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 41,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-11-cell-02",
    "windowId": "beijing-window-11",
    "houseId": "house-03",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 41,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-11-cell-03",
    "windowId": "beijing-window-11",
    "houseId": "house-03",
    "x": 3,
    "y": 52,
    "width": 41,
    "height": 46
  },
  {
    "id": "beijing-window-11-cell-04",
    "windowId": "beijing-window-11",
    "houseId": "house-03",
    "x": 57,
    "y": 52,
    "width": 40,
    "height": 46
  },
  {
    "id": "beijing-window-12-cell-01",
    "windowId": "beijing-window-12",
    "houseId": "house-03",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 41,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-12-cell-02",
    "windowId": "beijing-window-12",
    "houseId": "house-03",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 41,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-12-cell-03",
    "windowId": "beijing-window-12",
    "houseId": "house-03",
    "x": 3,
    "y": 52,
    "width": 41,
    "height": 46
  },
  {
    "id": "beijing-window-12-cell-04",
    "windowId": "beijing-window-12",
    "houseId": "house-03",
    "x": 57,
    "y": 52,
    "width": 40,
    "height": 46
  },
  {
    "id": "beijing-window-13-cell-01",
    "windowId": "beijing-window-13",
    "houseId": "house-03",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-13-cell-02",
    "windowId": "beijing-window-13",
    "houseId": "house-03",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-13-cell-03",
    "windowId": "beijing-window-13",
    "houseId": "house-03",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-13-cell-04",
    "windowId": "beijing-window-13",
    "houseId": "house-03",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-13-cell-05",
    "windowId": "beijing-window-13",
    "houseId": "house-03",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-13-cell-06",
    "windowId": "beijing-window-13",
    "houseId": "house-03",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-14-cell-01",
    "windowId": "beijing-window-14",
    "houseId": "house-03",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-14-cell-02",
    "windowId": "beijing-window-14",
    "houseId": "house-03",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-14-cell-03",
    "windowId": "beijing-window-14",
    "houseId": "house-03",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-14-cell-04",
    "windowId": "beijing-window-14",
    "houseId": "house-03",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-14-cell-05",
    "windowId": "beijing-window-14",
    "houseId": "house-03",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-14-cell-06",
    "windowId": "beijing-window-14",
    "houseId": "house-03",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-15-cell-01",
    "windowId": "beijing-window-15",
    "houseId": "house-03",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-15-cell-02",
    "windowId": "beijing-window-15",
    "houseId": "house-03",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-15-cell-03",
    "windowId": "beijing-window-15",
    "houseId": "house-03",
    "x": 3,
    "y": 36,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-15-cell-04",
    "windowId": "beijing-window-15",
    "houseId": "house-03",
    "x": 57,
    "y": 36,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-15-cell-05",
    "windowId": "beijing-window-15",
    "houseId": "house-03",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-15-cell-06",
    "windowId": "beijing-window-15",
    "houseId": "house-03",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-16-cell-01",
    "windowId": "beijing-window-16",
    "houseId": "house-04",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 44,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-16-cell-02",
    "windowId": "beijing-window-16",
    "houseId": "house-04",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 44,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-16-cell-03",
    "windowId": "beijing-window-16",
    "houseId": "house-04",
    "x": 3,
    "y": 54,
    "width": 41,
    "height": 44
  },
  {
    "id": "beijing-window-16-cell-04",
    "windowId": "beijing-window-16",
    "houseId": "house-04",
    "x": 57,
    "y": 54,
    "width": 40,
    "height": 44
  },
  {
    "id": "beijing-window-17-cell-01",
    "windowId": "beijing-window-17",
    "houseId": "house-04",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-17-cell-02",
    "windowId": "beijing-window-17",
    "houseId": "house-04",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-17-cell-03",
    "windowId": "beijing-window-17",
    "houseId": "house-04",
    "x": 3,
    "y": 38,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-17-cell-04",
    "windowId": "beijing-window-17",
    "houseId": "house-04",
    "x": 57,
    "y": 38,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-17-cell-05",
    "windowId": "beijing-window-17",
    "houseId": "house-04",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-17-cell-06",
    "windowId": "beijing-window-17",
    "houseId": "house-04",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-18-cell-01",
    "windowId": "beijing-window-18",
    "houseId": "house-04",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-18-cell-02",
    "windowId": "beijing-window-18",
    "houseId": "house-04",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-18-cell-03",
    "windowId": "beijing-window-18",
    "houseId": "house-04",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-18-cell-04",
    "windowId": "beijing-window-18",
    "houseId": "house-04",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-18-cell-05",
    "windowId": "beijing-window-18",
    "houseId": "house-04",
    "x": 3,
    "y": 72,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-18-cell-06",
    "windowId": "beijing-window-18",
    "houseId": "house-04",
    "x": 57,
    "y": 72,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-19-cell-01",
    "windowId": "beijing-window-19",
    "houseId": "house-05",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 41,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-19-cell-02",
    "windowId": "beijing-window-19",
    "houseId": "house-05",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 41,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-19-cell-03",
    "windowId": "beijing-window-19",
    "houseId": "house-05",
    "x": 3,
    "y": 52,
    "width": 41,
    "height": 46
  },
  {
    "id": "beijing-window-19-cell-04",
    "windowId": "beijing-window-19",
    "houseId": "house-05",
    "x": 57,
    "y": 52,
    "width": 40,
    "height": 46
  },
  {
    "id": "beijing-window-20-cell-01",
    "windowId": "beijing-window-20",
    "houseId": "house-05",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 41,
    "shape": "arch-left"
  },
  {
    "id": "beijing-window-20-cell-02",
    "windowId": "beijing-window-20",
    "houseId": "house-05",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 41,
    "shape": "arch-right"
  },
  {
    "id": "beijing-window-20-cell-03",
    "windowId": "beijing-window-20",
    "houseId": "house-05",
    "x": 3,
    "y": 52,
    "width": 41,
    "height": 46
  },
  {
    "id": "beijing-window-20-cell-04",
    "windowId": "beijing-window-20",
    "houseId": "house-05",
    "x": 57,
    "y": 52,
    "width": 40,
    "height": 46
  },
  {
    "id": "beijing-window-21-cell-01",
    "windowId": "beijing-window-21",
    "houseId": "house-05",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 26
  },
  {
    "id": "beijing-window-21-cell-02",
    "windowId": "beijing-window-21",
    "houseId": "house-05",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 26
  },
  {
    "id": "beijing-window-21-cell-03",
    "windowId": "beijing-window-21",
    "houseId": "house-05",
    "x": 3,
    "y": 37,
    "width": 41,
    "height": 28
  },
  {
    "id": "beijing-window-21-cell-04",
    "windowId": "beijing-window-21",
    "houseId": "house-05",
    "x": 57,
    "y": 37,
    "width": 40,
    "height": 28
  },
  {
    "id": "beijing-window-21-cell-05",
    "windowId": "beijing-window-21",
    "houseId": "house-05",
    "x": 3,
    "y": 74,
    "width": 41,
    "height": 24
  },
  {
    "id": "beijing-window-21-cell-06",
    "windowId": "beijing-window-21",
    "houseId": "house-05",
    "x": 57,
    "y": 74,
    "width": 40,
    "height": 24
  },
  {
    "id": "beijing-window-22-cell-01",
    "windowId": "beijing-window-22",
    "houseId": "house-05",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-22-cell-02",
    "windowId": "beijing-window-22",
    "houseId": "house-05",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-22-cell-03",
    "windowId": "beijing-window-22",
    "houseId": "house-05",
    "x": 3,
    "y": 38,
    "width": 41,
    "height": 27
  },
  {
    "id": "beijing-window-22-cell-04",
    "windowId": "beijing-window-22",
    "houseId": "house-05",
    "x": 57,
    "y": 38,
    "width": 40,
    "height": 27
  },
  {
    "id": "beijing-window-22-cell-05",
    "windowId": "beijing-window-22",
    "houseId": "house-05",
    "x": 3,
    "y": 74,
    "width": 41,
    "height": 24
  },
  {
    "id": "beijing-window-22-cell-06",
    "windowId": "beijing-window-22",
    "houseId": "house-05",
    "x": 57,
    "y": 74,
    "width": 40,
    "height": 24
  },
  {
    "id": "beijing-window-23-cell-01",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 3,
    "y": 2,
    "width": 41,
    "height": 21
  },
  {
    "id": "beijing-window-23-cell-02",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 57,
    "y": 2,
    "width": 40,
    "height": 21
  },
  {
    "id": "beijing-window-23-cell-03",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 3,
    "y": 30,
    "width": 41,
    "height": 19
  },
  {
    "id": "beijing-window-23-cell-04",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 57,
    "y": 30,
    "width": 40,
    "height": 19
  },
  {
    "id": "beijing-window-23-cell-05",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 3,
    "y": 56,
    "width": 41,
    "height": 18
  },
  {
    "id": "beijing-window-23-cell-06",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 57,
    "y": 56,
    "width": 40,
    "height": 18
  },
  {
    "id": "beijing-window-23-cell-07",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 3,
    "y": 81,
    "width": 41,
    "height": 17
  },
  {
    "id": "beijing-window-23-cell-08",
    "windowId": "beijing-window-23",
    "houseId": "house-05",
    "x": 57,
    "y": 81,
    "width": 40,
    "height": 17
  }
];
