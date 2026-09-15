from flask import Flask, request, redirect, render_template, jsonify, session

app = Flask(__name__)

@app.route("/")
def mainpage():
    return render_template("/FirstPage.html")


if __name__ == "__main__":
    app.run(debug=True)