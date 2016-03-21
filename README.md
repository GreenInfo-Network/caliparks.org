# [caliparks.org](http://caliparks.org)

Stories pour out of our parks every day. This project is visualizing [Instagram](http://instagram.com) content using the actual boundaries of our parks, so that we can start to understand how people feel about their favorite open spaces. Taken together these stories make plain that parks are integral to the lives of all Californians. They are evidence for the argument that access to open space must be protected—and expanded—for all and that parks need our support. This is also a tool that park rangers, managers, and advocates can use to understand how people are using parks and to connect with their customers and supporters.

## The App
All code is in [app directory](./app).

### To deploy
```bash
git push heroku `git subtree split --prefix app parksforward-redesign`:master --force
```
or
```bash
git push production `git subtree split --prefix app parksforward-redesign`:master --force
```
or
```bash
npm run deploy:staging
```
or
```bash
npm run deploy:production
```

## The Harvesters
Interested in the social media harvesters which make this all possible? Sure
you are! They are in a different
[branch](https://github.com/stamen/parks.stamen.com/tree/node-harvester)
