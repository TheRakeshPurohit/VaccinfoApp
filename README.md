# VaccinfoApp
React Native App for android and iOS to get Vaccine Appointment Availability Details by pincode and notification

# Intall APK
[Download APK](https://github.com/TheRakeshPurohit/VaccinfoApp/suites/2633287258/artifacts/57763049)
# It will work for india only

# Restrictions
    Takes current date by default.
# Pre-Requisites

 - buildToolsVersion = "29.0.3"
 - minSdkVersion = 21
 - compileSdkVersion = 29
 - targetSdkVersion = 29
 - ndkVersion = "20.1.5948944"

# Tested on
    Android 8 and 9

# API for validating Pin Code 
 - `https://api.postalpincode.in/pincode/111111`

# API for getting slots
 - `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=111111&date=02-05-2021`

# Libraries used
 - Fetch for API Call
 - React (17.0.1) & React Native (0.64.0)