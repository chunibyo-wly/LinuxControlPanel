import sqlite3


def execute(*args, **kwargs):
    conn = sqlite3.connect('db/Linux.db')
    cursor = conn.cursor()
    cursor.execute(*args, **kwargs)
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return result


def insert(*args, **kwargs):
    conn = sqlite3.connect('db/Linux.db')
    cursor = conn.cursor()
    cursor.execute(*args, **kwargs)
    result = cursor.lastrowid
    conn.commit()
    conn.close()

    return result


# if __name__ == '__main__':
#     execute('INSERT INTO NGINX (name, port) values (?, ?)', ('a', 8500))
#     a = execute('SELECT * FROM nginx WHERE name = ?', ("a",))
#     execute('DELETE FROM nginx WHERE name = ?', ("a",))
#     print(a)
