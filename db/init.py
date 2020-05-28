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

result = PortManager.get_allow_port()

flagA = True
flagB = True
for i in result:
    if i['port'] == 22:
        flagA = False
    elif i['port'] == 8888:
        flagB = False

if flagA:
    PortManager(22, 'tcp').add_allow_port('ssh')
if flagB:
    PortManager(8888, 'tcp').add_allow_port('web')
