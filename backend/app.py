from flask import Flask, request, jsonify
from neis_client import search_school
from cors_config import init_cors

app = Flask(__name__)
init_cors(app)

@app.route("/api/schools")
def schools():
    name = request.args.get("name", "")
    if not name:
        return jsonify({"error": "name 파라미터가 필요합니다."}), 400
    try:
        data = search_school(name)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)