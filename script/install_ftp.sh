#! /bin/sh

# 1. 安装vsftp
sudo apt update && sudo apt -y upgrade
sudo apt install -y vsftpd

# 2. 创建可以用于上传的文件夹
if [ ! -d "/srv/ftp/pub"  ]; then
    sudo mkdir -p /srv/ftp/pub
fi
sudo chown ftp:ftp /srv/ftp/pub
sudo echo "vsftpd test file" > /srv/ftp/vsftpd_test.txt

# 3. 备份配置文件
file=/etc/vsftpd.conf
if [ -f "$file" ]; then
    sudo cp $file $file.org
fi

# 4. 输入新的配置文件
sudo echo "
listen=NO
listen_ipv6=YES
anonymous_enable=YES
no_anon_password=YES
local_enable=YES
write_enable=YES
anon_upload_enable=YES
anon_mkdir_write_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
utf8_filesystem=YES
" > /etc/vsftpd.conf


systemctl restart vsftpd
