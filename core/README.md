# HeatMap 日历热图

这是一个轻量级的日历热图 React 组件，基于 SVG 构建，可以自定义版本的 GitHub 贡献图。你可以在[示例网站](https://uiwjs.github.io/react-heat-map/)上试用该组件。在原作者uiw的项目[uiwjs/react-heat-map](https://github.com/uiwjs/react-heat-map)进行了一些修改，增加了一些新的功能。

This is a lightweight calendar heat map React component, built on SVG, that can customize the GitHub contribution graph. You can try this component on the [example website](https://uiwjs.github.io/react-heat-map/). I made some modifications to the original project [uiwjs/react-heat-map](https://github.com/uiwjs/react-heat-map)
---

## 属性（Props）

| 属性名称 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| `value` | 要显示的数据，**必填** | 数组 | `[]` |
| `rectSize` | 网格的大小 | 数字 | `11` |
| `legendCellSize` | 图例单元格的大小，以像素为单位。值为 `0` 时隐藏图例。 | 数字 | `11` |
| `startDate` | 开始日期 | 日期 | `new Date()` |
| `endDate` | 结束日期 | 日期 | - |
| `space` | 网格之间的间距 | 数字 | `2` | 
| `monthPlacement` | 月份标签的位置 | `'top' | 'bottom'` | `top` | 
| `rectProps` | 网格节点的属性设置 | `React.SVGProps<SVGRectElement>` | `2` |
| `weekLabels` | 周显示标签 | 字符串数组 | `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']` | 
| `monthLabels` | 月份显示标签 | 字符串数组 | `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']` | 
| `panelColors` | 活跃颜色的背景色 | `Record<number, string>` | `{ 0: '#EBEDF0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127' }` | 
| `rectRender` | 单个`day`方块的重新渲染 | `<E = SVGRectElement>(data: E & { key: number }, valueItem: HeatMapValue & { date: string, column: number, row: number, index: number }) => React.ReactElement` | - |
| `legendRender` | 单个`legend`图例块的重新渲染 | `(props: React.SVGProps<SVGRectElement>) => React.ReactNode` | - |
| `isVertical` | 是否垂直显示 | `boolean` | `false` |
---
## 部署（Deploy）

### 1. 安装

```bash
npm install @histonemax/react-heat-map
```

### 2. 基础使用

```jsx
import React from 'react';
import HeatMap from '@histonemax/react-heat-map';

const App = () => {
  const value = [
    { date: '2021-01-01', count: 1 },
    { date: '2021-01-02', count: 2 },
    { date: '2021-01-03', count: 3 },
    { date: '2021-01-04', count: 4 },
    { date: '2021-01-05', count: 5 },
    { date: '2021-01-11', count: 11 },
    { date: '2021-01-12', count: 12 },
    { date: '2021-01-13', count: 13 },
    { date: '2021-01-18', count: 18 },
  ];
    return (
        <HeatMap value={value} />
    );


## 开发（Development）

### 1. 安装依赖

在开始之前，你需要确保你的电脑已经安装了 Node.js 和 npm（Node.js 包管理工具）。如果你还没有安装，可以去 [Node.js 官网](https://nodejs.org/) 下载并安装最新的 LTS 版本。安装完毕后，你可以在命令行（Windows 的 CMD，Mac 或 Linux 的 Terminal）输入以下命令来检查是否成功安装：

```bash
node -v
npm -v
```

如果输出了版本号，说明 Node.js 和 npm 已经成功安装。

#### 安装步骤：

首先，你需要在项目目录下安装项目所需的依赖包。这些依赖包是一些别人已经写好的工具和库，可以让你更轻松地开发项目。你只需要输入以下命令：

```bash
npm install
```

这个命令会自动读取项目中的 `package.json` 文件，并下载所有列出的依赖包。根据你的网络环境，这个过程可能需要几分钟。

### 2. 启动开发环境

开发环境是让你可以边修改代码边看到效果的模式。在这个模式下，你的代码每次修改都会自动重新编译，并更新在页面上显示出来。你可以实时预览你修改的内容，而不需要每次手动刷新页面或者重新运行代码。

#### 第一步：运行监听编译（监听文件变化并自动编译）

“监听编译”的模式。所谓“监听编译”，就是每当你修改代码时，系统会自动把你的代码转换成浏览器可以理解的 JavaScript 文件。这是通过以下命令完成的：

```bash
npm run watch
```

这个命令启动了一个“监听器”，它会不断监视你的代码文件，任何修改都会触发重新编译，编译后的文件会输出到项目的 `dist` 或 `lib` 目录中。

#### 第二步：启动本地开发服务器并预览

接下来，你可以通过启动本地的开发服务器来查看代码的效果。此时你可以随时修改代码，浏览器会自动刷新来显示你的最新修改。使用以下命令启动本地开发服务器：

```bash
npm run start
```

这个命令会启动一个本地开发服务器，并自动打开浏览器来显示你的项目。默认情况下，你可以在 `http://localhost:3000` 上查看项目。如果不自动打开浏览器，你可以手动输入这个网址进行访问。



#### 示例：修改网格大小

假设你想修改热图的网格大小（rectSize），你可以在组件的 `props` 中找到 `rectSize`，将它的值从默认的 `11` 改为你想要的大小。比如，修改为 `20`：

```jsx
<HeatMap rectSize={20} />
```

保存文件，浏览器会自动刷新，你会立即看到网格变大了。

### 4. 打包发布项目（生产模式）

当你对代码的修改满意，并且准备将项目发布到线上时，就需要使用“生产模式”进行打包。打包的过程会将所有的代码压缩、优化，生成适合发布的文件。这些文件通常非常小，可以加快页面的加载速度。

#### 第一步：构建生产版本

使用以下命令来打包你的项目：

```bash
npm run build
```

这个命令会把你的代码进行压缩、优化，并生成一套可以直接在生产环境中使用的文件。打包完成后，这些文件会被输出到 `build` 目录中。

#### 第二步：生成文档（可选）

如果你的项目需要生成文档（比如 API 文档），可以使用以下命令：

```bash
npm run doc
```

这个命令会读取项目中的代码注释，并生成相应的文档。文档通常用来帮助其他开发者理解你的代码和项目。

### 5. 部署上线

打包完成后，你可以将 `build` 目录中的文件上传到你的服务器，或者部署到像 GitHub Pages、Netlify 或 Vercel 这样的静态网站托管服务。由于这些文件已经经过压缩和优化，它们加载得更快，适合直接供用户访问。


---

## 感谢（Thanks）

本项目构建于 [uiwjs/react-heat-map](https://github.com/uiwjs/react-heat-map) 项目基础上，再次感谢原作者的贡献。

---

## 许可证（License）

项目基于 MIT 协议发布，允许任何组织和个人免费使用。