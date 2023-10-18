# node-books-api

A small full stack Angular/Express App that allows the user to search the New York Times Books API, rate books and comment on them. A small SQLite DB is included.

## Getting Started

#### Express Server

- Install node 18 [HERE](https://nodejs.org)
- Navigate to the /api directory and run `npm install`
- Copy the .env.example file contents and paste them into a new file called .env
- Go to the NYT Books API website [HERE](https://developer.nytimes.com/docs/books-product/1/overview) and get an API key, place the API key in .env
- Start the dev server with the command `npm run dev`
- Upon server creation your database will appear automatically

#### Angular UI

- Install the Angular CLI to your global node environment `npm install -g @angular/cli`
- Navigate to the /frontend directory and run `npm install`
- Run `ng serve`

#### Login

- This app has a simple auth system
- Click on the register button at the bottom and enter a Username and Password
- A toast message will appear and you will be redirected to login, enter the same Username and Password you just registered with again to login to the app

#### Final

- Navigate to the books tab, the app will automatically reach out to NYT to populate their current categories, select a chip to get started searching the API book lists. Book Detail, Review and Rating functionality can be accessed by clicking on book items.
