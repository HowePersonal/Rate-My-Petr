from flask import Flask
from requests import get
import os
from flask import render_template, request
import time
import database
import re

app = Flask(__name__)
# db = database.database()


# def getClassById(id):
#     try:
#         course = get('https://api-next.peterportal.org/v1/rest/courses/' + id).json()['payload']
#         return course
#     except:
#         return "Class Not Found"
    
def addArgsToUrl(url, args):
    if args:
        for key in args:
            url += key + '=' + args[key] + '&'
    return url

@app.route('/')
def hello():
    return 'PETR'


@app.route('/api/getClass')
def getClasses():
    url = 'https://api-next.peterportal.org/v1/rest/courses?'
    url = addArgsToUrl(url, request.args)
    return get(url).json()['payload']


@app.route('/api/getProf/<ucinetid>')
def getProfs(ucinetid):
    url = 'https://api-next.peterportal.org/v1/rest/instructors/' + ucinetid
    # url = addArgsToUrl(url, request.args)
    return get(url).json()['payload']


@app.route('/api/getGradesFromClass')
def getGrades():
    url = 'https://api-next.peterportal.org/v1/rest/grades/aggregate?'
    url = addArgsToUrl(url, request.args)
    
    return get(url).json()['payload']

# @app.route('/api/getProfsFromClassId/<id>')
# def getProfs(id):
#     profsList = []
#     classInfo = getClassById(id)
#     print(classInfo)
#     for i in range(len(classInfo['instructors'])):
#         profsList.append(get('https://api-next.peterportal.org/v1/rest/instructors/' + classInfo['instructors'][i]['ucinetid']).json())
    
#     profsWithoutPayload = []
#     for prof in profsList:
#         profsWithoutPayload.append(prof['payload'])
#     return profsWithoutPayload


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
    
# TODO:
# Fix this function
# Get ratings from course ID
# Optionally we might want to get ratings from intructor ucinetid
@app.route('/api/getRatings')
def getRatings():
    try:
        data = request.get_json()
        class_id = data['classId']
        # return db.getRatings(class_id)
    except:
        return "Unsuccessful retrieval"
    



#SERVE HTML
@app.route('/<path:filename>')
def serve_frontend(filename):
    try:
        return render_template(filename)
    except:
        return "PATH NOT FOUND"
