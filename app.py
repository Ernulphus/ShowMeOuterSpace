#Backend by Patrick and Boaz wheeee!
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def landing_page():
    #return render_template('landing_page')
    pass

#route for the page to draw between stars
@app.route('/draw', methods=['GET'])
def draw():
    return render_template('draw.html')

#route for the page to turn drawing into stars
@app.route('/convert')
def convert():
    pass

#route for the login page
@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')

app.run(debug=True)
