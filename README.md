# Time Tracking App Challenge

![image](https://user-images.githubusercontent.com/578625/73622962-3f333200-464c-11ea-9308-4eeae90a13b2.png)

## Description & User Stories

The challenge is to build a small full stack web app, that can help a freelancer track their time.

It should satisfy these user stories:

- As a user, I want to be able to start a time tracking session
- As a user, I want to be able to stop a time tracking session
- As a user, I want to be able to name my time tracking session
- As a user, I want to be able to close my browser and shut down my computer and still have my sessions visible to me when I power it up again.
- As a user, I want an overview of my sessions for the day, week and month
- As a user, I want to be able to save my time tracking session when I am done with it

## How to Run the Application

- **The only prerequisite is installed docker**
- Navigate to the root directory and run `docker compose up`
- Open `localhost:3000` in your browser

## Project Structure

This project has two parts:

- api - back-end api for application
- client - web client for application.

There is more info in projects README files.

## Tech Stack

### Frontend

    - React with Hooks API
    - Redux
    - Redux Thunk
    - nanoid (for generation id for optimistic updates)

### Backend

    - Golang
    - Echo - minimalist API framework
    - MongoDb - as the main persistency storage (overhead for sure, just wanted to learn it)

## Possible Improvements

There is still room for improvement, a lot of improvements. I was limited in time and tried to stick to estimate in the challenge description (days). The list of possible improvements I see, down below:

- Authorization
- Ability to delete time logs
- Ability to update time logs (to correct the mistake)
- Better error handling (show toast messages to the user, retries)
- Reset current tracking button
- Pagination in the table
- More flexible date filter (calendar?) and sorting in a different direction
- Support of hotkey (space - start the timer, enter - submit)
- Zero and loading state (skeleton) for table
- Int8n
- Better UI :)
