from functools import wraps

import yaml
from flask import request, make_response, redirect, url_for

from main import app


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


# 验证登录的修饰器
def require_login(**kw):
    def ck(func):
        @wraps(func)
        def _ck(*args, **kwargs):
            if 'login' not in request.cookies:
                return redirect(url_for('html/login.html'))
            else:
                return func(*args, **kwargs)
        return _ck
    return ck
