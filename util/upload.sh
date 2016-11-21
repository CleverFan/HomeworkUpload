#!/bin/bash
# 常规定义

baidupan_DIR="/编译原理"
# 备份网站数据目录
#BYYL_DIR = "/node/HomeworkUpload/public/uploads"
#BYYL_DIR = "/"

function ergodic(){
  for file in `ls $1`
  do
    if [ -d $1"/"$file ]
    then
      ergodic $1"/"$file
    else
      local path=$1"/"$file 
      local name=$file      
      #local size=`du --max-depth=1 $path|awk '{print $1}'` 
      #echo $name $path 
      /plugins/baidu/bpcs_uploader.php upload $path $baidupan_DIR/$path
    fi
  done
}

IFS=$'\n'                      #这个必须要，否则会在文件名中有空格时出错
ergodic "/node/HomeworkUplode/public/uploads"
      
 
exit 0