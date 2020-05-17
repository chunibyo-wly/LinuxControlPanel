from subprocess import getstatusoutput, getoutput, Popen, PIPE


class SystemGroup:
    def __init__(self, name):
        self.name = name
        pass

    def add_user(self):
        getoutput('groupadd {0}'.format(self.name))

    def delete_passwd(self):
        getoutput('groupdel {0}'.format(self.name))
