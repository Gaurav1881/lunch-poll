const express = require('express')
const app = express()
const https = require('https');
const request = require('request');
path = require('path')
bodyParser = require('body-parser')
cors = require('cors')
var admin = require("firebase-admin")


app.use(bodyParser.json());
//app.use(cors);
let port = process.env.PORT || 4000;

// var serviceAccount = require("./firebase-admin-key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://places-1562338603006.firebaseio.com"
// });


app.route('/api/getData').get((req, res) => {
  var location = req.query.location;
  request("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?" +
    "input=" + location + "&" +
    "inputtype=textquery&" +
    "fields=formatted_address,geometry&" +
    "key=AIzaSyAqZgO4VcpDJjBCUXpp9CXYXf8PW5WCMSw",
    (error, resp, body) => {
      object = JSON.parse(body);
      console.log(body);
      request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=" + object.candidates[0].geometry.location.lat + ',' + object.candidates[0].geometry.location.lng + "&" +
        "rankby=distance&" +
        "type=restaurant&" +
        "key=AIzaSyAqZgO4VcpDJjBCUXpp9CXYXf8PW5WCMSw",
        (error, resp, body) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(body)
        }
      )
    }
  ).on("error", (err) => {
    console.log("Error: " + err.message);
  });
})

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});
