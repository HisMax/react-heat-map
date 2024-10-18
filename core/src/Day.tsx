import { FC, PropsWithChildren, useMemo } from "react";
import { Rect, RectProps } from './Rect';
import { formatData, getDateToString, existColor, numberSort, oneDayTime } from './utils';
import { SVGProps } from './SVG';

// DayProps定义了Day组件的属性接口
type DayProps = {
  transform?: string; // SVG中的变换属性，用于调整g元素的位移、旋转等
  gridNum?: number; // 网格数量（列数）
  initStartDate: Date; // 初始开始日期，必填
  endDate?: Date; // 结束日期，选填
  rectProps?: RectProps; // 矩形的属性，传递给Rect组件
  rectSize?: number; // 矩形的尺寸
  space?: number; // 矩形之间的间距
  startY?: number; // Y轴上的起始位置
  rectRender?: SVGProps['rectRender']; // 矩形渲染的自定义方法
  panelColors?: SVGProps['panelColors']; // 面板的颜色映射，依据数值选择对应颜色
  value?: SVGProps['value']; // 传入的数据值（每天的数据）
  isVertical?: boolean; // 是否为垂直排列
}

// Day组件定义了一个带有日期和颜色矩形网格的可视化组件
export const Day: FC<PropsWithChildren<DayProps>> = (props) => {
  // 解构传入的props并设定默认值
  const { 
    transform, 
    gridNum = 0, 
    startY = 0, 
    panelColors = {}, 
    initStartDate, 
    space = 2, 
    value = [], 
    rectSize = 11, 
    endDate, 
    rectProps, 
    rectRender, 
    isVertical = false // 默认水平排列
  } = props;

  // 使用useMemo对value数组进行格式化处理，避免不必要的重新计算
  const data = useMemo(() => formatData(value), [value]);

  // 将panelColors的键转换成整数数组，并进行排序，用于之后确定每个日期矩形的颜色
  const nums = useMemo(() => numberSort(Object.keys(panelColors).map((item) => parseInt(item, 10))), [panelColors]);

  // 返回一个g元素，其中包含生成的网格（根据isVertical决定列数或行数）
  return (
    <g transform={transform}>
      {gridNum > 0 && 
        [...Array(gridNum)].map((_, idx) => {
          return (
            <g key={idx} data-column={idx}>
              {[...Array(7)].map((_, cidx) => {
                // 计算当前日期
                const currentDate = new Date(initStartDate.getTime() + oneDayTime * (idx * 7 + cidx));
                const date = getDateToString(currentDate); // 将日期格式化为字符串

                // 组装矩形的数据信息
                const dataProps: RectProps['value'] = {
                  ...data[date], // 获取该日期对应的数据
                  date: date, // 日期
                  row: isVertical ? idx : cidx, // 根据是否垂直排列，决定行索引
                  column: isVertical ? cidx : idx, // 根据是否垂直排列，决定列索引
                  index: idx * 7 + cidx, // 当前矩形在网格中的索引
                };

                // 定义每个日期矩形的属性，包括大小、填充颜色和位置
                const dayProps: RectProps = {
                  ...rectProps, // 继承外部传入的矩形属性
                  fill: 'var(--rhm-rect, #EBEDF0)', // 默认填充颜色，如果没有数据时使用
                  width: rectSize, // 矩形宽度
                  height: rectSize, // 矩形高度
                  // 如果是垂直排列，x和y的计算方式交换
                  x: isVertical ? cidx * (rectSize + space) : idx * (rectSize + space), // 矩形在X轴上的位置
                  y: isVertical ? idx * (rectSize + space) : (rectSize + space) * cidx, // 矩形在Y轴上的位置
                  render: rectRender, // 传入的自定义渲染方法
                  value: dataProps // 当前矩形的数据信息
                };

                // 如果当前日期超过了endDate，则不渲染这个矩形
                if (endDate instanceof Date && currentDate.getTime() > endDate.getTime()) {
                  return null;
                }

                // 根据日期数据和面板颜色的映射，确定矩形的填充颜色
                if (date && data[date] && panelColors && Object.keys(panelColors).length > 0) {
                  dayProps.fill = existColor(data[date].count || 0, nums, panelColors); // 根据数据值选择对应的颜色
                } else if (panelColors && panelColors[0]) {
                  dayProps.fill = panelColors[0]; // 没有数据时使用默认颜色
                }

                // 渲染每个日期矩形
                return (
                  <Rect
                    {...dayProps} // 将属性传递给Rect组件
                    key={cidx} // 唯一的key值
                    value={dataProps} // 传递的数据
                    data-date={date} // 日期信息，用于标识
                    data-index={dataProps.index} // 网格中的索引
                    data-row={dataProps.row} // 行索引
                    data-column={dataProps.column} // 列索引
                    data-title={date} // 添加data-title属性
                  />
                );
              })}
            </g>
          );
        })}
    </g>
  );
};
