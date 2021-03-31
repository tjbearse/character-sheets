import flask
from flask import Flask, jsonify, request

import flask_admin as admin

import database
from admin import GameView

app = Flask(__name__)
# FIXME testing only
app.config['SECRET_KEY'] = '123456790'

db = database.getDB()

@app.route('/api')
def send_games():
    return 'hello'

@app.route('/api/games', methods=['GET', 'POST',])
def games_collection():
    if request.method == 'POST':
        json = request.get_json()
        if not json:
            flask.abort(400)
        cursor = db.games.insert_one(json)
        return flask.jsonify({ "_id": cursor.inserted_id })
    else:
        return flask.jsonify(
            list(db.games.find({}, {"name": 1})) # mongo will strip this down
        )

@app.route('/api/games/<gameId>', methods=['GET', 'PUT',])
def single_game(gameId):
    print("this is a thing")
    if request.method == 'PUT':
        json = request.get_json()
        if not json:
            flask.abort(400)
        db.games.update_one(
            { '_id': gameId },
            { '$set': json}
        )
    else:
        game = db.games.find_one({"_id": gameId})
        if not game:
            flask.abort(404)
        return flask.jsonify(game)

if __name__ == "__main__":
    # Create admin
    admin = admin.Admin(app, name='Example: TinyMongo - TinyDB')

    # Add views
    admin.add_view(GameView(db.games, 'Games'))

    app.run(host= 'localhost', debug = True)
