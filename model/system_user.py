from subprocess import getstatusoutput, getoutput, Popen, PIPE


class SystemUser:
    def __init__(self, name, passwd=None):
        self.name = name
        self.passwd = passwd
        pass

    def add_user(self):
        getoutput('useradd -m {0}'.format(self.name))

    def add_passwd(self):
        Popen(['passwd', self.name], stdin=PIPE) \
            .communicate(
            '{0}\n{1}'
                .format(self.passwd, self.passwd)
                .encode()
        )

    def delete_passwd(self):
        getoutput('userdel -r {0}'.format(self.name))


if __name__ == '__main__':
    SystemUser('chunibyo', '123\n123').add_passwd()
