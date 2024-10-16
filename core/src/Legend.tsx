import React, { Fragment, useMemo } from 'react'; // 从 React 导入 Fragment 和 useMemo，用于优化性能和避免不必要的重渲染
import { Rect, RectProps } from './Rect'; // 导入 Rect 组件及其属性类型，用于渲染矩形
import { SVGProps } from './SVG'; // 导入 SVG 相关属性类型

// 扩展 LegendProps 接口，加入 isVertical 属性用于控制横向或竖向排列
export interface LegendProps extends RectProps {
  panelColors: SVGProps['panelColors']; // 用于定义面板的颜色，取自 SVGProps 的 panelColors
  rectSize: SVGProps['rectSize']; // 矩形大小，取自 SVGProps 的 rectSize
  leftPad: number; // 左侧的填充距离（间隔）
  rectY: number; // 矩形的 Y 轴位置
  legendCellSize: number; // 图例单元格的大小
  legendRender?: (props: RectProps) => React.ReactElement; // 可选的自定义图例渲染函数
  topPad: number; // 顶部的填充距离
  space: number; // 图例之间的间隔
  isVertical?: SVGProps['isVertical']; // 新增的属性，用于控制横向或竖向排列
}

// Legend 组件：负责渲染图例部分
export default function Legend({
  panelColors, // 面板颜色映射
  leftPad = 0, // 默认左侧填充为 0
  topPad = 0, // 默认顶部填充为 0
  rectY = 15, // 默认矩形的 Y 轴位置为 15
  space = 0, // 默认图例间隔为 0
  rectSize = 0, // 默认矩形大小为 0
  legendCellSize = 0, // 默认图例单元格大小为 0
  legendRender, // 可选的图例渲染函数
  isVertical = false, // 新增的属性，默认值为 false 表示横向排列
  ...props // 其他传入的 RectProps 属性
}: LegendProps) {
  // 如果 legendCellSize 有值，则使用它作为大小；否则使用 rectSize
  let size = legendCellSize || rectSize;

  // 使用 useMemo 钩子来优化渲染性能，避免在不必要时重新渲染
  return useMemo(
    () => (
      <Fragment> {/* 使用 Fragment 包裹返回的多个元素 */}
        {Object.keys(panelColors || {}).map((num, key) => {
          // 构造每个矩形的属性，使用 panelColors 对应的颜色来填充
          const rectProps = {
            ...props, // 继承传入的其他 RectProps 属性
            key, // 唯一的键值，用于 React 识别列表元素
            x: isVertical ? leftPad : (size + space) * key + leftPad, // 横向排列时 x 值根据 key 计算，竖向时固定
            y: isVertical ? (size + space) * key + rectY : rectY, // 竖向排列时 y 值根据 key 计算，横向时固定
            fill: panelColors![Number(num)], // 矩形的填充颜色，从 panelColors 中获取
            width: size, // 矩形的宽度
            height: size, // 矩形的高度
          };

          // 如果传入了自定义的 legendRender 函数，则使用它渲染矩形
          if (legendRender) return legendRender(rectProps);

          // 否则，使用默认的 Rect 组件渲染矩形
          return <Rect {...rectProps} key={key} />;
        })}
      </Fragment>
    ),
    // 只有当以下依赖项发生变化时，组件才会重新渲染，优化性能
    [panelColors, props, size, rectY, leftPad, rectSize, legendRender, space, isVertical],
  );
}
