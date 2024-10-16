import React from 'react';
import SVG, { SVGProps } from './SVG'; // 从自定义的 SVG 文件中导入 SVG 组件和 SVGProps 类型
import './style/index.less'; // 导入样式文件，用于为组件添加特定样式

// 导出所有从 './SVG' 文件中导出的内容，这样可以在其他地方继续使用它们
export * from './SVG';

// 定义 HeatMap 组件的属性接口 HeatMapProps，该接口扩展了 SVGProps 接口
// 通过扩展 SVGProps，HeatMapProps 也包含了 SVGProps 中的所有属性
export interface HeatMapProps extends SVGProps {
  // prefixCls 是一个可选属性，用于定义样式前缀，默认为 'w-heatmap'
  prefixCls?: string;
}

// 定义 HeatMap 函数组件
export default function HeatMap(props: HeatMapProps) {
  // 解构 props，从中提取出 prefixCls 和 className，剩下的放入 others
  const { prefixCls = 'w-heatmap', className, ...others } = props;

  // 创建一个由 className 和 prefixCls 组成的 CSS 类名
  // 通过 .filter(Boolean) 过滤掉任何值为假（如 undefined、null 或空字符串）的项
  // 最终将所有有效的类名用空格拼接成一个字符串
  const cls = [className, prefixCls].filter(Boolean).join(' ');

  // 返回一个 SVG 组件，给它传递 cls 作为类名，并将剩余的 props 属性通过 {...others} 传递下去
  // 这样，HeatMap 组件在使用时可以传递额外的属性给 SVG 组件（例如 rectSize、legendCellSize 等）
  return <SVG className={cls} {...others} />;
}
