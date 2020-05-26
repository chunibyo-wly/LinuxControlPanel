import os
from subprocess import getstatusoutput, getoutput, Popen, PIPE


class FileManager:
    def __init__(self, path):
        self.path = path
        pass

    @staticmethod
    def _change_mode_format(mode):
        try:
            m = {"r": 4, "w": 2, "x": 1, "-": 0, "s": 0, "t": 0, "i": 0, "o": 0}
            return "".join([str(i) for i in [
                sum([m[i] for i in mode[:3]]),
                sum([m[i] for i in mode[3: 6]]),
                sum([m[i] for i in mode[6:]])
            ]])
        except Exception as e:
            print(e)
            print(mode)

    def get_file_list(self):
        info = getoutput('ls -al {}'.format(self.path)).split('\n')
        file = []
        for i in info[1:]:
            tmp = i.split(' ')
            tmp = [x for x in tmp if x != ""]

            if tmp[0][0] == 'd':
                file_type = 'dir'
            elif tmp[-1].endswith('html'):
                file_type = 'html'
            elif tmp[-1].endswith('png') or tmp[-1].endswith('jpg'):
                file_type = 'pic'
            else:
                file_type = "nonefile"

            file.append({
                'file_type': file_type,
                'mode': FileManager._change_mode_format(tmp[0][1:]),
                'owner': tmp[3],
                'name': tmp[-1]
            })
        return file

    def delete_file(self):
        print("rm -rf " + self.path)
        print(getoutput("rm -rf " + self.path))

    def upload(self, file):
        file.save(os.path.join(self.path, file.filename))


if __name__ == '__main__':
    print(FileManager.delete_file(r'/home/chunibyo/Desktop/test'))
