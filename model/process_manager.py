import psutil
from subprocess import getoutput


class ProcessManger:
    def __init__(self, pid):
        self.pid = pid
        pass

    @staticmethod
    def get_process():
        process = []
        for i in psutil.pids():
            proc = psutil.Process(i)
            if proc.exe() not in process:
                process.append({
                    "pid": i,
                    "proc_name": proc.exe(),
                    "mem": round(proc.cpu_percent(), 2),
                    "cpu": round(proc.memory_percent(), 2),
                    "status": proc.status()
                })
        return process

    def kill_process(self):
        print("kill -9 " + self.pid)
        getoutput("kill -9 " + self.pid)


if __name__ == '__main__':
    print(ProcessManger.get_process())
