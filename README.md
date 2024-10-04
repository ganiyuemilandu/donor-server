# Donor Server

A NodeJS backend server that enables authenticated users to make donations to other users on the platform.

Powered by NodeJS, ExpressJS, and MongoDB, it defines API endpoints to create and manage user registration and login, wallet creation and topup, as well as make donations to users.

## Dependencies

The following dependencies are required for this app.

- bcryptjs (For hashing user's password before storage)
- dotenv (for loading environment variables from .env file)
- express (For managing the server)
- express-async-handler (for clean handling of errors)
- express-validator (for validating sent requests)
- jsonwebtoken (For generating user tokens)
- Mongoose (For managing data storage and access in MongoDB)

## Running Locally

To run the program locally, the following actions must be taken:
1. Clone the repository.
2. Create a file named .env in the root directory of the project.
3. Create 3 environment variables in the .env file
    - JWT_SECRET (A random string for signing and verifying JWT Tokens)
    - MONGO_URI (A valid URI to a MongoDB database)
    - PORT (A port number from which the server will listen for request)
4. Install all dependencies.
5. Run the app.

So, to begin, open your terminal, navigate to the directory you want to clone the project, and run the following commands.

1. `git clone https://github.com/ganiyuemilandu/donor-server.git`
2. `npm install`
3. `npm run dev`

Note: before running the third command, you must have created the .env file, and defined said environment variables in it.

## Sending requests to server

The following API endpoint roots are defined:
- `/api/users` (For user registration and login)
- `/api/wallets` (for wallet creation and topup)
- `/api/donations` (for making donations to another user)

### Users endpoints

To sign a user up, send a post request to `/api/users/register`, providing a JSON object with the following keys:
- `first` (User's first name)
- `last` (User's last name)
- `email` (User's email address)
- `password` (User's password)

---

To sign a user in, send a post request to `/api/users/login`, providing a JSON object with the following keys:
- `email` (User's email address)
- `password` (User's password)

---

To fetch a given user, send a get request to `/api/users/:id` where `id` is a MongoDB unique identifier for the user.

### Wallets Endpoints

All wallet operations require user authentication. Therefore, user should do the following before proceeding with wallet creation and management.
1. Log in to your account. (register if you don't have an account)
2. Copy the token sent in the response if login successful.
3. Paste this token in the auth header of your request.

---

To create a wallet, send a post request to `/api/wallets/create`, providing a JSON object with the following keys:
- `name` (Wallet preferred name)
- `pin` (a 4-digit pin for transacting on this wallet)

---

To topup an existing wallet, send a put request to `/api/wallets/topup`, providing a JSON object with the following keys:
- `amount` (The amount to add to the wallet)

---

To change a wallet name, send a put request to `/api/wallets/update/name`, providing a JSON object with the following keys:
- `name` (Wallet new name)

---

To change a wallet pin, send a put request to `/api/wallets/update/pin`, providing a JSON object with the following keys:
- `pin` (Wallet current pin)
- `newPin` (Wallet new pin)

---

To fetch wallet info, send a get request to `/api/wallets`.

---

### Donations Endpoints

To donate to another user, send a post request to `/api/donations/donate`, providing a JSON object with the following keys:
- `walletID` (The wallet to donate to)
- `amount` (The amount to donate)

---

To fetch all donations, send a get request to `/api/donations`.