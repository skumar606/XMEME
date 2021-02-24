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
```
{

"id": "1"

}
```

2. Endpoint to fetch the latest 100 memes created from the backend

    - HTTP Method - GET
    - Endpoint - /memes
    - Error:
        - If there are no memes available, an empty array shall be returned.
    - Example request and response body
```
curl --location --request GET 'http://<Server_URL>/memes'
```
```
  [

    {

"id": "1",       

"name": "MS Dhoni",

"url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",

"caption": "Meme for my place"

    },

    {

"id": "2",

"name": "Viral Kohli",

"url": "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg",

"caption": "Another home meme"

    }

  ]
```

3. Endpoint to specify a particular id (identifying the meme) to fetch a single Meme.

    - HTTP Method - GET
    - Endpoint - /memes/<id>
    - Error:
        - If a meme with that Id doesn’t exist, a 404 HTTP response code should be returned.
    - Example request and sample response
```
curl --location --request GET 'http://<Server_URL>/memes/<id>'
```
```
    {

"id": "1",       

"name": "MS Dhoni",

"url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",

"caption": "Meme for my place"

    }
```