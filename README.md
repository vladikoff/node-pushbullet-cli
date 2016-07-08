# node-pushbullet-cli

## Setup

Configure the API key, go to https://www.pushbullet.com/account, copy the Access Token.
Create a file in the HOME directory: `~/.pushbulletkey` with your key OR use `PUSHBULLET_KEY` env variable.

Install the CLI: `npm install -g pushbullet-cli`. Might need `sudo` for OS X.


## Usage

```
pushbullet "Hey there"

```

```
npm run build && pushbullet "Build Complete"
```
