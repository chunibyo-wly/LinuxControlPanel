import sqlite3

conn = sqlite3.connect('db/Linux.db')
print("数据库连接(创建)成功")
cursor = conn.cursor()

cursor.execute(open('db/init.sql', 'r').read())
print("数据库初始化成功")

conn.commit()
conn.close()
