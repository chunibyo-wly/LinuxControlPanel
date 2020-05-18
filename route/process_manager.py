import flask
from flask import request, jsonify, send_from_directory
from main import app
from model.process_manager import ProcessManger


@app.route('/api/process', methods=['GET', 'DELETE'])
def get_process():
    if request.method == 'GET':
        return jsonify(
            sorted(
                ProcessManger.get_process(),
                key=lambda item: item['cpu'],
                reverse=True
            )
        )
    elif request.method == 'DELETE':
        try:
            ProcessManger(request.form['pid']).kill_process()
        except Exception as e:
            print(e)
        return {
            "status": "OK"
        }
