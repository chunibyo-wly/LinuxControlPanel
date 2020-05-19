from subprocess import getstatusoutput, getoutput, Popen, PIPE

from model.file_manager import FileManager


class FtpManager(FileManager):
    def __init__(self, path):
        self.root_path = "/srv/ftp"
        super().__init__(self.root_path + path)

    def get_file_list(self):
        return super().get_file_list()

    def delete_file(self):
        super().delete_file()

    def upload(self):
        super().upload()

    @staticmethod
    def install():
        return getoutput('sh script/install_ftp.sh')


if __name__ == '__main__':
    print(FtpManager.install().split('\n'))
