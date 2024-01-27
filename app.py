from flask import Flask, send_from_directory
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
        instructor_id = data['instructorId']
        db.insertRating(class_id, str(enjoyment_rating), str(difficulty_rating), comment, grade, instructor_id)
        
        return "Successful insertion"

    except Exception as e:
        return "Unsuccessful insertion"

@app.route('/api/deleteRating', methods=['POST'])
def deleteRating():
    try:
        data = request.get_json()
        rating_id = data['ratingId']
        db.deleteRating(rating_id)
        return "Successful deletion"
    except Exception as e:
        return "Unsuccessful deletion"

@app.route('/api/updateRating', methods=['POST'])
def updateRating():
    try:
        data = request.get_json()
        class_id = data['classId']
        enjoyment_rating = data['enjoymentRating']
        difficulty_rating = data['difficultyRating']
        comment = data['comment']
        grade = data['grade']
        instructor_id = data['instructorId']
        db.updateRating(class_id, str(enjoyment_rating), str(difficulty_rating), comment, grade, instructor_id)
        return "Successful update"
    except Exception as e:
        return "Unsuccessful update"

@app.route('/api/getClassRatings/<classId>', methods=['GET'])
def getRatings(classId):
    try:
        
        
    except Exception as e:
        return "Unsuccessful when trying to get ratings"
    

#ACT LIKE THIS IS THE MAIN FUNCTION DW ABOUT IT
# setClasses()