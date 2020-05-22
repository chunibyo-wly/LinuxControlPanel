import sqlite3

conn = sqlite3.connect('db/Linux.db')
cursor = conn.cursor()

cursor.execute(open('db/init.sql', 'r').read())

conn.commit()
conn.close()
