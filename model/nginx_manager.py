from subprocess import getoutput

from model.file_manager import FileManager
from model.sql_func import execute


class NginxManger:
    def __init__(self, name):
        self.name = name

    def delete_file(self):
        getoutput('rm -rf /var/www/nginx/' + self.name)
        getoutput('rm -f  /tmp/' + self.name + '.zip')
        getoutput('rm -f  /etc/nginx/sites-enabled/' + self.name)
        getoutput('sudo nginx -s reload')
        execute('DELETE FROM nginx WHERE name = ?', (self.name,))

    def upload(self, file, port):
        self.delete_file()
        FileManager('/tmp').upload(file)
        log = getoutput('sh script/create_website.sh {} {}'.format(self.name, port))
        print(log)
        execute('INSERT INTO NGINX (name, port) values (?, ?)', (self.name, port))

    @staticmethod
    def get_web_list():
        return execute('SELECT * FROM nginx')


if __name__ == '__main__':
    NginxManger("fff").upload('ff', 55)
