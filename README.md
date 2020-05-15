# Linux Control Panel

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


# :three: DevOps工作流

## 3.1 SonarQube

1. MySQL建库

   ```sql
   create database db_sonar character set utf8 collate utf8_general_ci;
   ```

2. 建立 `sonar` 用户

   ```sql
    create user 'sonar'@'127.0.0.1' identified by 'foo';
    
    grant all privileges on db_sonar.* to 'sonar'@'127.0.0.1' ;
    
    flush privileges;
   ```

   