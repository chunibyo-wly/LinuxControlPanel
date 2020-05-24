# -*- coding: utf-8 -*-
import os

import oss2
import yaml
import sys


def backup(object_name, local_file):
    with open('config/oss.yaml', 'r') as f:
        oss = yaml.load(f, Loader=yaml.SafeLoader)['oss']

        # 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
        auth = oss2.Auth(oss['Auth']['AccessKeyId'], oss['Auth']['AccessKeySecret'])
        # Endpoint以杭州为例，其它Region请按实际情况填写。
        bucket = oss2.Bucket(auth, oss['Bucket']['EndPoint'], oss['Bucket']['BucketName'])

        # <yourObjectName>上传文件到OSS时需要指定包含文件后缀在内的完整路径，例如abc/efg/123.jpg。
        # <yourLocalFile>由本地文件路径加文件名包括后缀组成，例如/users/local/myfile.txt。
        bucket.put_object_from_file(object_name, local_file)


if __name__ == '__main__':
    backup(
        sys.argv[1],
        sys.argv[2]
    )
