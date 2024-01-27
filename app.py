from flask import Flask, send_from_directory
from requests import get
import os
from flask import render_template

app = Flask(__name__)

CLASSES = {}

@app.route('/')
def hello():
    return 'Hello, World! O'

@app.route('/getClassById/<id>')
def getClasses(id):
    if CLASSES.get(id) is None:
        return 'Class not found'
    return CLASSES[id]

#SERVER HTML FILES
@app.route('/<path:filename>')
def serve_frontend(filename):
    print(filename)
    return render_template(filename)

def setClasses():
    classes = get('https://api.peterportal.org/rest/v0/courses/all').json()
    for i in range(len(classes)):
        CLASSES[classes[i]['id']] = classes[i]

#ACT LIKE THIS IS THE MAIN FUNCTION DW ABOUT IT
setClasses()