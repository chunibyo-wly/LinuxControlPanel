from subprocess import getstatusoutput, getoutput, Popen, PIPE


class FtpManager:
    def __init__(self):
        pass

    @staticmethod
    def install():
        return getoutput('sh script/install_ftp.sh')


if __name__ == '__main__':
    print(FtpManager.install().split('\n'))
