from flask import Flask, send_from_directory
from requests import get
import os
from flask import render_template, request
import time
import database
import math

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

# @app.route('/professor/<professorNetId>')
# def serve_professor(professorNetId):
#     return render_template("professor.html")

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
        return e

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
    
@app.route('/api/getClassStatistics/<classId>', methods=['GET'])
def getClassStatistics(classId):
    try:
        rating_records = db.getClassRatings(classId)
        avg_enjoyment = 0
        avg_difficulty = 0
        for record in rating_records:
            avg_enjoyment += int(record["enjoyment_rating"])
            avg_difficulty += int(record["difficulty_rating"])
        return {"avg_enjoyment": math.floor(avg_enjoyment/len(rating_records)), "avg_difficulty": math.floor(avg_difficulty/len(rating_records))}
    except Exception as e:
        return {"avg_enjoyment": "N/A", "avg_difficulty": "N/A"}

@app.route('/api/getInstructorStatistics/<instructorId>', methods=['GET'])
def getInstructorStatistics(instructorId):
    try:
        rating_records = db.getInstructorRatings(instructorId)
        avg_enjoyment = 0
        avg_difficulty = 0
        for record in rating_records:
            avg_enjoyment += int(record["enjoyment_rating"])
            avg_difficulty += int(record["difficulty_rating"])
        return {"avg_enjoyment": math.floor(avg_enjoyment/len(rating_records)), "avg_difficulty": math.floor(avg_difficulty/len(rating_records))}
    except Exception as e:
        return {"avg_enjoyment": "N/A", "avg_difficulty": "N/A"}

#ACT LIKE THIS IS THE MAIN FUNCTION DW ABOUT IT
# setClasses()