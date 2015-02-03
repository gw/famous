from flask import Flask
from pymongo import MongoClient
#client = MongoClient('mongodb://172.17.0.3:27017/')
#client = MongoClient('mongodb://localhost:27017/')

app = Flask(__name__)

@app.route('/')
def read_text():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True)
