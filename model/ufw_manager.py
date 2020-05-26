import os
from subprocess import getoutput

try:
    from .sql_func import insert, execute
except Exception as e:
    print("===========")
    print(e)
    print("===========")
    from sql_func import insert, execute


class PortManager:
    def __init__(self, port=80, protocol='tcp'):
        self.port = port
        self.protocol = protocol

    def add_allow_port(self, description):
        execute(
            "INSERT INTO ufw_port (port, protocol, description) VALUES(?, ?, ?)",
            (self.port, self.protocol, description)
        )
        os.system("sudo ufw allow {}/{}".format(self.port, self.protocol))

    @staticmethod
    def get_allow_port():
        ports = execute("SELECT * FROM ufw_port;")
        result = []
        for i in ports:
            result.append({
                "rule_id": i[0],
                "port": i[1],
                "protocol": i[2],
                "description": i[3]
            })
        return result


if __name__ == '__main__':
    print(PortManager.get_allow_port())
