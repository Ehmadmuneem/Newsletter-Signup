const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || port, function () {
  console.log("Your server is running on port " + port);
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/sign.html");
});

app.post("/", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const eMail = req.body.eMail;
  //const passWord = req.body.passWord;

  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merg_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  //subscribe or unsubscribe a list member
  //POST/lists/{list_ID}
  const url = "https://us14.api.mailchimp.com/3.0/lists/16a0414c6a";
  const options = {
    //post method to post our data to the mailchimp server
    method: "POST",
    //authentication using my name with api key
    auth: "ehmad:a665ddb5a8b2d1bcbe72629d41bcf92b-us14",
  };

  //sending request to mailchimp server to post our data
  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    // response.on("data", function (data) {
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(jsonData);
  request.end();
});

//in failure page while posting data, we can also go to the home page to sigin again
app.post("/failure", function (req, res) {
  res.redirect("/");
});

//my api key
//c26f1e3c7d6b2ac2f914f11fe1514fdb-us14

//list id key
//16a0414c6a
