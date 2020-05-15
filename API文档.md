# 1. 系统信息

## 1.1 获取系统信息

1. url: /api/sysinfo
2. method: get
3. parameter: None
4. response

```json
{
    "cpu_info": {
        "core_num": 2,
        "cpu_num": 1,
        "model_name": "Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz",
        "processor_num": 2
    },
    "disk_info": {
        "Total": 39,
        "Used": 29
    },
    "io_info": {
        "io_recv": 0,
        "io_sent": 0,
        "net_io_recv": 0,
        "net_io_sent": 0
    },
    "mem_info": {
        "Active": 2.71,
        "-Buffers": 0.3,
        "-Cached": 0.75,
        "MemAvailable": 1.4,
        "-MemFree": 0.51,
        "MemTotal": 3.85,
        "SwapCached": 0,
        "-Used": 2.29
    }
}
```

# 2. DNS

## 2.1 获取现在的dns

1. url: /api/dns

2. method: get

3. parameter: None

4. response:

   ```json
   {
       "server_1": "8.8.8.8",
       "server_2": "8.8.4.4"
   }
   ```

5. description: 获取当前服务器的dns server

## 2.2 修改DNS

1. url: /api/dns

2. method: post

3. parameter: application/json

   ```json
   {
   	"server_1": "8.8.8.8",
   	"server_2": "8.8.8.8"
   }
   ```

4. response:

   ```cpp
   {
       "status": "OK"
   }
   ```

5. description: 提交用户希望变更的dns server

# 3. 登录 & 登出

## 3.1 登录

1. url: /api/login

2. method: post

3. parameter: 

   ```json
   {
       "name": "admin",
       "passwd": "admin"
   }
   ```

4. response

   ```json
   {
       "status": "OK"
   }
   ```

## 3.2 登出

1. url: /api/logout

2. method: post

3. parameter: None

4. response:

   ```json
   {
       "status": "OK"
   }
   ```


# 4. 文件管理器

## 4.1 获取目录信息

1. url: /api/file

2. method: get

3. parameter:

   ```json
   {
       "path": "/root"
   }
   ```

4. response:

   ```json
   {
       "file": [
           {
               "file_type": "dir",
               "mode": "755",
               "name": ".",
               "owner": "root"
           },
           {
               "file_type": "dir",
               "mode": "755",
               "name": "..",
               "owner": "root"
           },
           {
               "file_type": "dir",
               "mode": "755",
               "name": "bin",
               "owner": "root"
           },
           {
               "file_type": "dir",
               "mode": "755",
               "name": "boot",
               "owner": "root"
           },
           {
               "file_type": "dir",
               "mode": "755",
            "name": "CONFIG_DIR",
               "owner": "root"
           },
           {
               "file_type": "dir",
               "mode": "755",
               "name": "dev",
               "owner": "root"
           },
           {
               "file_type": "dir",
               "mode": "755",
               "name": "DOWNLOAD_DIR",
               "owner": "root"
           }
       ]
   }       
   ```
   
   