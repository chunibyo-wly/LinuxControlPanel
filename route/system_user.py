from flask import request

from main import app
from model.system_user import SystemUser


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
