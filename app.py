from flask import Flask, jsonify
from pymongo import MongoClient
client = MongoClient('mongodb://172.17.0.3:27017/')
db = client['Texts']

app = Flask(__name__)

@app.route('/')
def read_text():
    try:
        oldestText = db.texts.find().sort("_id", 1).limit(1)[0]
        textBlob = oldestText['text']
        db.texts.remove(oldestText)
    except IndexError:
        return 'We are all out of text blobs. Come back later.'
    except KeyError:
        return 'Sorry; bad data. Try again.'
    except:
        print sys.exc_info()[0]
        return 'Something went horribly wrong. What did you do?'

    return jsonify(text=textBlob)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )
