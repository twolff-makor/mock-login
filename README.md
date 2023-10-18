## System Purpose
The goal of this system is to compare enigma-x front end performance with a stripped down version that offers basic functionalities.

## Libraries
This project was built using vite.
It makes use of the following libraries : WS, Axios, react-router.

## Setup
 - To run this software you must have the correct .env file.
 - Once .env is set up, install dependencies and run: npm run dev.
 - Once the application is running you will be faced with the login page.
 - Enter password and username for enigma-x uat, next you must complete 2fa using email or sms. Only then will you have access to the system.
 - Please notice - if you make multiple failed requests your ip will be blocked.

## Folder Structure
 - components - contains components that are then used in the pages files
 - context - creates a global auth context for the project
 - hooks - contains only one custom hook - useGlobalAuthContext - that is used in the        protected route component
 - pages - contains the main pages for the project, each page uses components form the components folder
 - services - basic websocket and auth logic, to be used mainly in the pages components
 - The react routes are in the app.js file.

## Login Flow
1. User submits credentials in LoginPage
2. Credentials are sent to the server using rest protocol
3. Server sends response with token or 2fa details
4. If token is received user is logged in - routed to HomePage
    if 2fa user must chose 2fa type - routed to TwoFaPage
5. Chosen 2fa method is sent to server 
6. Server responds with session token
7. User must input 6 digit code
8. 6 digit code is sent along with session token 
9. If code is correct token is received and user is logged in - routed to HomePage 
10. On render of HomePage websocket connection is opened and these requests are sent : utils, balance, subscription, trades blotter


## `HomePage` Component

### Description
The `HomePage` component represents the home page of the web application. It is responsible for establishing a WebSocket connection, retrieving product configuration information, and rendering user interface components once the connection is established. This component is nested inside a protectedRoute Component that renders the nested Homepage only if there is a token in local-storage.

### Usage
- This component is used as the initial page after logging in.
- Users can log out by clicking the "Log Out" button, which clears local storage and closes the WebSocket connection.
- Once the WebSocket connection is open and product configuration data is received, the component renders the following UI elements:
    - `ClickTrader`: A component that displays trading options based on the chosen product, receives config as props from HomePage.
    - `SpotBalance`: A component that shows the user's balance.
    - `TradesBlotter`: A component displaying a list of trades.

### Component Structure
- The `HomePage` establishes a WebSocket connection to the server with the user's token.
- It sends a request for product configuration data and handles the response.
- The user can log out using the "Log Out" button.

### State
- `connection`: A boolean state that indicates whether the WebSocket connection is established.
- `ctConfig`: Stores the product configuration data received from the server.
- `TOKEN`: Retrieves the user's token from local storage.

### Functions
- `createWebSocketConnection()`: Initiates the WebSocket connection and requests product configuration data.
- `getConfig()`: Sends a WebSocket message to retrieve product configuration data and sets a message handler for the response.
- `handleLogout()`: Clears local storage, closes the WebSocket connection, and navigates the user to the home page.

Sure, here's a documentation template adapted for the `LoginPage` component:

## `LoginPage` Component

### Description
The `LoginPage` component serves as the login page for the web application. It allows users to input their credentials (username and password) and handles the authentication process. Depending on the result of the authentication, users may be redirected to different pages or receive an error message.

### Usage
- This component is used as the initial login page of the application.
- Users can input their username and password and submit the form to log in.
- Depending on the authentication outcome, the user may be redirected to the homepage, a two-factor authentication page, or receive an error message.

### Component Structure
- The `LoginPage` collects user input for the username and password and sends it to the authentication service.
- Depending on the authentication response, the component may redirect the user or display an error message.

### State
- `formData`: An object that stores the user's input for `username` and `password`.
- `passwordError`: A boolean state that controls whether an error message is displayed when authentication fails.

### Functions
- `handleInputChange(event)`: A function that handles input changes and updates the `formData` state accordingly.
- `handleSubmit(event)`: An asynchronous function that is called when the login form is submitted. It sends user credentials to the authentication service and takes action based on the response.
- `navigate(path)`: A function from the 'react-router-dom' library used for client-side navigation.

Certainly, here's a documentation template for the `TwoFaPage` component:

## `TwoFaPage` Component

### Description
The `TwoFaPage` component is responsible for handling two-factor authentication (2FA) for user access to the application. It allows users to choose between email or SMS-based 2FA methods and submit the authentication code. Upon successful authentication, the user is routed to the `HomePage` component.


### Usage
- This component is an intermediate step after the login page where users are required to complete 2FA.
- Users can choose between two 2FA methods: email or SMS confirmation.
- Depending on the selected method, users input a six-digit code and submit it to complete the 2FA process.

### Component Structure
- The `TwoFaPage` component uses React hooks for state management and event handling.
- It retrieves stored 2FA information (email and SMS codes) from local storage.
- The component provides options for users to select their 2FA method (email or SMS).
- Users can input the six-digit code for verification.
- Upon successful verification, the user is redirected to the home page.

### State
- `isEmailAuth`: A boolean state indicating whether the email-based 2FA method is selected.
- `isSmsAuth`: A boolean state indicating whether the SMS-based 2FA method is selected.
- `sixDigits`: Stores the user's input for the six-digit authentication code.

### Functions
- `handleAuthEmail(event)`: A function for initiating email-based 2FA. It sends a request to obtain the email confirmation code and sets `isEmailAuth` to `true`.
- `handleAuthSms(event)`: A function for initiating SMS-based 2FA. It sends a request to obtain the SMS confirmation code and sets `isSmsAuth` to `true`.
- `handleCodeChange(event)`: A function that updates the `sixDigits` state based on the user's input.
- `handleSubmitCode(event)`: A function that handles the submission of the six-digit code for verification. If verification is successful, the user is redirected to the home page.
