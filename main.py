#! ./venv/bin/python

from functools import wraps
from time import sleep
import json

from flask_cors import CORS
from flask_socketio import SocketIO
from flask import Flask, url_for, render_template, request, make_response, redirect, jsonify
from flask_socketio import emit
import yaml

from model.file_manager import FileManager
from model.system_user import SystemUser
from model.system_info import SystemWatch

app = Flask(__name__, static_url_path='')
app.config.update(DEBUG=True)
CORS(app, supports_credentials=True)

socketio = SocketIO(app)


@app.route('/')
def hello_world():
    # if 'login' not in request.cookies:
    #     return redirect('html/login.html', code=302)
    return app.send_static_file('html/index.html')


@app.route('/api/login', methods=['POST'])
def log_in():
    print(request.form)
    with open('./config.yaml', 'r') as f:
        user = yaml.load(f, Loader=yaml.SafeLoader)['user']
        if request.json['name'] == user['name'] and request.json['passwd'] == user['passwd']:
            response = {
                "status": "OK"
            }
        else:
            response = {
                "status": "WRONG"
            }
    resp = make_response(response)
    resp.set_cookie('login', 'True')
    return resp


@app.route('/api/logout', methods=['POST'])
def log_out():
    if 'login' not in request.cookies:
        return {
            "status": "WRONG"
        }

    response = {
        "status": "OK"
    }
    resp = make_response(response)
    resp.delete_cookie('login')
    return resp


##################################
#          websocket             #
##################################

# @socketio.on('connect')
# def test_connect():
#     pass
#
#
# @socketio.on('sys_info')
# def send_message():
#     socketio.start_background_task(
#         SocketIOSystemWatch,
#         socketio
#     )
#

##################################
#          websocket             #
##################################


@app.route('/api/sysinfo', methods=['GET'])
def get_sys_info():
    return jsonify({
        'cpu_info': SystemWatch.get_cpu_info(),
        'mem_info': SystemWatch.get_mem_info(),
        'disk_info': SystemWatch.get_disk_info(),
        'io_info': SystemWatch.get_io_info()
    })


@app.route('/api/dns', methods=['GET', 'POST'])
def handle_dns():
    response = {}

    if request.method == 'GET':
        cnt = 0
        with open('/etc/resolvconf/resolv.conf.d/base') as f:
            for line in f:
                cnt += 1
                response['server_' + str(cnt)] = line.split(' ')[-1][:-1]

    elif request.method == 'POST':
        print(request.data)
        with open('/etc/resolvconf/resolv.conf.d/base', 'w') as f:
            f.writelines([
                'nameserver\t' + request.json['server_1'] + '\n',
                'nameserver\t' + request.json['server_2'] + '\n'
            ])
        response = {
            'status': 'OK'
        }
    return response


@app.route('/api/user', methods=['GET', 'POST'])
def handle_user():
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        operation = request.json['operation']
        if operation == 'add':
            user = SystemUser(request.json['name'], request.json['passwd'])
            user.add_user()
            user.add_passwd()
        elif operation == 'delete':
            user = SystemUser(request.json['name'])
            user.delete_passwd()
        return {
            "status": "OK"
        }


@app.route('/api/file', methods=['GET'])
def handle_file():
    if request.method == 'GET':
        return jsonify({
            "file": FileManager.get_file_list(request.args.get('path'))
        })


if __name__ == '__main__':
    socketio.run(
        app=app,
        # debug=True,
        host='0.0.0.0',
        port=8888
    )
