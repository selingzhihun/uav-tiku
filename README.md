# 无人机题库宝典 H5
> **线上地址：https://selingzhihun.github.io/uav-tiku/** · 仓库：https://github.com/selingzhihun/uav-tiku（push main 自动部署）

纯原生（vanilla JS/CSS）单页刷题应用：**零依赖、零网络请求、全离线可用**。
全部交付物只有两个文件：`index.html`（页面与逻辑）+ `data.js`（题库数据），可部署到任何静态托管平台。

## 功能一览

- **首页统计卡**：总题数 / 单选题 / 多选题 / 已刷题数 / 正确率
- **顺序刷题**：按题库 id 顺序逐题练习
- **随机刷题**：全题库乱序练习
- **多选专练**：只刷多选题，勾选后点"确认答案"统一判定
- **模拟考试**：随机抽 30 道单选题，20 分钟倒计时（到时自动交卷），评分页含得分 / 正确率 / 错题回顾，错题自动并入错题本
- **错题本**：答错自动收录；重练答对自动移出；支持单条移除
- **我的收藏**：刷题页一键收藏 / 取消；列表可重练、可取消收藏
- 单选点击即判定；判定后正确选项绿色高亮、错选红色，并显示"正确答案：X"
- **答后解析**：278 题带解析，判定后在结果条下方展示（刷题页 + 每日一题）
- **每日一题**：按日期种子出题，答错进错题本，连续打卡激励回流
- 所有进度保存在浏览器 localStorage，**换设备或清除浏览器数据后重置**

## 文件结构

```
h5/
├── index.html            # 页面结构、样式与全部逻辑（单文件应用，含个人主页/成就/备份）
├── data.js               # 题库：window.QUESTIONS = [...]（1422 题：单选1228+多选194，2026-11-09扩充）
├── cloud-config.js       # 云同步配置（可选）：填 LeanCloud AppID/AppKey 即激活注册登录+云端备份
├── manifest.webmanifest  # PWA清单（可安装到手机桌面，全屏无浏览器框运行）
├── sw.js                 # ServiceWorker离线缓存（https/localhost 自动激活，装过一次断网也能刷）
├── icon-512.png / icon-192.png  # 应用图标
└── README.md             # 本说明
```

> **注册登录 / 云同步**：默认为本地模式（数据仅存本机）。按项目根目录《云同步开通教程.md》注册 LeanCloud 免费版并把 2 个 key 填进 `cloud-config.js`，刷新页面即激活"登录/注册 + 云端备份恢复"。部署上线的用户注意：部署时把 `cloud-config.js` 一起上传。

> **PWA 说明**：部署到 `https://` 后，手机浏览器菜单里会出现"添加到主屏幕/安装应用"，装完就像原生App一样全屏打开；首次打开后题目与页面全部本地缓存，**断网也能刷**。更新题库时把 sw.js 里 `CACHE = 'wrh5-v…'` 的版本号加一即可强制刷新缓存。

## 一、本地运行

**方式 1：直接打开（最简单）**
双击 `index.html`，用 Chrome / Edge / Safari 等现代浏览器打开即可，无需任何服务器。

**方式 2：本地静态服务器（推荐，行为与线上一致）**

```bash
# 无人机题库宝典 H5
> **线上地址：https://selingzhihun.github.io/uav-tiku/** · 仓库：https://github.com/selingzhihun/uav-tiku（push main 自动部署）
python -m http.server 8080
# 无人机题库宝典 H5
> **线上地址：https://selingzhihun.github.io/uav-tiku/** · 仓库：https://github.com/selingzhihun/uav-tiku（push main 自动部署）
```

## 二、一键部署（三选一）

### Vercel

- **网页方式（免命令行）**：打开 <https://vercel.com/new> → 登录后直接把本文件夹**拖拽**进上传区（或 Import Git 仓库）→ Framework Preset 选 **Other**，构建命令与输出目录全部留空/默认 → Deploy。
- **CLI 方式**：

```bash
npm i -g vercel
vercel          # 首次按提示登录
vercel --prod   # 部署到生产环境，完成后返回 https://xxx.vercel.app
```

### Cloudflare Pages

1. 打开 <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages**；
2. 选 **Upload assets**，把 `index.html` 和 `data.js` 两个文件拖进去 → 部署即得 `https://xxx.pages.dev`；
3. （或）连接 Git 仓库：构建命令留空，输出目录填 `/`。

