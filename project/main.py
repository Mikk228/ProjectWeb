import eel
import os
import hashlib
# from mimesis import Person
import sqlite3

tasks = {}

command = '''
CREATE TABLE IF NOT EXISTS task(i INTEGER,
                     name TEXT,
                     color TEXT,
                     col INTEGER,
                     row INTEGER,
                     len INTEGER);'''
                     

# person = Person()
con = sqlite3.connect('database.db')

cursor = con.cursor()
cursor.execute(command)
con.commit()




def read_data():
    cursor.execute("SELECT * FROM task;")
    one_result = cursor.fetchall()
    con.commit()
    return one_result

read_data()

@eel.expose
def addToBase(i,name, color, col, row, len):
        
        colorR = color[0]
        colorG = color[1]
        colorB = color[2]

        rgb = f'{colorR} {colorG} {colorB}'


        conn = f'''INSERT INTO 'task'
                          VALUES
                          (?,?,?,?,?,?);'''
        
        print(i, name, color, col, row, len)
        
        cursor.execute(conn, (i, str(name), rgb, int(col), int(row), int(len)))
        con.commit()


        print(read_data())
        con.commit()

@eel.expose
def remove(i):
     i = i[-1]
     print(i)
     cursor.execute(f'''DELETE FROM task
                    WHERE i = {i} ''')
     con.commit()
     read_data()



@eel.expose
def uploadingTasks():
    n = read_data()
    return n

# @eel.expose
# def login(username,password):
    
#      return username

# @eel.expose
# def register(username,password):
#      result = hashlib.sha256(bytes(password, 'utf-8')).hexdigest()
#      return result


if __name__ == '__main__':
    eel.init('web')
    eel.start('index.html', mode="")