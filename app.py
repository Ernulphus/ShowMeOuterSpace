#Backend by Patrick and Boaz wheeee!
from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/', methods=['GET'])
def landing_page():
    return render_template('landing_page.html')


#route for the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')


#route for the register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')


#route for the user to select the game
@app.route('/games', methods=['GET'])
def games():
    return render_template('games.html')


#route for the page to draw between stars
@app.route('/draw', methods=['GET'])
def draw():
    return render_template('draw.html')


#route for the page to turn drawing into stars
@app.route('/convert', methods=['GET', 'POST'])
def convert():
    pass


def run():
    app.run(debug=True)


if __name__ == '__main__':
    run()
