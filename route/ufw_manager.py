from flask import request, jsonify

from main import app
from model.ufw_manager import PortManager, IPManager


@app.route('/api/ufw/port', methods=['GET', 'POST', 'DELETE'])
def handle_ufw_port():
    if request.method == 'GET':
        return jsonify(PortManager.get_allow_port())
    elif request.method == 'DELETE':
        PortManager(request.form['port'], request.form['protocol']).delete_allow_port()
        return jsonify({"status": "OK"})
    elif request.method == 'POST':
        PortManager(request.form['port'], request.form['protocol']).add_allow_port(request.form['description'])
        return jsonify({"status": "OK"})


@app.route('/api/ufw/ip', methods=['GET', 'POST', 'DELETE'])
def handle_ufw_ip():
    if request.method == 'GET':
        return jsonify(IPManager.get_deny_ip())
    elif request.method == 'DELETE':
        IPManager(request.form['ip'], request.form['protocol']).delete_deny_ip()
        return jsonify({"status": "OK"})
    elif request.method == 'POST':
        IPManager(request.form['ip'], request.form['protocol']).add_deny_ip(request.form['description'])
        return jsonify({"status": "OK"})
