from flask_admin.contrib.pymongo import ModelView, filters
from wtforms import fields, form
from flask_admin.model.fields import InlineFieldList, InlineFormField
from flask_admin.form import Select2Widget

class GameForm(form.Form):
    name = fields.StringField('Name')
    players = InlineFieldList(fields.StringField('PlayerId'))


class GameView(ModelView):
    column_list = ('_id', 'name', 'players')
    column_sortable_list = ('name')

    form = GameForm

    page_size = 20
    can_set_page_size = True


class FTDSheet(form.Form):
    #TODO set defaults
    name = fields.StringField('Name')
    description = fields.StringField('Description')
    perk = fields.StringField('Perk')
    talent = fields.StringField('Talent')
    tool = fields.StringField('Tool')
    motivation = fields.StringField('Motivation')
    harm = fields.IntegerField('Harm', default=0)
    zeal = fields.IntegerField('Zeal', default=5)
    items = fields.StringField('Items')

    gameId = fields.StringField('Game')
    playerId = fields.StringField('Player')

class SheetView(ModelView):
    column_list = ('_id', 'name', 'playerId', 'gameId')
    column_sortable_list = ('name')

    form = FTDSheet

    page_size = 20
    can_set_page_size = True
