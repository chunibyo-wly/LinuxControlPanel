#!/bin/bash

# 1. 安装nginx
sudo apt update && sudo apt -y upgrade
sudo apt install -y nginx

# 2. 创建网站存储目录
sudo mkdir -p /var/www/nginx