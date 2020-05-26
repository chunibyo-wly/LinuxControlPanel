from datetime import datetime
import getpass

import sqlite3
from subprocess import getoutput
from crontab import CronTab

from model.sql_func import execute, insert


class CrontabManager:
    def __init__(self, cron_type=None):
        self.cron_type = cron_type
        self.cron = CronTab(user=getpass.getuser())

    def _type2str(self):
        if self.cron_type == "minute":
            return "* * * * *"
        elif self.cron_type == "hour":
            return "0 * * * *"
        elif self.cron_type == "day":
            return "0 0 * * *"
        elif self.cron_type == "week":
            return "0 0 * * {}".format(datetime.today().weekday() + 1)
        elif self.cron_type == "month":
            return "0 0 {} * *".format(datetime.today().day)

    def insert_cron(self, command, description):
        rowid = insert(
            "INSERT INTO crontab (cron_type, command, description) "
            "VALUES (?, ?, ?);",
            (self.cron_type, command, description)
        )

        task = self.cron.new(command)
        task.setall(self._type2str())
        task.set_comment(str(rowid))
        self.cron.write()

    def delete_cron(self, cron_id):
        execute("DELETE FROM crontab where cron_id = ?;", (cron_id,))
        for task in self.cron:
            if task.comment == str(cron_id):
                self.cron.remove(task)
        self.cron.write()

    def select_cron(self):
        tasks = execute("SELECT * FROM crontab;")
        result = []
        for i in tasks:

            nxt = ""
            for task in self.cron:
                if task.comment == str(i[0]):
                    nxt = task.schedule(date_from=datetime.now()).get_next()

            result.append({
                "next": nxt,
                "cron_id": i[0],
                "cron_type": i[1],
                "command": i[2],
                "description": i[3]
            })

        return result


if __name__ == '__main__':
    from crontab import CronTab

    my_cron = CronTab(user=getpass.getuser())
    for job in my_cron:
        print(job)
