from flask import Flask, send_from_directory
from werkzeug.exceptions import NotFound

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    try:
        return send_from_directory(app.static_folder, path)
    except NotFound:
        return send_from_directory(app.static_folder, "index.html")
