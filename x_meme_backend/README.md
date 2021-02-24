# x_meme_backend

backend endpoint for posting and fetching memes

## Requirements

For development you will only need NodeJs, NPM and Mongodb.

## Usage

Start with cloning the repo

To install and setup the library

    $ npm install

serving the app

    $ npm start


## API Endpoints

1. Endpoint to send a meme to the backend

   - HTTP Method - POST
   - Endpoint - /memes
   - Json Body contains these inputs - name, url, caption
   - The backend should allocate a unique id for the meme and return it as a json response.
   - Example request and sample response 
``` 
curl --location --request POST 'http://<Server_URL>/memes' \

--header 'Content-Type: application/json' \

--data-raw '{

"name": "ashok kumar",

"url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",

"caption": "This is a meme"

}'
```

