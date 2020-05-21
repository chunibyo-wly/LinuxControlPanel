import os

import flask
from flask import request, jsonify

from main import app
from model.nginx_manager import NginxManger


@app.route('/api/nginx', methods=['GET', 'DELETE', 'PATCH'])
def handle_nginx():
    if request.method == 'GET':
        # 获取现有的网站
        web_list = NginxManger.get_web_list()
        result = []
        for i in web_list:
            result.append({"name": i[0], "port": i[1]})
        return jsonify({
            "result": result
        })
    elif request.method == 'DELETE':
        # 删除文件
        NginxManger(request.form['name']).delete_file()
        return jsonify({"status": "OK"})
    elif request.method == 'PATCH':
        file = request.files.get('file')
        NginxManger(file.filename.split('.')[0]).upload(file, request.form['port'])
        return jsonify({"status": "OK"})
