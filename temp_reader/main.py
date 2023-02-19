# cross-platform compatible sleep function
from PiicoDev_Unified import sleep_ms
from tempReader import read_temp_from_sensor
from mongodb import create_data_base, insert_one_temp_data


def saveTempReadingToMongo():
    temp = read_temp_from_sensor()
    print(str(temp))
    insert_one_temp_data(temp)


def main():
    # create the database if it doesn't exist
    create_data_base()
    # keep recording the temp every 1 minute
    while True:
        saveTempReadingToMongo()
        sleep_ms(60000)


if __name__ == "__main__":
    main()
