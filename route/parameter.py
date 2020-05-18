import flask
from flask import request, jsonify, send_from_directory
from main import app


@app.route('/api/url', methods=['GET'])
def get_url():
    return request.args.get("KEY")


@app.route('/api/textplain', methods=['GET'])
def get_textplain():
    return request.data


@app.route('/api/form', methods=['GET'])
def get_form():
    return request.form["KEY"]


@app.route('/api/json', methods=['GET'])
def get_json():
    return request.json["KEY"]
