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

    def delete_allow_port(self):
        execute(
            "DELETE FROM ufw_port WHERE port = ? AND protocol = ?;",
            (self.port, self.protocol)
        )
        os.system("sudo ufw delete allow {}/{}".format(self.port, self.protocol))
        pass


class IPManager:
    def __init__(self, ip='127.0.0.1', protocol='tcp'):
        self.ip = ip
        self.protocol = protocol

    def add_deny_ip(self, description):
        execute(
            "INSERT INTO ufw_ip (ip, protocol, description) VALUES(?, ?, ?)",
            (self.ip, self.protocol, description)
        )
        os.system("sudo ufw deny from {} proto {}".format(self.ip, self.protocol))

    @staticmethod
    def get_deny_ip():
        ports = execute("SELECT * FROM ufw_ip;")
        result = []
        for i in ports:
            result.append({
                "rule_id": i[0],
                "ip": i[1],
                "protocol": i[2],
                "description": i[3]
            })
        return result

    def delete_deny_ip(self):
        execute(
            "DELETE FROM ufw_ip WHERE ip = ? AND protocol = ?;",
            (self.ip, self.protocol)
        )
        os.system("sudo ufw delete deny from {} proto {}".format(self.ip, self.protocol))


if __name__ == '__main__':
    # IPManager('192.168.1.1', 'tcp').add_deny_ip('test')
    # print(IPManager.get_deny_ip())
    IPManager('192.168.1.1', 'tcp').delete_deny_ip()
