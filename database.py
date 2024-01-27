import os
import psycopg2
from dotenv import load_dotenv
import time

load_dotenv()

# Open a cursor to perform database operations


class database:
    
    def __init__(self):
        self.conn = psycopg2.connect(
        host="dpg-cmq75eo21fec739kca90-a.frankfurt-postgres.render.com",
        database="petrdb",
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD'),
        port="5432")
        self.cur = self.conn.cursor()
        
    

    def insertRating(self, class_id, enjoyment_rating, difficulty_rating, comment, grade, added_timestamp, instructor):
        self.cur.execute('INSERT INTO ratings(class_id, enjoyment_rating, difficulty_rating, comment, \
                         grade, added_timestamp, instructor) VALUES (%s, %s, %s, %s, %s, %s)', (class_id, enjoyment_rating, difficulty_rating, comment,
                                                           grade, instructor))
        self.conn.commit()
    
    def close(self):
        self.cur.close()
        self.conn.close()
 

