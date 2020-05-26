#! ./venv/bin/python

from flask_cors import CORS
from flask import Flask, request, redirect

app = Flask(__name__, static_url_path='')
CORS(app, supports_credentials=True)


@app.route('/')
def hello_world():
    if 'login' not in request.cookies:
        return redirect('html/login.html', code=302)
    return app.send_static_file('index.html')


if __name__ == '__main__':
    from route import *

    app.run(
        debug=True,
        host='0.0.0.0',
        port=8888
    )
