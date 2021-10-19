<div align="center">
  <a href="https://simplemta.herokuapp.com/">
    <img src="/client/src/imgs/svg/mticon.svg" width="180px" height="180px" alt="icon with magnifying glass and train" />
  </a>
    <h1>Simple MTA</h1>
   
</div>

### Contributors
- [Chue Zhang](https://github.com/Chuezhang2278)
- [Jia Ming Ma](https://github.com/jma8774)
- [Xiangmin Mo](https://github.com/mxmsunny)


*Simple MTA* is a personalized version of MTA's website that is designed for day to day use while also maintaining its core value, *simplicity*. It provides users with an easy way to look up train lines, train stations and an easy way for users to bookmark stations that they go to more frequently. 

It is also our group's final project for *[CUNY Tech Prep's](https://cunytechprep.nyc/)* Web Development Track.

🔍**View the website [here](https://www.simplemta.xyz/) or [here](https://simplemta.herokuapp.com/)!** 

# Tech Stack 💻
### Front End
* JavaScript/HTML/CSS
* React
* Material UI
### Back End
* Node.js
* Express.js
* PostgreSQL
* Sequelize
### API
- MTA API
- GTFS and GTFS-RT

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
## Credits 📖
Background Photos provided by:
* [Photo](https://unsplash.com/photos/PJzeDJAw3oI) by S on Unsplash
* [Photo](https://unsplash.com/photos/k_j7olQiqAw) by Nic Y-C on Unsplash
* [Photo](https://unsplash.com/photos/8mswK-LU5Vs) by Patrick Robery Doyle on Unsplash

Logo Vector Images provided by:
* [Magnifying Glass](https://thenounproject.com/search/?q=magnify&i=589366) created by Delwar Hossian from Noun Project
* [Train](https://thenounproject.com/search/?q=train&i=3888723) created by HideMaru from Noun Project

Train Icons provided by:
* [Train icons](https://github.com/louh/mta-subway-bullets) created by louh on GitHub
