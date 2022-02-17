# NewsletterSignup

A barebones newsletter signup node app, which can easily be deployed to Heroku. <br>
## Running locally
Make sure you have Node.js and the Heroku CLI installed, and replace .env_sample file with .env file with your own mailchimp API Key. <br>
Check your mailchimp account to see if email has been successfully logged.
```
$ git clone https://github.com/ImmaCrayon81/NewsletterSignup.git
$ cd NewsletterSignup
$ npm install
$ nodemon app.js || node app.js
```
Your app should now be running on localhost:3000.

<br>
## Deploying to Heroku
```
$ heroku create
$ git push heroku master
$ heroku open
```
