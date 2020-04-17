# GateWay - An open-source IoT Platform
[logo]: https://github.com/irajeshegde/GateWay/blob/master/images/logo.jpg
## About
GateWay is an online platform that manages all the data collected and used by your IoT application. Once connected to your device or application, one can control their device or access the data from the device from anywhere around the globe that has an internet connection.

## Tech Stack
- NodeJs and Express for backend.
- MongoDB as a database.
- HTML,CSS, EJS and Semantic UI for user interface.

## Project Setup Steps

- Download and setup nodejs, npm and mongoDB on your system
⋅⋅* https://nodejs.org/en/
⋅⋅* https://www.npmjs.com/
⋅⋅* https://www.mongodb.com/

- Download the project from github
..* ```$git clone https://github.com/irajeshegde/GateWay.git```

- Once the code is downloaded, follow these steps (in terminal)
... * Start mongoDB server by running ```$mongod``` and keep it running
... * ```$cd GateWay``` - move into the GateWay directory
... * ```$npm i``` - install packages
... * ```$node app.js``` - Run the nodejs server

## Web Browser (Open any web-browser)
Open http://localhost:3000/ to see your running project!


## Options available

* Register - if you are a new user click on this and create an account. We used passport js for auth and username and password (hash value) will be stored in mongoDB database.

* Login - once the account is created click to login and it will take you to the homepage.
Secret page - Homepage which needs authentication. ( Without authentication it is not possible to access any of the pages or data )

* New Channel - To create a channel. He can add 2 fields along with names and values. Each channel will contain API key and USAGE url to access the values of that particular channel from microcontroller.
Example: 	API KEY : 5dc0768ffc9e3124342059ef
USAGE : http://localhost:3000/channel/api/5dc0768ffc9e3124342059ef


* View channel - It will take you to more details of created channel where you can see the given values and also you can Update values of the field. Delete will delete that particular channel.
Logout - Ends the login session for the current user.