### GitHub Pages

1. 在 GitHub 新建一个仓库（如 `uav-quiz`）；
2. 上传 `index.html` 与 `data.js` 到仓库根目录（网页端 Add file → Upload files 即可）；
3. 仓库 **Settings → Pages** → Source 选 **Deploy from a branch**，分支选 `main`、目录选 `/ (root)` → Save；
4. 几分钟后即可访问 `https://你的用户名.github.io/uav-quiz/`。

> 部署后建议用手机实际打开一遍，确认 `data.js` 已一并上传（否则首页题数为 0）。

## 三、替换完整题库

用新题库**整体替换** `data.js` 文件即可，`index.html` 无需任何修改，首页统计会自动更新。

新文件必须保持如下格式（UTF-8 编码）：

```js
window.QUESTIONS = [
  {
    id: 1,               // Number，全库唯一（错题本/收藏/进度都按 id 记录）
    type: "single",      // "single"=单选 | "multi"=多选
    cat: "飞行原理",      // 分类标签（首页/刷题页展示用）
    stem: "题干……",
    A: "选项A", B: "选项B", C: "选项C", D: "选项D",
    answer: "A"          // 多选写连续字母，如 "ABD"（顺序不限，程序会排序比较）
  }
  // ……更多题目
];
```

注意：

- `id` 必须是唯一的 Number，重复或缺失会导致收藏/错题记录错乱；
- 多选题答案必须写全部正确字母（如 `"ABD"`），程序按"集合一致"判定；
- 若某题不足 4 个选项，删掉多余字母键即可，页面会自动只渲染存在的选项。

## 四、推广：生成 H5 / 小程序二维码

### H5 链接二维码（最常用、零门槛）

1. 按上面任一方式部署，拿到 `https://` 开头的正式链接；
2. 打开任意二维码生成工具（如草料二维码 <https://cli.im>、微放码、或浏览器搜索"二维码生成器"）；
3. 选择"**网址/URL**"类型 → 粘贴链接 → 生成并下载二维码图片；
4. 把二维码印到海报、传单、公众号文章，微信"扫一扫"即可直接打开（微信内打开体验最佳）。

其他曝光渠道：微信公众号菜单栏挂链接、朋友圈/社群转发链接、抖音主页挂链接。

### 微信小程序（进阶）

本 H5 无法"一键变成"小程序，常见的两条路：

1. **web-view 嵌入（推荐给已有小程序主体）**：新建/复用一个**非个人主体**小程序，在页面里放 `<web-view src="https://你的H5域名/"></web-view>`，并到小程序管理后台把这 H5 域名配置为"业务域名"（需下载校验文件放到 H5 根目录）；
2. **生成小程序码**：
   - 临时/线下用途：小程序管理后台（mp.weixin.qq.com）支持按页面路径生成带参数的小程序码（"设置 → 基础设置"附近的小程序码入口，或"成员管理→体验码"）；
   - 程序化生成：调用微信服务端接口 `wxacode.getUnlimited`（需 access_token），返回图片即为小程序码。

> 提示：如果只是想让用户"扫码即用"，直接把 **H5 网址生成二维码**是最快的方式——无需审核、无需小程序开发资质。

## 数据与隐私

应用不上传任何数据，全部状态只存在用户浏览器 localStorage：

| 键名 | 内容 |
| --- | --- |
| `wrh5_progress` | 学习进度 `{doneId:[题目id...], correct:答对次数, total:答题次数}` |
| `wrh5_wrong` | 错题题目 id 数组 |
| `wrh5_fav` | 收藏题目 id 数组 |

清除浏览器数据 / 换浏览器 / 换设备 = 进度重置。

## 常见问题

- **双击打开后进度不保存？** 极少数浏览器对 `file://` 页面限制 localStorage，改用 `python -m http.server` 或部署到线上即可。
- **手机打开白屏 / 题数为 0？** 多半是只上传了 `index.html`，漏传了 `data.js`，补传即可。
- **模拟考中途退出会怎样？** 考试作答只在内存中，退出页面或返回首页即丢弃本次考试；已交卷的成绩才会计入统计与错题本。
- **题库仅供学习参考，非官方题库**（首页页脚已注明）。
