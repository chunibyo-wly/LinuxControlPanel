from subprocess import getstatusoutput, getoutput, Popen, PIPE


class FileManager:
    def __init__(self):
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

    @staticmethod
    def get_file_list(path):
        info = getoutput('ls -al {}'.format(path)).split('\n')
        file = []
        for i in info[1:]:
            # TODO: 切空格有问题, 需要调用py的库函数
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


if __name__ == '__main__':
    print(FileManager._change_mode_format('rw-r--rwx'))
