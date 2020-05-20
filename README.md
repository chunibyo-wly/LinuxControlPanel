# Linux Control Panel

[![Build Status](http://chunibyo.xyz:8085/buildStatus/icon?job=tapd)](http://chunibyo.xyz:8085/job/tapd/)

## :one: 主要功能

### 一、系统监控

1. ~~CPU~~
2. ~~内存~~
3. ~~磁盘使用量~~
4. ~~磁盘IO~~
5. ~~网络IO~~
6. SERVER INFO

### 二、系统管理

1. ~~DNS设置~~
2. swap设置(input)
3. 用户管理(table)
   1. 暂时只做查询功能, 后期加上数据库

### 三、文件管理

1. 上传
2. 下载
3. ~~目录浏览~~

### 三、定时任务(table)

### ~~四、进程监控~~

### ~~五、容器管理~~

### ~~六、FTP服务~~

### 七、iptables

### 八、深度学习环境一键设置



## :two:后端功能的实现方法

### 二、系统管理

#### 2.1 DNS设置

```bash
vim /etc/resolvconf/resolv.conf.d/base
```

![image-20200509104046360](README.assets/image-20200509104046360.png)

#### 2.2 用户管理

1. 创建user

   ```bash
   useradd -m chunibyo
   # -m 创建/home目录
   ```

2. 设置user密码

   ```bash
   passwd chunibyo
   ```

   

3. 删除user

   ```bash
   userdel chunibyo
   ```

4. 创建group

   ```bash
   groupadd test_group
   ```

5. 删除group

   ```bash
   groupdel test_group
   ```

6. 添加user到group

   ```bash
   usermod -G test_group chunibyo
   ```

7. 删除user从group

   ```bash
   gpasswd -d chunibyo test_group
   ```

### 2.3 docker

```bash
docker run --name some-mysql --restart=always -e MYSQL_ROOT_PASSWORD=foo -d mysql:latest

docker run --name some-nginx --restart=unless-stopped -d nginx

docker run --name some-redis --restart=unless-stopped  -d redis
```


# :three: DevOps工作流

## 3.1 [SonarQube](https://www.fosstechnix.com/install-sonarqube-on-ubuntu/#step-3-download-and-install-sonarqube-on-ubuntu)

1. MySQL建库

   ```sql
   create database sonarqube character set utf8 collate utf8_general_ci;
   ```

2. 建立 `sonar` 用户(因为mysql在容器里面并且没有开放端口, 所以直接监听公网最方便)

   ```sql
    create user 'sonar'@'%' identified by 'foo';
    
    grant all privileges on sonar.* to 'sonar'@'%' ;
    
    flush privileges;
   ```

3. 安装sonar

4. 打包成service

   ```
   /lib/systemd/system/sonar.service
   
   [Unit]
   Description=SonarQube service
   After=syslog.target network.target
   
   [Service]
   Type=forking
   
   ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
   ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
   
   User=sonar
   Group=sonar
   Restart=always
   
   LimitNOFILE=65536
   LimitNPROC=4096
   
   
   [Install]
   WantedBy=multi-user.target
   ```

   ![image-20200516100948576](README.assets/image-20200516100948576.png)

## 3.2 Ansible

`apt`仓库默认安装

```yaml
---
- hosts: cugergz.chunibyo.xyz
  vars:
    repo_folder: /root/Panel
  remote_user: root
  tasks:
    - name: 从git仓库下载代码
      git:
        repo: https://github.com/chunibyo-wly/LinuxControlPanel.git
        dest: "{{ repo_folder }}"
        update: yes
    - name: 创建flask环境
      pip:
        requirements: "{{ repo_folder }}/requirements.txt"
        virtualenv: "{{ repo_folder }}/venv"
        virtualenv_command: /usr/bin/python3 -m venv
    - name: 关闭老进程
      shell: ps aux | grep main.p[y] | awk '{print $2}' | xargs kill
      ignore_errors: true
    - name: 启动服务
      shell: "nohup {{repo_folder}}/venv/bin/python {{ repo_folder  }}/main.py &"
```

