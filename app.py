from flask import Flask, send_from_directory
from requests import get
import os
from flask import render_template, request
import time
import database

app = Flask(__name__)
db = database.database()

#SERVER HTML FILES
@app.route('/')
def hello():
    return render_template('search.html')

@app.route('/<path:filename>')
def serve_frontend(filename):
    print(filename)
    try:
        return render_template(filename)
    except:
        return render_template('pageNotFound.html')

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
def getClassRatings(classId):
    try:
        rating_records = db.getClassRatings(classId)
        return rating_records
    except Exception as e:
        return "Unsuccessful when trying to get class ratings"
    
@app.route('/api/getInstructorRatings/<instructorId>', methods=['GET'])
def getInstructorRatings(instructorId):
    try:
        rating_records = db.getInstructorRatings(instructorId)
        return rating_records
    except Exception as e:
        return "Unsuccessful when trying to get instructor ratings"
