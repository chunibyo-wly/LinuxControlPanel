from subprocess import getstatusoutput, getoutput, Popen, PIPE


class DockerManager:
    def __init__(self, container_id):
        self.container_id = container_id

    @staticmethod
    def get_container():
        info = getoutput('docker stats --no-stream').split('\n')
        container = []

        for i in info[1:]:
            tmp = i.split(' ')
            container.append({
                "container_id": tmp[0],
                "name": tmp[8],
                "cpu": tmp[25],
                "mem": tmp[45]
            })
        return container

    def stop_container(self):
        getoutput('docker stop {}'.format(self.container_id))

    def restart_container(self):
        getoutput('docker restart {}'.format(self.container_id))

    def delete_container(self):
        getoutput('docker container rm {}'.format(self.container_id))


if __name__ == '__main__':
    print(DockerManager.get_container())
