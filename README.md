# Tasty Treats

Tasty Treats is an assigned project, developed to show mainly the ability to use Node.js.

## Guide
In order to run this project, you need the latest version of [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/try/download/community) installed locally.

Moreover, you need to create env files for the Backend and Frontend folders, check them in usage for reference.

## Installation

- Clone the repository in local:

```bash
cd ~/
git clone git@github.com:PasqualeT-Git/tasty_treats.git
git pull origin master
```
- Install dependencies for the back-end:

```
cd ~/tasty_treats/Backend
npm install
```
- Install dependencies for the front-end:
```
cd ~/tasty_treats/Frontend
npm install
```
- Start MongoDB
```
sudo systemctl start mongod 
```
- Populate the database with some random data
```
cd ~/tasty_treats
node Backend/src/populate.js
```


## Usage
- Set the environment files in the Backend and Frontend folders
### Envs
```
# .env Backend
PORT=3000
PORT_FRONT=3001
CAPTCHA_SECRET_KEY=
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

```
# .env Frontend
PORT=3001
REACT_APP_PORT_FRONT=3001
REACT_APP_PORT_BACK=3000
REACT_APP_SITE_KEY=
```

- Run the backend with nodemon:
```
cd ~/tasty_treats/Backend
nodemon src/server.js
```
- Run the frontend with npm in another terminal window:
```
cd ~/tasty_treats/Frontend
npm start
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)