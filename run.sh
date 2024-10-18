#!/bin/bash

# 进入项目目录并执行npm run build
cd /Users/yangmo/Desktop/Box/Github/react-heat-map || exit
npm run build

# 检查build是否成功
if [ $? -eq 0 ]; then
    echo "Build 成功，正在移动文件..."

    # 移动文件，覆盖目标目录中的内容
    rsync -av --delete /Users/yangmo/Desktop/Box/Github/react-heat-map/core/ /Users/yangmo/Desktop/Box/Github/obsidian-daily-stats-zh/node_modules/@histonemax/react-heat-map/

    if [ $? -eq 0 ]; then
        echo "文件成功移动并覆盖至目标目录。"
    else
        echo "文件移动失败。"
    fi
else
    echo "Build 失败，请检查问题。"
fi
