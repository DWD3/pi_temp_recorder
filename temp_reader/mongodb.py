import pymongo
import time
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db_name = 'temp_recording'
collection_name = 'temp_recording'


def create_data_base():
    all_database = myclient.database_names()
    if db_name not in all_database:
        # creating database
        print("create database " + db_name)
        db = myclient[db_name]
        if collection_name not in db.collection_names():
            print("create collecton " + collection_name)
            db.create_collection(collection_name)


def insert_one_temp_data(temp):
    myclient[db_name][collection_name].insert_one(
        {
            "temp": temp,
            "timestamp": get_current_timestamp_in_GMT()
        }
    )


def get_current_timestamp_in_GMT():
    return str(time.time())
