import os
import sqlite3
import sys

sys.path.append(os.path.join(os.getcwd()))
print(sys.path)

conn = sqlite3.connect('db/Linux.db')
cursor = conn.cursor()

cursor.executescript(open('db/init.sql', 'r').read())

conn.commit()
conn.close()
