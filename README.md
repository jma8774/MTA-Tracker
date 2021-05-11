# MTA Tracker
(03/2021 - 06/2021) CUNY Tech Prep - MTA Tracker <br/> <br/>
The purpose of this website is to give New Yorkers a simple and personalized place where they can view the arrival time of uptown and downtowns trains at certain stops.

# Important
Website is deployed [here](https://simplemta.herokuapp.com/) on Heroku. <br/>

I will list my contributions below to the project from which I've forked.

# Technologies
### Front End
* JavaScript/HTML/CSS
* React
* Material UI
### Back End
* Node.js
* Express.js
* PostgreSQL
* Sequelize

# Features
### Line Page
* Users can browse all stations for a certain train line and get information about the time of arrival
* They can also favorite certain stops, so that they would appear on the homepage
* They can click on any of the mini train icons to visit that train's page
* External link to the location of the station on Google Map is provided
* Data on page is updated every 30 seconds
* Can search for stops using the search bar

### Nearby Page
* Users can give permission to their location and the page will display all nearby stops
* This page has almost all the features of the Line Page

![](https://i.imgur.com/hqLMpLs.png)

# REST API Endpoints 
### Train Related Endpoints
This endpoint allows the front-end get all the stops along with the trains arriving at that stop for a certain train line <br/>
 *Sorted to the best of my ability as there is no provided method of sorting the stations correctly*
```
GET /api/line/:train
```
This endpoint allows the front-end get all nearby stops using the user's (lat, lon)
```
GET /api/nearby/lat/:lat/lon/:lon/dist/:dist
```
This endpoint allows the front-end get information about a specific stop. (This one was developed by Chue, one of my group mates)
```
GET /api/station/:stationName
```
This endpoint requires user authentication and will provide all of their favorited stops
```
GET /api/station/favorites
```
The JSON data of each of the endpoints above may look something like this: <br/>
![](https://i.imgur.com/MRJ0ZP0.png)

### User Related Endpoints
This endpoint allows the front-end create a new user in our back-end PostgreSQL database
```
POST /api/user/signup
```
This endpoint will use Passport to authenticate the user when they login
```
POST /api/user/login
```
This endpoint will use Passport to log the user out
```
POST /api/user/logout
```
This endpoint allows the front-end get all of the user's favorited stops
```
GET /api/user/favorite/
```
This endpoint allows the front-end creates a new entry in favorited stop if it does not exist yet
```
PUT /api/user/favorite/
```
This endpoint allows the front-end delete a new entry in favorited stop if exist
```
DEL /api/user/favorite/
```
