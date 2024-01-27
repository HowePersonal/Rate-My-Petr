from flask import Flask
from requests import get
import os
from flask import render_template, request
import time
import database

app = Flask(__name__)
db = database.database()

CLASSES = {}

@app.route('/')
def hello():
    return 'Hello, World! O'

@app.route('/getClassById/<id>')
def getClasses(id):
    if CLASSES.get(id) is None:
        return 'Class not found'
    return CLASSES[id]

def setClasses():
    classes = get('https://api.peterportal.org/rest/v0/courses/all').json()
    for i in range(len(classes)):
        CLASSES[classes[i]['id']] = classes[i]

#SERVER HTML FILES
@app.route('/<path:filename>')
def serve_frontend(filename):
    print(filename)
    return render_template(filename)

@app.route('/api/insertRating', methods=['POST'])
def insertRating():
    try:
        data = request.get_json()
        class_id = data['classId']
        enjoyment_rating = data['enjoymentRating']
        difficulty_rating = data['difficultyRating']
        comment = data['comment']
        grade = data['grade']
        added_timestamp = time.time()
        instructor = data['instructor']
        print(f'class_id {class_id} enjoyment_rating {enjoyment_rating} comment {comment} added_timestamp {added_timestamp} instructor {instructor}')
        db.insertRating(class_id, str(enjoyment_rating), str(difficulty_rating), comment, grade, str(int(added_timestamp)), instructor)
        
        return "Successful insertion"

    except Exception as e:
        print(e)
        return "Unsuccessful insertion"
    

#ACT LIKE THIS IS THE MAIN FUNCTION DW ABOUT IT
# setClasses()