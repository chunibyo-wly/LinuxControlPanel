CREATE TABLE IF NOT EXISTS nginx
(
    name TEXT NOT NULL,
    port INT  NOT NULL
);

CREATE TABLE IF NOT EXISTS crontab
(
    cron_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    cron_type   TEXT NOT NULL,
    command     TEXT NOT NULL,
    description TEXT NOT NULL
);