# Developer Documentation

This goes to the beginning of the process, assuming that you do not have an environment set up at all. Depending on your own situation, you may be able to skip much of this and proceed to *Download Repository*


## Install Ubuntu

Install Ubuntu 16 from DVD as usual. Takes a while...

If you're jusing VirtualBox, don't forget the Guest Additions CD, and to enable the bidirectional clipboard.

I'm a fan of running the network adapter in Briged mode so I have a real IP address on my LAN, and can visit the development site from my other PC and from my phones and tablets, for testing.

And you'll want to install Node and update everything:

```
sudo apt-get update

sudo apt-get install nodejs nodejs-legacy

sudo apt-get install git npm

sudo apt-get upgrade

```

Don't forget to reboot. You did update a lot of packages!


## Heroku Toolbelt

Straight from Heroku's own instructions:
```
sudo add-apt-repository "deb https://cli-assets.heroku.com/branches/stable/apt ./"
curl -L https://cli-assets.heroku.com/apt/release.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install heroku

heroku --version
heroku login
```


## Download Repository, Set Remotes and Environment

Clone the repository as usual, then set up your Heroku targets. Here, I assume you'll have 2 Heroku applications: one for staging and one for 

```
cd ~
git clone https://github.com/GreenInfo-Network/caliparks.org.git caliparks-development
cd caliparks-development
```

Move your .env file into place, then edit it for your own values. We don't store these values in the repository, but in the local *.env* file. For our own reference, use offline storage or a service such as 1Password.
* GOOGLE_APP_KEY is had from the Google API Console. You would need to generate one for your site.
* DATABASE_URL is had from Heroku, when you add Heroku Postgres to the new project. Resources / Postgres / Credentials

```
cd app

cp .env-sample .env
```

In the *app* folder of the repo, install package dependencies.

```
cd app

npm install
sudo npm install -g foreman
npm build
```

Add the Heroku targets, and also set environment variables:

```
heroku git:remote -r production -a caliparks-production
heroku git:remote -r development -a caliparks-development

heroku config:set GOOGLE_APP_KEY=XXX DATABASE_URL=XXX NODE_ENV=production NPM_CONFIG_LOGLEVEL=error NPM_CONFIG_PRODUCTION= false
```
