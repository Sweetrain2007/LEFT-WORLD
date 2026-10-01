# 綦江记忆相册
仅用于 qijiang.html 的相册区域。其他页面无需引入本模块。

## 素材
- p1-cover.png：用户 P1 原文件，无任何图片编辑。
- p2-pages.png：用户 P2 原文件，无任何图片编辑。
- p3-tape-reference.png：用户 P3 原文件，仅作为参考存档，不在页面中显示。
- tapes.png：imagegen 内置工具按 P3 制作的透明胶带图集，cream / blueStripe / yellow / dots 四种。
  提示词要点：四条横向真实胶带，米白、蓝白条纹、淡黄、黑点；
  保留纤维、褶皱与撕裂边缘，透明底，不带截图 UI、文字或本子。
  CSS 只选取其中一条显示，不显示整个参考图。

## 数据
memories.js 中的 memorySpreads 是唯一照片/视频配置。
第一项 left/right 保持空数组，它使用 P1。其余项使用 P2。
每个 left/right 最多放两项。原有 13 张照片与 1 个视频继续引用原项目文件。
新增的 20 张照片按提供顺序保存在 photos/，完整保留原始文件。
当前共 27 组双页（含扉页），66 张照片、1 个视频。
长竖图（高度 / 宽度 ≥ 1.25）独占一面；其他照片每面 1–2 张，保持原顺序。
路径相对于 qijiang.html。

### 新照片
在某一组 left 或 right 数组中增加：
{ type: "image", src: "images/my-photo.jpg", width: 1200, height: 1600,
  alt: "照片的无障碍描述", rotation: -2, tapeStyle: "blueStripe", tapes: 1 }
width/height 填原图宽高；alt 只用于辅助技术，不在纸面显示。
没有空间时增加一个 { left: [...], right: [...] }，不要给每面放超过两项。

### 新视频
{ type: "video", src: "videos/my-memory.mp4", poster: "images/my-memory-poster.jpg",
  width: 1920, height: 1080, rotation: 2, tapeStyle: "cream", tapes: 2 }
推荐提供静态封面 poster。未设置 poster 时，使用静音、无 controls、不自动播放的
视频首帧作为纸面缩略图（#t=0.1）。当前已有綦江视频保留此首帧方案。
查看层仍不自动播放，用户使用 controls 播放；关闭时暂停并卸载源。

## 交互
点击纸面空白翻页；桌面也支持左右方向键。点击内容只打开查看层。
850ms 单张纸双面 rotateY 动画，内容和胶带都在纸页节点中。
中央线圈是原始 P2 的局部显示层，固定不翻转。
系统减少动态效果时直接切页。
关闭查看层不改变 current spread；没有持久化或路由变化。

## 验证
本地内置 Chromium：桌面及 390x844 窄屏，前后翻页、首尾禁用、
点击隔离、视频初始暂停/controls、查看层关闭和 Esc、无横向溢出。
不等同于 iPhone Safari/Android 实机验证。

本批新增 32 张照片从第 9 个单页开始插入，原第 9 页起内容顺延。具体对应见 photo-page-map.md。

新增白色外套戴黑帽照片独占第 31 单页，原第 31 页起顺延，前 30 页不变。
