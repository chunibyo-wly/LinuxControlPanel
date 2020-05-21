#!/bin/bash

# 参数1 : 文件名
# 参数2 : 端口号

# 1. 创建网站托管文件夹
if [ ! -d "/var/www/nginx/"$1  ]; then
    sudo mkdir /var/www/nginx/$1
fi

# 2. 创建配置文件
sudo echo '
server {
    listen '$2' default_server;
    listen [::]:'$2' default_server;

    server_name _;

    root /var/www/nginx/'$1';
    index index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ =404;
     }
}' > /etc/nginx/sites-enabled/$1


# 3. 解压网站压缩包
unzip /tmp/$1.zip -d /var/www/nginx

# 4. 重启服务
sudo nginx -s reload