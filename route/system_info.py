from flask import jsonify

from main import app
from model.system_info import SystemWatch


@app.route('/api/sysinfo', methods=['GET'])
def get_sys_info():
    return jsonify({
        'cpu_info': SystemWatch.get_cpu_info(),
        'mem_info': SystemWatch.get_mem_info(),
        'disk_info': SystemWatch.get_disk_info(),
        'io_info': SystemWatch.get_io_info()
    })


@app.route('/api/netstat', methods=['GET'])
def get_netstat():
    return jsonify(SystemWatch.get_netstat_info()[:20])
