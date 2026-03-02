# WTWR (What To Wear) — React

WTWR ("What To Wear") is a weather-based wardrobe app built in React. The app fetches real-time weather data for a chosen location and suggests clothing items based on temperature.

## Overview & Functionality

As part of Sprint 14 in the TripleTen Software Engineering program, this project evolved into a **full‑stack WTWR application**. The React frontend communicates with an Express + MongoDB backend to support authentication, protected routes, profile editing, and persistent likes.

Core functionality now includes:

- Fetching weather data from the OpenWeather API
- Displaying the current date and city
- Filtering clothing items by temperature conditions
- User registration and login using JWT authentication
- Protected profile route (`/profile`)
- Editing user profile information (name + avatar)
- Liking and unliking clothing items (state persists in database)
- Adding and deleting garments (authorized users only)
- Managing global UI state (selected card, active modal, etc.) from the App component

## Features

- Display today’s **date** and **current city**
- Fetch real-time weather data from the **OpenWeather API**
- Toggle temperature between **°F and °C**
- Suggest clothing items based on weather type (`hot`, `warm`, `cold`)
- User **Sign Up / Sign In / Sign Out** (JWT-based authentication)
- Persistent login using token validation on page load (`GET /users/me`)
- Protected `/profile` route for authorized users only
- Edit profile (update name and avatar)
- Like / Unlike clothing items (state saved to database)
- Add and delete garments (authorized users only)

## Technologies

### Frontend

- **React** (functional components + hooks)
- **Vite** (fast bundler/dev server)
- **JavaScript (ES6+)**
- **CSS (BEM methodology)**
- **Fetch API**
- **Prettier** for code formatting
- **Normalize.css**
- Custom fonts from the UI Kit

### Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)** for authentication
- **bcryptjs** for password hashing

## Project Structure

### Frontend (`se_project_react`)

- `/src/components` — React components (App, Header, Main, Profile, modals, etc.)
- `/src/utils` — API functions (`api.js`, `auth.js`), constants, weather helpers
- `/src/contexts` — Context providers (CurrentUserContext, CurrentTemperatureUnitContext)
- `/src/hooks` — Custom hooks (`useForm`)
- `/src/vendor` — fonts, `normalize.css`, and `fonts.css`

### Backend (`se_project_express`)

- `/controllers` — route logic
- `/routes` — API routes
- `/models` — Mongoose schemas
- `/middlewares` — authentication middleware
- `/utils` — helper utilities

## Demo Video & Screenshots :

- Desktop View - 1440px Width: ![Desktop View](./src/assets/screenshots/image.png)

- Add Garment View - 1440px width: ![Add Garment View](./src/assets/screenshots/image2.png)

- Item Card View - 1440px width: ![Add Item Card View](./src/assets/screenshots/image3.png)

## Project Pitch Video

Check out [this video](https://www.loom.com/share/83c2daba0f744e3eab3e9b63fb4f9a42), where I describe my WTWR React project, the main features, and challenges I faced.

## GitHub Pages :

- [Github Link](https://github.com/davebedoya/se_project_react)
- [Github Pages](https://davebedoya.github.io/se_project_react/)

## Backend Repo:

- [Github Link](https://github.com/davebedoya/se_project_express)

## Disclaimer

This is a **full‑stack WTWR application**. The frontend communicates with a custom Express/MongoDB backend that handles authentication, protected routes, user profiles, and clothing item interactions.

The backend repository is linked above and publicly accessible.
