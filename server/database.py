import tinymongo
import tinydb

class TinyMongoClient(tinymongo.TinyMongoClient):
    @property
    def _storage(self):
        return tinydb.storages.JSONStorage


def getDB():
    # FIXME testing only
    DATAFOLDER = '/tmp/flask_admin_test'
    conn = TinyMongoClient(DATAFOLDER)
    return conn.my_tiny_db
