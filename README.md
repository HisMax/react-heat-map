HeatMap 日历热图
===
<!--rehype:style=text-align: center;-->

[![Build & Deploy](https://github.com/uiwjs/react-heat-map/workflows/Build%20&%20Deploy/badge.svg)](https://github.com/uiwjs/react-heat-map/actions)
[![Issues](https://img.shields.io/github/issues/uiwjs/react-heat-map.svg)](https://github.com/uiwjs/react-heat-map/issues)
[![Forks](https://img.shields.io/github/forks/uiwjs/react-heat-map.svg)](https://github.com/uiwjs/react-heat-map/network)
[![Stars](https://img.shields.io/github/stars/uiwjs/react-heat-map.svg)](https://github.com/uiwjs/react-heat-map/stargazers)
[![Release](https://img.shields.io/github/release/uiwjs/react-heat-map)](https://github.com/uiwjs/react-heat-map/releases)
[![npm version](https://img.shields.io/npm/v/@uiw/react-heat-map.svg)](https://www.npmjs.com/package/@uiw/react-heat-map)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@uiw/react-heat-map)](https://bundlephobia.com/result?p=@uiw/react-heat-map)
<!--rehype:style=text-align: center;-->

A lightweight calendar heatmap react component built on SVG, customizable version of GitHub's contribution graph. Try it out on [website example](uiwjs.github.io/react-heat-map/).

## Install

```bash
# Not dependent on uiw.
npm install @uiw/react-heat-map --save
```

## Basic Usage

Basic usage example, Please pay warning to the time setting. ⚠️ Example: `2016/01/11`<!--rehype:style=color: green;--> -> ~~`2016-01-11`~~<!--rehype:style=color: red;-->, Support `Safari`

<!--rehype:bgWhite=true&codeSandbox=true&codePen=true-->
```jsx
import ReactDOM from 'react-dom';
import HeatMap from '@uiw/react-heat-map';

const Demo = () => {
  const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/01/12', count: 20 },
    { date: '2016/01/13', count: 10 },
    ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
    { date: '2016/04/11', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/04', count: 11 },
  ];
  return (
    <div>
      <HeatMap value={value} startDate={new Date('2016/01/01')} />
    </div>
  )
};
ReactDOM.render(<Demo />, _mount_);
```

## Set Color

Set the theme color style.

<!--rehype:bgWhite=true&codeSandbox=true&codePen=true-->
```jsx
import ReactDOM from 'react-dom';
import HeatMap from '@uiw/react-heat-map';

const Demo = () => {
  const value = [
    { date: '2016/01/11', count:2 },
    { date: '2016/04/12', count:2 },
    { date: '2016/05/01', count:5 },
    { date: '2016/05/02', count:5 },
    { date: '2016/05/03', count:1 },
    { date: '2016/05/04', count:11 },
    { date: '2016/05/08', count:32 },
  ];
  return (
    <HeatMap
      value={value}
      width={600}
      style={{ color: '#ad001d' }}
      startDate={new Date('2016/01/01')}
      panelColors={{ 0: '#f4decd', 2: '#e4b293', 4: '#d48462', 10: '#c2533a', 20: '#ad001d' }}
    />
  )
};
ReactDOM.render(<Demo />, _mount_);
```
## Set Rect Style

Set the radius of the rect.

<!--rehype:bgWhite=true&codeSandbox=true&codePen=true-->
```jsx
import ReactDOM from 'react-dom';
import HeatMap from '@uiw/react-heat-map';

const Demo = () => {
  const [range, setRange] = useState(5)
  const value = [
    { date: '2016/01/11', count:2 },
    ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx, content: '' })),
    ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
    { date: '2016/04/12', count:2 },
    { date: '2016/05/01', count:5 },
    { date: '2016/05/02', count:5 },
    { date: '2016/05/03', count:1 },
    { date: '2016/05/04', count:11 },
    { date: '2016/05/08', count:32 },
  ];
  return (
    <div>
      <input type="range" min="0" max="5" step="0.1" value={range} onChange={(e) => setRange(e.target.value)} /> {range}
      <HeatMap
        value={value}
        width={600}
        startDate={new Date('2016/01/01')}
        rectProps={{
          rx: range
        }}
      />
    </div>
  )
};
ReactDOM.render(<Demo />, _mount_);
```

## Props

| Property | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| value | Data to be displayed, **required** | Array | `[]` |
| rectSize | Grid size | number | `11` |
| legendCellSize | Size of the legend cells, in pixel. Value equal to `0` hide legend. | number | `11` |
| startDate | Start date | Date | `new Date()` |
| endDate | End date | Date | - |
| space | Interval between grid sizes | number | `2` | 
| rectProps | Grid node attribute settings | `React.SVGProps<SVGRectElement>` | `2` |
| weekLables | Week display | string[] | `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']` | 
| monthLables | Month display | string[] | `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']` | 
| panelColors | Backgroud color of active colors | `Record<number, string>` | `{ 0: '#EBEDF0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127' }` | 
| renderRect | Single block re-render | `(data: SVGRectElement & RectDayDefaultProps & { fill?: string }, valueItem?: HeatMapValue) => React.ReactNode` | - |

## Development

**`development`**

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

**`production`**

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## License

Licensed under the MIT License.
