import os

from flask import request, jsonify

from main import app
from model.crontab_manager import CrontabManager


@app.route('/api/crontab', methods=['GET', 'POST', 'DELETE'])
def handle_crontab():
    if request.method == "GET":
        return jsonify(CrontabManager().select_cron())
    elif request.method == "POST":
        CrontabManager(request.form['cron_type']).insert_cron(
            request.form['command'], request.form['description']
        )
        return jsonify({"status": "OK"})
    elif request.method == 'DELETE':
        CrontabManager().delete_cron(request.form['cron_id'])
        return jsonify({"status": "OK"})


@app.route('/api/cwd', methods=['GET'])
def handle_cwd():
    return os.getcwd()
