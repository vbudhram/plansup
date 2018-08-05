# Plansup (Formerly Whenwhere)
Make events happen. Simply.

## Requirements
* Install [Node 6+](https://nodejs.org/en/download/)
* Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Install [Ionic](http://ionicframework.com/docs/v2/intro/installation/)

## Install
* Run `git clone https://github.com/vbudhram/ww-app.git`
 * To commit code, you need git linked to your github via SSH keys or username password.
* cd to `ww-app`
* Add ios and android platforms
 * `ionic platform add ios`
 * `ionic platform add android`
* Run `npm install`

## Running
* Run `ionic serve` 🎆

## Using custom config
To use a custom configuration file with your own Firebase settings etc, create a `dev.json` file with the content below and place it outside of the project folder.

```json
{
   "firebase":{
      "apiKey":"yourApiKey",
      "authDomain":"yourAuthDomin",
      "databaseURL":"yourDatabaseUrl",
      "storageBucket":"yourStorageBucket",
      "messagingSenderId":"yourSenderId"
   }
}
```

To start ionic server with this configuration use `ionic serve --dev`.

