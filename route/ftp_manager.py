import os

import flask
from flask import request, jsonify

from main import app
from model.ftp_manager import FtpManager


@app.route('/api/ftp_list', methods=['GET'])
def handle_ftp_list():
    # 获取目录信息
    if request.method == 'GET':
        return jsonify({
            "file": FtpManager(request.args.get('path')).get_file_list()
        })


@app.route('/api/ftp', methods=['GET', 'DELETE', 'PATCH'])
def handle_ftp():
    if request.method == 'GET':
        # 下载文件
        return flask.send_file('/srv/ftp' + request.values.get('path'), as_attachment=True)
    elif request.method == 'DELETE':
        # 删除文件
        FtpManager(request.json['path']).delete_file()
        return jsonify({"status": "OK"})
    elif request.method == 'PATCH':
        FtpManager(request.form['path']).upload(request.files.get('file'))
        return jsonify({"status": "OK"})
