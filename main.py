#! ./venv/bin/python

from flask_cors import CORS
from flask import Flask

app = Flask(__name__, static_url_path='')
# app.config.update(DEBUG=True)
CORS(app, supports_credentials=True)

from route.login import require_login


# socketio = SocketIO(app)

@require_login()
@app.route('/')
def hello_world():
    # if 'login' not in request.cookies:
    #     return redirect('html/login.html', code=302)
    return app.send_static_file('index.html')


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


if __name__ == '__main__':
    from route import *

    app.run(
        debug=True,
        host='0.0.0.0',
        port=8888
    )
