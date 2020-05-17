import flask
from flask import request, jsonify, send_from_directory

from main import app
from model.file_manager import FileManager


@app.route('/api/file_list', methods=['GET'])
def handle_file_list():
    # 获取目录信息
    if request.method == 'GET':
        return jsonify({
            "file": FileManager.get_file_list(request.args.get('path'))
        })


@app.route('/api/file', methods=['GET', 'DELETE'])
def download_file():
    if request.method == 'GET':
        # 下载文件
        print(request.values.get('path'))
        return flask.send_file(request.values.get('path'), as_attachment=True)
    elif request.method == 'DELETE':
        # 删除文件
        FileManager.delete_file(request.json['path'])
        return jsonify({"status": "OK"})
    elif request.method == 'PATCH':
        return jsonify({"status": "OK"})
