import { createRoot } from 'react-dom/client'; // 从 React DOM 客户端导入 createRoot 方法，用于渲染 React 组件
import MarkdownPreview from '@uiw/react-markdown-preview-example'; // 导入 Markdown 预览组件
import data from '@uiw/react-heat-map/README.md'; // 从 README.md 文件中导入热图组件的文档数据
import Demo from './Example'; // 导入示例组件

// 解构 MarkdownPreview 组件中的 Github 和 Example 子组件
const Github = MarkdownPreview.Github;
const Example = MarkdownPreview.Example;

// 获取页面中 id 为 "root" 的 DOM 容器
const container = document.getElementById('root');

// 创建 React 根节点（如果使用 TypeScript，需在 container 后添加非空断言 "!"）
const root = createRoot(container!); 

// 使用 root.render 方法将组件渲染到页面中
root.render(
  // 渲染 MarkdownPreview 组件，并传入所需的文档数据、标题、描述等属性
  <MarkdownPreview
    source={data.source} // 设置要显示的 Markdown 文档源
    components={data.components} // 设置文档中的 React 组件
    data={data.data} // 提供额外的数据
    title="React 日历热图" // 设置 Markdown 预览页面的标题
    description="React 组件用于创建日历热图，方便可视化时间序列数据，类似于 GitHub 的贡献图。" // 对页面的描述信息
    version={`v${VERSION}`} // 显示当前组件的版本号
  >
    {/* Github 组件，指向该项目的 GitHub 仓库 */}
    <Github href="https://github.com/HisMax/react-heat-map" />

    {/* Example 组件，用于展示 Demo 示例 */}
    <Example>
      <Demo /> {/* 渲染 Demo 组件，展示实际使用案例 */}
    </Example>
  </MarkdownPreview>,
);
