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

CREATE TABLE IF NOT EXISTS ufw_port
(
    rule_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    port        INTEGER NOT NULL,
    protocol    TEXT    NOT NULL,
    description TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS ufw_ip
(
    rule_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    ip          TEXT NOT NULL,
    protocol    TEXT NOT NULL,
    description TEXT NOT NULL
);