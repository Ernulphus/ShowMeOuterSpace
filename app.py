#Backend by Patrick and Boaz wheeee!
import flask
import sys
import base64


from lib.security import security
from lib.views import public
from lib.saves.saves import save_image, get_all_images


app = flask.Flask(__name__)
app.register_blueprint(security.security)
app.register_blueprint(public.public_views)


try:
    app.secret_key = sys.argv[sys.argv.index('--key') + 1]
except ValueError:
    app.secret_key = 'e5fce5faa2e20b203c014f358f73c48f7129084ab1643c9fa6a0f87ff7a546a2'
    #get value via os.urandom(32).encode('hex')


#route for the user to select the game
@app.route('/games', methods=['GET'])
def games():
    return flask.render_template('games.html')


#route for the page to draw between stars
@app.route('/draw', methods=['GET'])
@security.login_required()
def draw():
    return flask.render_template('draw.html')


#route for the page to turn drawing into stars
@app.route('/convert', methods=['GET', 'POST'])
def convert():
    pass


#route to view saved constellations
@app.route('/saves', methods=['GET', 'POST'])
def saves():
    if flask.request.method == 'POST':
        username = flask.session.get('username')
        imgname = flask.request.form['constellationName']
        imgstring = flask.request.form['constellationImg']
        imgdata = base64.b64decode(imgstring)
        image_counter = save_image(username, imgname)
        with open('static/img/%d.png' % image_counter, 'wb') as f:
            f.write(imgdata)
    constellations = get_all_images()
    return flask.render_template('saves.html', constellations=constellations)

def run():
    app.run(debug=True)


if __name__ == '__main__':
    run()
