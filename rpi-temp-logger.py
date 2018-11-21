import os
import time
import request
import json

url="https://shielded-taiga-79763.herokuapp.com/api/log"

def replaceMultiple(string, toBeReplaces, newString):
    for elem in toBeReplaces:
        if elem in string:
            string = string.replace(elem, newString)
    return string

def measure_temp():
    temp = os.popen("vcgencmd measure_temp").readline()
    return (replaMultiple(temp,["temp=","'C","/n"],""))

    while True: 
        print(measure_temp())
        r = request.post(url, params={"metric": measure_temp(), "device": "rpi-01"})

        if r.status_code ! 200:
            print "Error:", r.status_code
            
            
        data = r.json()
        print(data)
        
        time.sleep(60)

