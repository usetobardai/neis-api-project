from flask_cors import CORS

def init_cors(app):
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})