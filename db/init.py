import sqlite3
import sys, os

sys.path.append(os.path.join(os.getcwd()))
print(sys.path)

from model.ufw_manager import PortManager

conn = sqlite3.connect('db/Linux.db')
cursor = conn.cursor()

cursor.executescript(open('db/init.sql', 'r').read())

conn.commit()
conn.close()

PortManager(22, 'tcp').add_allow_port('ssh 连接')
PortManager(8888, 'tcp').add_allow_port('主页')
