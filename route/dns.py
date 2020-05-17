from flask import request

from main import app


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
