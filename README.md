# 👩‍💻 Operation Mother Earth 
Operation Mother Earth is a full stack application for children to learn about electronic waste.  It is a multi-page React application which uses MongoDB as the database.  There are 3 sections to the application.  

Section 1: Storyboard Game
Children can follow a simple story/game and test their knowledge on electronic waste.  The game scores the user at the end of the game and encourages them to play again if they have a low score.  

Section 2: Electronic Waste Recycling Center
This section geolocates the client (with their permission).  Geolocation was chosen because the user I intend to target is young and may spell their location incorrect or not know it.   With the geolocation the appliation searches the Google API to find e-waste centers within a 30km radius of their location.  The default location is central Vancouver.  The client can also add e-waste centers to the map and it uses Google Geocode to find the lattitude and longitude of the client's location and add it to the map. The new center will be posted right away.

Section 3: Education - Videos and Q&A
The Education section has videos about electronic waste and circular economty (targetting to children).  There are also videos of clearing data off your device so you can safely recycle it, this is targetted towards the parents.  The Education sections also has a Q&A sections with questions and their answers and a form that the client can fill out and add a question, which will be answered later but is posted right away.

## 🚀 Deployed site
https://operation-mother-earth.netlify.app/

## 📸 Images
![OME](https://user-images.githubusercontent.com/66695865/218244489-5b230964-c4e4-4bf2-bf20-bde77d25e9c5.png)

## 🎥 Demo Video
<a href="https://www.loom.com/share/9046597dc37d438191343d1a19f8bcb6">Video</a>

## 💻 Built with
<li>React</li>
<li>MonogDB</li>
<li>Mongoose</li>
<li>Express</li>
<li>Axios</li>
<li>Node</li>
<li>SASS</li>
<li>BEM</li>
<li>Formik</li>
<li>Framer-motion</li>
<li>React-router-dom</li>

## 🛠️ Installation Steps:
1. To start using this app you first need to clone the repository:

    git clone git@github.com:revyrob/operation-mother-earth.git

2. Then you will need to install all the required packages for the application. Run this command (if you're using npm):

    npm i

3.  To run the frontend and the backend:

    npm run dev
    
## 👩‍💻 Things to work on
<li>The added centers are not added to the list, only to the map</li>
<li>Make a selection at the beginning for the user to choose French or English</li>
<li>There to be an email to myself and check the centers and the questions before they are added to the app</li>
<li>The Google Maps is turned off because I am not paying for it</li>
<li>Test in schools</li>

