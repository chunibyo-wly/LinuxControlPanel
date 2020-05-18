from flask import request, jsonify

from main import app
from model.docker_manager import DockerManager


@app.route('/api/docker', methods=['GET', 'PUT'])
def handle_docker():
    if request.method == "GET":
        return jsonify(DockerManager.get_container())
    elif request.method == "PUT":
        if request.form["operation"] == "stop":
            DockerManager(request.form["container_id"]).stop_container()
            return jsonify(DockerManager.get_container())
        elif request.form["operation"] == "start":
            DockerManager(request.form["container_id"]).restart_container()
            return jsonify(DockerManager.get_container())
