// The first spread is the supplied P1 cover; keep both arrays empty.

// Media paths are relative to qijiang.html. One or two items per paper side.

const memorySpreads = [
  {
    "left": [],
    "right": []
  },
  {
    "left": [
      {
        "type": "video",
        "src": "videos/qijiang-memory.mp4",
        "width": 16,
        "height": 9,
        "rotation": -2,
        "tapeStyle": "cream"
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "images/qijiang-album-photo.jpg",
        "alt": "相册照片：戴黑色帽子的左航",
        "width": 1206,
        "height": 904,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "images/qijiang-4a14f3d98683dadef48f34aa1c57dc0e.png",
        "alt": "记忆相册照片 2",
        "width": 1513,
        "height": 1040,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "images/qijiang-cb6bff0aa98630e5994e8df80d94b04b.jpg",
        "alt": "记忆相册照片 3",
        "width": 1206,
        "height": 669,
        "rotation": 1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "images/qijiang-36ba34d90a9fa77bec8cc1a57594066b.jpg",
        "alt": "记忆相册照片 4",
        "width": 1206,
        "height": 1191,
        "rotation": -3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "images/qijiang-60e4f43388a83a24d907d66798943d2b.jpg",
        "alt": "记忆相册照片 5",
        "width": 1206,
        "height": 1856,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "images/qijiang-910208c629aa59b92d004ba9148dbcf7.jpg",
        "alt": "记忆相册照片 6",
        "width": 2000,
        "height": 1499,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "images/qijiang-d0253547fbd3ff0a7d0285c8f0f886a5.jpg",
        "alt": "记忆相册照片 7",
        "width": 670,
        "height": 502,
        "rotation": 1,
        "tapeStyle": "yellow",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/7b4dd10c2f87d32022a0a005beea5f5a.jpg",
        "alt": "新增相册照片 1",
        "width": 1206,
        "height": 1536,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/3f3ff2348eae76969aa80bafff49a91c.jpg",
        "alt": "新增相册照片 2",
        "width": 1206,
        "height": 902,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/c8b0950cb7b61e4cc2eba7212d1de640.jpg",
        "alt": "新增相册照片 3",
        "width": 1206,
        "height": 901,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/08ee6b5b7b55b6e3c1309b77c05faad2.jpg",
        "alt": "新增相册照片 4",
        "width": 1206,
        "height": 899,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/757e8f66dadfe767bdc66aee59d2190e.jpg",
        "alt": "新增相册照片 5",
        "width": 1206,
        "height": 898,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/38186d5f4caf0c9bfbbc0e5f2950cedf.jpg",
        "alt": "新增相册照片 6",
        "width": 1206,
        "height": 934,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/f19c6c886031cbab859c46397be9129b.jpg",
        "alt": "新增相册照片 7",
        "width": 1206,
        "height": 1529,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/7ccf6465113f38dd712d54945dba5d42.jpg",
        "alt": "新增相册照片 8",
        "width": 1206,
        "height": 1441,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/50103e2e8628b21c60519859f6e8463f.jpg",
        "alt": "新增相册照片 9",
        "width": 1206,
        "height": 912,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/47a4830e116baa7f97c51100510c7078.jpg",
        "alt": "新增相册照片 10",
        "width": 1206,
        "height": 885,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/d9bcab2de4319a94e565dab291092e93.jpg",
        "alt": "新增相册照片 11",
        "width": 1206,
        "height": 1412,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/4b0288f215bcc70d4e668511616ef2cd.jpg",
        "alt": "新增相册照片 12",
        "width": 629,
        "height": 561,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/468323004dd8a8a920b631e373519e82.jpg",
        "alt": "新增相册照片 13",
        "width": 1206,
        "height": 1285,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/7f73b4042ff66bf8c238472f07e14451.jpg",
        "alt": "新增相册照片 14",
        "width": 1206,
        "height": 1603,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/0ed3139ff42404f88131d74d282d68ca.jpg",
        "alt": "新增相册照片 15",
        "width": 1206,
        "height": 902,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/19b7f3f0c150f4bdc89c0a93170e45ab.jpg",
        "alt": "新增相册照片 16",
        "width": 1206,
        "height": 1779,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/7b8d38c59a9e98f14a5d895e123ddcd7.jpg",
        "alt": "新增相册照片 17",
        "width": 1206,
        "height": 1219,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/6fa1e6c3f8b3330a8a9b6c58fd5d6cf3.jpg",
        "alt": "新增相册照片 18",
        "width": 1206,
        "height": 1452,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/db4a921e407f05938dd6d77bd4bf1802.jpg",
        "alt": "新增相册照片 19",
        "width": 1206,
        "height": 1605,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/dc4a07ce4bbffe30be88a5e852b59aba.jpg",
        "alt": "新增相册照片 20",
        "width": 1206,
        "height": 741,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/e572494240e9964663655ae4a5a04e20.jpg",
        "alt": "新增相册照片 21",
        "width": 1090,
        "height": 1936,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/a83b15c10b0cb254f7ef662d2379555d.jpg",
        "alt": "新增相册照片 22",
        "width": 1206,
        "height": 1140,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/9a0c753cf80788070614002dc2361940.jpg",
        "alt": "新增相册照片 23",
        "width": 1206,
        "height": 1509,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/6f8d89a28a5ccfc3437c5f0db1527c0f.jpg",
        "alt": "新增相册照片 24",
        "width": 1206,
        "height": 1600,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/fcdaf6ad514dfac478ebbc73a6871d69.jpg",
        "alt": "新增相册照片 25",
        "width": 1206,
        "height": 1204,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/29633c2d1c3679104ce78943c76ab1f0.jpg",
        "alt": "新增相册照片 26",
        "width": 1206,
        "height": 1197,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/621179b0a33747563e93db85883b9e3d.jpg",
        "alt": "新增相册照片 27",
        "width": 1206,
        "height": 1600,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/df40b118f592a28858e010bd62f16368.jpg",
        "alt": "新增相册照片 28",
        "width": 1206,
        "height": 904,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/378efbc8f226f6f0cfd2209a1651e7de.jpg",
        "alt": "新增相册照片 29",
        "width": 1206,
        "height": 1206,
        "rotation": -2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/ad648252220ce2396f085a2d06fcbf7d.jpg",
        "alt": "新增相册照片 30",
        "width": 1206,
        "height": 904,
        "rotation": 2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/d873f054189d2755a60c1b332fb56d53.jpg",
        "alt": "新增相册照片 31",
        "width": 1206,
        "height": 898,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/d5de152f82c8eb4dc190bb8c4ed44ce9.jpg",
        "alt": "相册照片：白色外套戴黑帽",
        "width": 1206,
        "height": 1583,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/6e7df9b97adc1ca9c3d0c0f91826a990.jpg",
        "alt": "新增相册照片 32",
        "width": 1206,
        "height": 1201,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "images/qijiang-69cbc33f2d4d304fe16a63a87c8990d2.jpg",
        "alt": "记忆相册照片 8",
        "width": 2000,
        "height": 1125,
        "rotation": -3,
        "tapeStyle": "dots",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "images/qijiang-f9eaa4879241d3bcecdfebf471c2e993.jpg",
        "alt": "记忆相册照片 9",
        "width": 2000,
        "height": 1125,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "images/qijiang-db12fb9be15f45aa6dafa50f30d686b2.jpg",
        "alt": "记忆相册照片 10",
        "width": 2000,
        "height": 1125,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 2
      },
      {
        "type": "image",
        "src": "images/qijiang-141f66464bdc478f47fc38763120e821.jpg",
        "alt": "记忆相册照片 11",
        "width": 2000,
        "height": 1125,
        "rotation": 1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "images/qijiang-7f3e573539942c24a3c744a8d0fa8922.jpg",
        "alt": "记忆相册照片 12",
        "width": 1686,
        "height": 1686,
        "rotation": -3,
        "tapeStyle": "dots",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "images/qijiang-87c80ded5fe09b61948c47afc1442656.jpg",
        "alt": "记忆相册照片 13",
        "width": 2000,
        "height": 1333,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/a9b240ea4823442b784b7813c3337ba8.jpg",
        "alt": "记忆相册照片 14",
        "width": 2000,
        "height": 1500,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/25d5996abab8877596e45a5dd83a41f7.jpg",
        "alt": "记忆相册照片 15",
        "width": 2000,
        "height": 1334,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/cc08a72ba9b12383a75622469f0c59e7.jpg",
        "alt": "记忆相册照片 16",
        "width": 2000,
        "height": 2667,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/d04f1eeb1e32b4fcea72601c690cbd00.jpg",
        "alt": "记忆相册照片 17",
        "width": 611,
        "height": 855,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/39084ef3b3bd067f0cc11b0be74206a9.jpg",
        "alt": "记忆相册照片 18",
        "width": 1080,
        "height": 1080,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      },
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/f2486c3f5061e5e28d218778da926a2b.jpg",
        "alt": "记忆相册照片 19",
        "width": 1179,
        "height": 956,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/a9fa15204dd2c6218d60be7973aa59a8.jpg",
        "alt": "记忆相册照片 20",
        "width": 1206,
        "height": 2265,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/c044e07db888d01c82d8d8af9ca86700.jpg",
        "alt": "记忆相册照片 21",
        "width": 955,
        "height": 683,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/0a94adb5b99fe9b361188759a6b7a684.jpg",
        "alt": "记忆相册照片 22",
        "width": 1206,
        "height": 2107,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/b9252a9749dbebaa479dc9dafde49c66.jpg",
        "alt": "记忆相册照片 23",
        "width": 1206,
        "height": 1313,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/bcd59928339104e9f23b2b41ecdf5a63.jpg",
        "alt": "记忆相册照片 24",
        "width": 1206,
        "height": 1785,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/df9874f22b416d8dc15ce5e50336e8ea.jpg",
        "alt": "记忆相册照片 25",
        "width": 995,
        "height": 1813,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/d519256a4e70d95c9c747d2fa975b47f.jpg",
        "alt": "记忆相册照片 26",
        "width": 1031,
        "height": 1904,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/3333acbe7225faaebf840cdf024d67c5.jpg",
        "alt": "记忆相册照片 27",
        "width": 1033,
        "height": 1837,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/cf91d03364171fae51cd8f089d9d2511.jpg",
        "alt": "记忆相册照片 28",
        "width": 1029,
        "height": 1547,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/729c9416c59465adba64f3e5c953ab4b.jpg",
        "alt": "记忆相册照片 29",
        "width": 1025,
        "height": 1548,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/386c38f1d04f8c1c4f3a19cbb4f69e9a.jpg",
        "alt": "记忆相册照片 30",
        "width": 1206,
        "height": 2017,
        "rotation": -2,
        "tapeStyle": "blueStripe",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/6aa7fbabf698ddc21f9501b18f89bd51.jpg",
        "alt": "记忆相册照片 31",
        "width": 951,
        "height": 2408,
        "rotation": 2,
        "tapeStyle": "cream",
        "tapes": 2
      }
    ],
    "right": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/ddc3858e3c82a90f05d15356a52fd982.jpg",
        "alt": "记忆相册照片 32",
        "width": 1206,
        "height": 2274,
        "rotation": -1,
        "tapeStyle": "yellow",
        "tapes": 1
      }
    ]
  },
  {
    "left": [
      {
        "type": "image",
        "src": "assets/qijiang-album/photos/064634db8847d44b547b0ad7987400f5.jpg",
        "alt": "记忆相册照片 33",
        "width": 1206,
        "height": 1809,
        "rotation": 3,
        "tapeStyle": "dots",
        "tapes": 2
      }
    ],
    "right": []
  }
];

window.QIJIANG_ALBUM = {memorySpreads, cover:"assets/qijiang-album/p1-cover-web.webp", pages:"assets/qijiang-album/p2-pages-web.webp", flipDuration:850};

