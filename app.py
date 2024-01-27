from flask import Flask
from requests import get
import os
from flask import render_template, request
import time
import database
import re

app = Flask(__name__)
# db = database.database()


def getClassById(id):
    try:
        course = get('https://api-next.peterportal.org/v1/rest/courses/' + id).json()['payload']
        return course
    except:
        return "Class Not Found"

@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/getClassById/<id>')
def getClassByIdEndpoint(id):
    return getClassById(id)


@app.route('/getProfsFromClassId/<id>')
def getProfs(id):
    profsList = []
    classInfo = getClassById(id)
    print(classInfo)
    for i in range(len(classInfo['instructors'])):
        profsList.append(get('https://api-next.peterportal.org/v1/rest/instructors/' + classInfo['instructors'][i]['ucinetid']).json())
    
    profsWithoutPayload = []
    for prof in profsList:
        profsWithoutPayload.append(prof['payload'])
    return profsWithoutPayload

@app.route('/getGradesFromClassId/<id>')
def getGrades(id):
    course = getClassById(id)
    department = course['department']
    number = course['courseNumber']

    url = 'https://api-next.peterportal.org/v1/rest/grades/aggregate?courseNumber=' + number + '&department=' + department
    # args = request.get_json()
    # for key in args:
    #     url += key + '=' + args[key] + '&'

    return get(url).json()['payload']


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
        # db.insertRating(class_id, str(enjoyment_rating), str(difficulty_rating), comment, grade, str(int(added_timestamp)), instructor)
        
        return "Successful insertion"

    except Exception as e:
        print(e)
        return "Unsuccessful insertion"
    

#SERVER HTML FILES
@app.route('/<path:filename>')
def serve_frontend(filename):
    print(filename)
    return render_template(filename)
