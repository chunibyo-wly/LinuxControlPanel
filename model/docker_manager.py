from subprocess import getstatusoutput, getoutput, Popen, PIPE


class DockerManager:
    def __init__(self, container_id):
        self.container_id = container_id

    @staticmethod
    def get_container():
        container_id_run = set(getoutput("docker ps | awk ' NR>1 {print $1} '").split('\n'))
        container_id_stop = set(getoutput("docker ps -a | awk ' NR>1 {print $1} '").split('\n')) - container_id_run
        container_run = []
        container_stop = []
        for i in container_id_run:
            info = getoutput("docker stats --no-stream " + i + " | awk 'NR>1 {print $0}'").split(' ')
            info = [x for x in info if x != ""]
            container_run.append({
                "container_id": i,
                "name": info[1],
                "cpu": info[2],
                "mem": info[6]
            })
        for i in container_id_stop:
            info = getoutput("docker stats --no-stream " + i + " | awk 'NR>1 {print $0}'").split(' ')
            info = [x for x in info if x != ""]
            container_stop.append({
                "container_id": i,
                "name": info[1],
                "cpu": info[2],
                "mem": info[6]
            })
        return {
            "container_run": container_run,
            "container_stop": container_stop
        }

    def stop_container(self):
        getoutput('docker stop {}'.format(self.container_id))

    def restart_container(self):
        getoutput('docker restart {}'.format(self.container_id))

    def delete_container(self):
        getoutput('docker container rm {}'.format(self.container_id))


if __name__ == '__main__':
    print(DockerManager.get_container())
