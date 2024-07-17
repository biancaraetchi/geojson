# How to run the servers:
Pull the codebase: `git clone https://github.com/biancaraetchi/geojson.git`

## Frontend:
Make sure to have Node 20 installed.

Move into the `fe` folder: `cd fe`\
Install `npm` packages: `npm install`\
Run server locally on `localhost:3000`: `npm run dev`

## Backend:
Make sure to have python installed.

Move into `be` folder: `cd be`\
Install requirements: `pip3 install -r requirements.txt`\
Run server locally on `localhost:8000`: `python manage.py runserver`

## Database:
The PostGIS database is only locally at the moment, so it is not possible to run the BE and FE without it. 
