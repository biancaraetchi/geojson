# How to run the servers:
Pull the codebase: `git clone https://github.com/biancaraetchi/geojson.git`

## Backend:
Make sure to have **python** installed.

1. Move into `be` folder: `cd be`
2. Install requirements:
    - Globally, immediately with: `pip3 install -r requirements.txt`
    - Or using a virtual machine: 
      1. create machine: `virtualenv .venv`
      2. activate machine: `.venv/Scripts/activate`
3. Run server locally on `localhost:8000`: `python manage.py runserver`

## Frontend:
### Installation with **Docker**:
1. Build Docker image: `docker build -t geojson-fe .`
2. Run Docker image on port `localhost:3000`: `docker run -dp 3000:3000 geojson-fe`

### Installation with **Node** (above 18):
  1. Move into the `fe` folder: `cd fe`
  2. Install `npm` packages: `npm install`
  3. Run server locally on `localhost:3000`: `npm run dev`

Visit [http://localhost:3000/](http://localhost:3000/).

## Database:
The PostGIS database, loaded with the `municipalities_nl.geojson` data, is running on Google Cloud; so, I am going to add the .env variables publically. Definitely not ideal, but will have to do for now.
