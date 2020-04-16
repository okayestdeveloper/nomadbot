# Nomadbot

A simple bot created for a tiny community that popped up to support fans of a teeny brewery in Charlotte NC. It does very little, and it's only useful if you're Thirsty Nomad Brewing.

## Getting Started

### Prerequisites

First you'll need to clone the repository and install dependencies.
```
$ npm i
```

You will need a [Discord](https://discordapp.com/) account and [a server](https://support.discordapp.com/hc/en-us/articles/204849977-How-do-I-create-a-server-).

### Installing

Once you have a Discord server, you can follow the steps under the "Generating Token Key" section of [this article](https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b) to get the token key you need to associate the bot with your server.

Next, create a file called .env in the root of the project. Edit that file and paste your token into it with the key `NOMADBOT_TOKEN`:
```
NOMADBOT_TOKEN=token.goes.here
```

With that done, you can start the bot:
```
$ node index.js
```

This will run the bot locally, which is helpful for development and debugging. For a more long term solution for hosting this or any bot, see the Deployment section.

### Tests

All testing is through [Jest](https://jestjs.io/). At the root of the project, simply run
```
$ jest
```

to run the tests. If you're adding or modifying code, add tests to cover that code. `.test.js` or `.spec.js` are acceptable extensions.

## Deployment

[This article](https://www.writebots.com/discord-bot-hosting/) provides a good guide to hosting your bot. It's what I initially followed. The basic steps are:
1. Set up a hosted server somewhere. In other words, set up a VPS - Virtual Private Server.
1. Set up node, npm, ang git on your VPS.
1. Get the code on your VPS.
1. Install dependencies.
1. Run the bot.

On that last point. You'll likely want to set up your server to run the bot with some kind of process manager. There are many ways to do this, and many depend on the operating system on your VPS. I chose to use [PM2](https://pm2.keymetrics.io/) because it's a node module. Getting it going is pretty simple.

Log in to your VPS and install PM2 
```
$ npm install -g pm2
```
Then, in the nomdadbot folder
```
$ pm2 start index.js
```

See the [PM2 website](https://pm2.keymetrics.io/)  for more documenation on managing the process.

## Built With

* [Node.js](https://nodejs.org/)
* [Discord.js](https://discord.js.org/)
* [Chrono-node](https://github.com/wanasit/chrono)
* [Moment.js](https://momentjs.com/)
* [Dotenv](https://github.com/motdotla/dotenv#readme)
* [Winston](https://github.com/winstonjs/winston)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/okayestdeveloper/nomadbot/tags). 

## Authors

* **Brad Ledbetter** - *Initial work* - [bradledbetter](https://github.com/okayestdeveloper)

See also the list of [contributors](https://github.com/okayestdeveloper/nomadbot/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to [PurpleBooth](https://github.com/PurpleBooth) for the README.md and CONTRIBUTING.md template
* I followed this article by [Renemari Padillo](https://medium.com/@renesansz) to get ramped up on the basics of Discord bot development: https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b
* And this one pointed me in the right direction for hosting options https://www.writebots.com/discord-bot-hosting/

