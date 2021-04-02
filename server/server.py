import flask
from flask import Flask, jsonify, request

import flask_admin as admin

import database
from admin import GameView, SheetView

app = Flask(__name__)
# FIXME testing only
app.config['SECRET_KEY'] = '123456790'

db = database.getDB()

@app.route('/api')
def send_games():
    return 'hello'

# TODO limit requests to authz

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
            list(db.games.find({}))
        )

@app.route('/api/games/<gameId>', methods=['GET', 'PUT',])
def single_game(gameId):
    if request.method == 'PUT':
        json = request.get_json()
        if not json:
            flask.abort(400)
        #TODO validate schema
        db.games.update_one(
            { '_id': gameId },
            { '$set': json}
        )
        return jsonify(success=True)
    else:
        game = db.games.find_one({"_id": gameId})
        if not game:
            flask.abort(404)
        return flask.jsonify(game)

@app.route('/api/games/<gameId>/sheets', methods=['GET', 'POST',])
def game_sheets(gameId):
    if request.method == 'POST':
        json = request.get_json()
        if not json:
            flask.abort(400)
        #TODO validate schema
        json['game'] = gameId
        cursor = db.sheets.insert_one(json)
        return flask.jsonify({ "_id": cursor.inserted_id })
    else:
        return flask.jsonify(
            list(db.sheets.find({ "gameId": gameId }))
        )

@app.route('/api/sheets', methods=['GET', 'POST',])
def sheets_collection():
    if request.method == 'POST':
        json = request.get_json()
        if not json:
            flask.abort(400)
        #TODO validate schema
        cursor = db.sheets.insert_one(json)
        #TODO move returned data to 'data' field
        return flask.jsonify({ "_id": cursor.inserted_id })
    else:
        return flask.jsonify(
            list(db.sheets.find())
        )

@app.route('/api/sheets/<sheetId>', methods=['GET', 'PUT',])
def single_sheet(sheetId):
    if request.method == 'PUT':
        json = request.get_json()
        if not json:
            flask.abort(400)
        #TODO validate schema
        db.sheets.update_one(
            { '_id': sheetId },
            { '$set': json}
        )
        return jsonify(success=True)
    else:
        sheet = db.games.find_one({"_id": sheetId})
        if not sheet:
            flask.abort(404)
        return flask.jsonify(sheet)

if __name__ == "__main__":
    admin = admin.Admin(app, name='Example: TinyMongo - TinyDB')
    admin.add_view(GameView(db.games, 'Games'))
    admin.add_view(SheetView(db.sheets, 'Sheets'))


    # FIXME debug
    app.run(host= 'localhost', debug = True)
