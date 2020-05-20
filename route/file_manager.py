import flask
from flask import request, jsonify, send_from_directory

from main import app
from model.file_manager import FileManager


@app.route('/api/file_list', methods=['GET'])
def handle_file_list():
    # 获取目录信息
    if request.method == 'GET':
        return jsonify({
            "file": FileManager(request.args.get('path')).get_file_list()
        })


@app.route('/api/file', methods=['GET', 'DELETE', 'PATCH'])
def handel_file():
    if request.method == 'GET':
        # 下载文件
        print(request.values.get('path'))
        return flask.send_file(request.values.get('path'), as_attachment=True)
    elif request.method == 'DELETE':
        # 删除文件
        FileManager(request.json['path']).delete_file()
        return jsonify({"status": "OK"})
    elif request.method == 'PATCH':
        print(request.form['path'])
        FileManager(request.form['path']).upload(request.files.get('file'))
        return jsonify({"status": "OK"})
