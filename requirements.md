# Software Requirements

## Vision

What is the vision of this product?
The vision of this product is to provide users with a convenient solution for finding a restaurant when they are unsure where to go. By allowing users to input criteria such as price, location, and food type, the app leverages the Yelp API to generate a random restaurant recommendation. Users can then make reservations through the app, which are stored in a MongoDB database. This product aims to simplify the decision-making process for dining out and enhance the overall dining experience.

What pain point does this project solve?
This project addresses the common pain point of indecision when it comes to choosing a restaurant. Many people struggle with selecting a restaurant when they have various preferences and options to consider. This app streamlines the selection process, reducing the time and effort required to find a suitable dining destination.

Why should we care about your product?
Users should care about this product because it simplifies the dining-out experience, saving them time and alleviating the stress of choosing a restaurant. Additionally, it facilitates the reservation process. This app enhances user satisfaction when dining out by providing them with a fun and practical tool for discovering new culinary experiences.

## Scope (In/Out)

IN - What will your product do:
* Allow users to input criteria (price, location, food type) for restaurant recommendations.
* Utilize the Yelp API and an AI API to fetch restaurant data matching user criteria.
* Generate and display a random restaurant from the list the above API creates.
* Enable users to make, update, and delete reservations.
* Store reservation data in a MongoDB database.
OUT - What will your product not do:
* Provide food delivery services
* Handle payment processing for restaurant reservations
* Connect to restaurant websites to make reservations

## Minimum Viable Product

* User registration and login.
* Restaurant recommendation based on user criteria using the Yelp and AI APIs.
* Reservation creation, modification, and deletion.
* Integration with MongoDB for reservation storage.

## Stretch

* User reviews and ratings for restaurants.
* Delete reservation confirmation module.
* Integration with restaurant booking systems for real-time reservations.
* Cool CSS

## Functional Requirements

1. User can log in
2. User can fill out the restaurant request form
3. User can see the randomly generated restaurant
4. User can make a reservation for that restaurant by filling out a form
5. User can see a list of reservations they made
6. User can update and delete reservations
7. User can view our about us page
8. User can view their account page
9. User can log out

## Data Flow

1. User logs in and enters restaurant criteria (location and price).
2. App sends criteria to the Yelp API.
3. Yelp API returns a list of matching restaurants and their data.
4. List of restaurants is sent to AI API and filtered based on type of food.
5. AI API sends filtered data back to app.
6. App randomly selects and displays a restaurant to the user from the list of filtered restaurants.
7. User can make a reservation, and reservation data is sent to MongoDB.
8. User can later update or delete their reservation, with changes reflected in the database.

## Non-Functional Requirements

* Security: User data, including login information and reservation details, will be securely stored. Access to user data will be restricted based on the specific user, and authentication mechanisms will be implemented to ensure data privacy.
* Usability: The app will have an intuitive user interface, clear navigation, and responsive design to ensure a positive user experience. User testing and feedback will be used to enhance usability throughout development.
