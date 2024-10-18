import type { CSSProperties } from 'react';
import React, { Fragment, useMemo } from 'react';
import { SVGProps } from './SVG';

export const textStyle: CSSProperties = {
  textAnchor: 'middle',
  fontSize: 'inherit',
  fill: 'currentColor',
};

export interface LablesWeekProps extends React.SVGProps<SVGTextElement> {
  weekLabels: SVGProps['weekLabels'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
  topPad: number;
  isVertical?: boolean; // 控制标签的排列方向
}

// 修改后的 LabelsWeek 组件
export const LabelsWeek = ({ weekLabels = [], rectSize = 0, topPad = 0, space = 0, isVertical = false }: LablesWeekProps) =>
  useMemo(
    () => (
      <Fragment>
        {[...Array(7)].map((_, idx) => {
          if (weekLabels && weekLabels[idx]) {
            return (
              <text
                className="w-heatmap-week"
                key={idx}
                x={isVertical ? (idx+1) * (rectSize + space) + 20 : 15} // 如果是垂直排列，x坐标递增；否则固定在15
                y={isVertical ? topPad : topPad + (idx + 1) * (rectSize + space) - 5} // 垂直排列时，y固定，水平排列时y坐标递增
                style={textStyle}
              >
                {weekLabels[idx]}
              </text>
            );
          }
          return null;
        })}
      </Fragment>
    ),
    [rectSize, space, topPad, weekLabels, isVertical], // 添加 isVertical 作为依赖项
  );
