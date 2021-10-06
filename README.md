# Ditchionary
A simple react app to view books with options for the app to read the text in addition to show translations in Turkish.
This app was created as part of Stackathon within Grace Hopper Academy

Users can signup and login, in the home page they can see all the available books, they can go to a book, navigate to the pages, and read the page with two features;

1)They can hear the text by clicking on the read button 
2)They can see the translation of a word, when the user selects a word they will see a popup with the translation and hear the pronunciation at the same time. 

React was implemented on the frontend and Node, Express and Sequelize were utilized for the backend in addition to the use of two APIs;
* Google Translate API
* Speech Synthesis feature of WebSpeech API 

## Start

Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database


