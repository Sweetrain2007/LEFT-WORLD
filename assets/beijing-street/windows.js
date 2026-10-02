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
    "rows": 3
  }
];
