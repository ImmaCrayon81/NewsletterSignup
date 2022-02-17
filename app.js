const express = require("express"); //makes node easier to use
const https = require("https"); //fetch external API
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public")); //to use static folders and files on the computer

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

console.log(process.env);

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: "us14"
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const listId = "da615e2acb";

  const subscriber = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  //Uploading data to server
  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscriber.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscriber.firstName,
        LNAME: subscriber.lastName
      }
    });

    //If all goes well logging contact
    res.sendFile(__dirname + "/success.html")
    console.log(`Successfully added contact as an audience member. The contact id is ${response.id}.`);
  }

  //Running the function and catching the errors if anonymous
  run().catch(e =>  res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


//   const jsonData = JSON.stringify(data);
//
//   const url = "https://us14.api.mailchimp.com/3.0/lists/da615e2acb"
//
//   const options = {
//     method: "POST",
//     auth: "enyang:c64f072103f1b6efa0b2c6533278bccd-us14"
//   }
//
//   const request = https.request(url, options, function(response) {
//     response.on("data", function(data) { //on is the same as eventListener for JS, just shorter to type
//       console.log(JSON.parse(data));
//     })
//   })
//
//   request.write(jsonData);
//   request.end();
//
//
//
// });

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
})

//API apiKey
//c64f072103f1b6efa0b2c6533278bccd-us14

//AudienceID
//da615e2acb

//Root url
//https://us14.api.mailchimp.com/3.0/

//heroku url
//https://evening-bastion-58534.herokuapp.com/
