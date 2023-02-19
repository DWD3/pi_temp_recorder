
from PiicoDev_TMP117 import PiicoDev_TMP117

tempSensor = PiicoDev_TMP117()  # initialise the sensor


def read_temp_from_sensor():
    return round(tempSensor.readTempC(), 2)
