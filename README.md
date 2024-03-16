# sweat-share
Sweat share is an application where fitness professionals, enthusiasts, and lovers can find new exercise programs from other users to implement into their own workout routine. As a user of the application, you will be able to search for programs you want to try out, create exercise programs to share with other users, and comment and rate on programs that you like to give feedback for others. The goal of sweat-share is to create a community of fitness lovers that strive to make each other better by sharing their knowledge, and their love for fitness and exercise!

## Screenshots
<img width="1678" alt="Screenshot 2024-03-15 at 6 40 31 PM" src="https://github.com/psantos2107/sweat-share/assets/146752384/eb0b36b6-7f60-4440-9721-cc1588d43923">
<img width="1772" alt="Screenshot 2024-03-15 at 6 17 45 PM" src="https://github.com/psantos2107/sweat-share/assets/146752384/40f773d0-886d-444b-88d8-b367bfe6adfd">
<img width="1780" alt="Screenshot 2024-03-15 at 6 19 14 PM" src="https://github.com/psantos2107/sweat-share/assets/146752384/c280a6bf-f5ec-4dce-a917-a0aeb4c29c91">
<img width="1787" alt="Screenshot 2024-03-15 at 6 22 17 PM" src="https://github.com/psantos2107/sweat-share/assets/146752384/819eabfd-08f5-4f74-82cf-457b52262669">
<img width="1776" alt="Screenshot 2024-03-15 at 6 20 21 PM" src="https://github.com/psantos2107/sweat-share/assets/146752384/12f5113b-9326-4106-9815-69ce061b4978">

## Entity Relationship Diagram
<img width="705" alt="Screenshot 2024-03-02 at 10 36 59 AM" src="https://github.com/psantos2107/sweat-share/assets/146752384/b65b0da0-495a-4737-80c8-3d2e19bab391">

## Trello Board
https://trello.com/b/fH9bQkie/sweatshare

## Link to Live Site:
https://sweatshare-6d68a7df5043.herokuapp.com/

## Installation Instructions 
- Fork and clone this repo.
- Obtain a Google Maps Embed API Key here: https://developers.google.com/maps/documentation/embed/quickstart. Store it in a .env file in a variable called GOOGLE_API_KEY.
- Ensure you have a mongoDB account (https://www.mongodb.com/), and connect a database to this repo. Store the database connection URI to your .env file in a variable called MONGODBURI.
- Run 'npm install' in the command line for this repo to install all necessary node modules

```
npm install
```
- Run 'npm run seed' to seed the database with users, exercises, and exercise programs.

```
npm run seed
```

## Technologies Used:
- HTML5
- CSS
- Bootstrap CSS
- Google Maps Embed API
- MongoDB
- NodeJS and ExpressJS
- EJS for templating

NPM Modules:
- bcrypt (for password hashing)
- connect-flash (to save messages on sessions)
- dotenv (to read env files)
- ejs (for the templating engine)
- express (for routing)
- express-session (for authentication and authorization)
- method-override (to allow for alternative HTTP methods to be traversed from form data)
- mongoose (to interact with MongoDB)
- puppeteer (to assist with printing out PDFs)
- validator (for error validation)

## Approach Taken
For my project, my initial goal was to establish the file architecture and ensure that all routes were created and routed to the correct places. I implemented an MVC (models-views-controllers) file architecture with a particular focus on practicing the principle of "separation of concerns". A separate routers and utils folder was also created to ensure further modularity of the codebase. After file architecture was established, routers were created using Express.js and routes were tested using POSTMAN. Once routes were deemed to route to the correct files/places, creation of user schemas, exercise program schemas, exercises, and comments was done. Relationships of the schemas can be viewed using the ERD diagram above. Once schemas were created, I then focused on user authentication and authorization. For this, I implemented a sessions-based authentication, creating a stateful API. The landing page was made after this in order to establish the base style of the application. After finishing that, I then focused on ensuring CRUD functionality for users and exercise programs in order to finish the base application. Once the base application was made, additional features such as printing PDFs, filtering + sorting data, and comment + rating integration was done. EJS templates and CSS stylings were created at the appropriate stages of the development of the application.  

## Features
- Carousel components, dropdown menu components, form components
- Sessions-based authentication and authorization
- Use of Google Maps Embed API in order to display the location of users in the application
- Routing with the aid of expressJS
- MongoDB as the database of choice and mongoose for database interactions
- Use of mongoose's aggregation pipeline to calculate average rating for an individual exercise program
- Use of puppeteer in order to create a PDF from user's exercise programs
- Use of mongoose's Query functions in order to implement filtering and sorting of exercise program data
- EJS for server-side view templating
- Use of bcrypt for hashing passwords
- Ability to create, edit, delete, and view users and exercise programs throughout the application
- Ability to add comments to other users' exercise programs to provide feedback for the programs
- Ability to login and logout of the application

## Contributing:
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License
Distributed under the MIT license. See License.txt for more information.

## Contact
Name: Paul Santos

Email: paul.santos2107@gmail.com

LinkedIn: https://www.linkedin.com/in/paulsantos2107/

GitHub: https://github.com/psantos2107

Other Projects: 
- Pokemon Trivia Game: https://github.com/psantos2107/pokemon-trivia-game

## Acknowledgments:
- ChatGPT 4.0 for assistance with debugging and learning how to implement different features in the application
- Bootstrap CSS (https://getbootstrap.com/): for the carousel component, dropdown menu component, and form components
