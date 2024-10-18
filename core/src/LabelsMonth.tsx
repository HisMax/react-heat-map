import React, { Fragment, useMemo } from 'react'; 
import { oneDayTime } from './utils'; 
import { SVGProps } from './SVG'; 
import { textStyle } from './LabelsWeek'; 

export interface LablesMonthProps extends React.SVGProps<SVGTextElement> {
  monthLabels: SVGProps['monthLabels'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
  leftPad: number;
  colNum: number;
  rectY?: number; // 标签的Y轴位置
  startDate: SVGProps['startDate'];
  isVertical?: boolean; // 控制是否垂直排列
  monthPlacement?: SVGProps['monthPlacement'];
}

// LabelsMonth组件，用于生成月份标签，根据isVertical调整排列方式
export const LabelsMonth = ({
    monthLabels = [],
    rectSize = 0,
    space = 0,
    leftPad = 0,
    colNum = 0,
    rectY = 15,
    startDate,
    isVertical = false, // 默认水平排列
    monthPlacement = 'top',
  }: LablesMonthProps) => {

  // 根据 isVertical 动态生成月份数据
  const data = useMemo(() => {
    if (monthLabels === false || colNum < 1) return [];

    return [...Array(colNum * 7)] 
      .map((_, idx) => {
        if ((idx / 7) % 1 === 0) { // 每列（或每行）代表7天
          const date = new Date(startDate!.getTime() + idx * oneDayTime);
          const month = date.getMonth();
          return { 
            col: idx / 7, // 列索引
            index: idx, // 日期索引
            month,
            day: date.getDate(),
            monthStr: monthLabels[month], // 对应月份的字符串
            date
          };
        }
        return null;
      })
      .filter(Boolean)
      .filter((item, idx, list) => list[idx - 1] && list[idx - 1]!.month !== item!.month); // 过滤掉重复的月份
  }, [colNum, monthLabels, startDate]);

  // var finalx = isVertical ? leftPad - 15 : leftPad + space + space + colNum * (rectSize + space);
  // finalx = monthPlacement === 'bottom' && !isVertical ? finalx + 15 : finalx;
  return (
    <Fragment>
      {/* 根据 isVertical 决定月份标签的排列方式 */}
      {[...data].map((item, idx) => {
        return (
            <text
            key={idx}
            data-size={rectSize}
            x={isVertical ? (monthPlacement === 'bottom' ? leftPad + 8 * rectSize + 15 : leftPad - 15) : leftPad + space + space + item!.col * (rectSize + space)} // 垂直模式下根据placement调整x轴位置，水平模式下x轴递增
            y={isVertical ? rectY + 15 + idx * (rectSize * 7 + space * 7) : (monthPlacement === 'bottom' ? rectY + 15 : rectY)} // 垂直模式下y轴递增，水平模式下根据placement调整y轴位置
            textAnchor='start'
            style={textStyle}
            >
            {item!.monthStr} {/* 渲染月份标签 */}
            </text>
        );
      })}
    </Fragment>
  );
};
