### Setup:
In `app`:
```
npm install
```

Then:
```
npm run start:dev
```

When running in `dev` mode, keep an eye on the console for errors.  If you run into `Invariant` issues you will need to reboot the dev server.


### Issues:
* Mainly need a fresh set of eyes on what I have right now, to see if things look correct.  Also, ways to improve.
* Not liking the directory structure, I have some ideas but suggestion would be nice.
* Jumping to anchor from server side seems to not work as expected.  Seems like I need to write some sort of scroll behavior in main app to handle jumping to anchor.
* Rendering seems funky when app is loaded from server. Particular around the images.  This could also be problem with the Slideshow component I am using.
* Totally open to a whole new approach and feel free to blast this repo and start a fresh one.
* Here are a few of the routes it will need to support, this is easy to do with react-router if the problem of supporting anchor links can be solved.
    - '/'
    - '/parks/:id'
    - '/activities/:activity'
