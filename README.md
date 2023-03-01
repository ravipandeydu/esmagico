# Backend

Deployed Link: https://esmagico.onrender.com
(*deployed link may be slow)

## Dummy Admin
`One admin is hard-coded to prevent misuse by other users`
(by using these credentials you can make anyone admin or users)
- eamil: admin@admin.com
- password: admin

## To use it locally follow the following steps
## Initials
- npm install - to install all dependencies
- npm start - to start the app
## Routes
To Sign up
- http://localhost:8080/signup

To Sign in
- http://localhost:8080/signin

To Get All Users
- http://localhost:8080/users

To Get Single Users
- http://localhost:8080/users/:id

To Update User
- http://localhost:8080/edit/:userId

To Send forgot password link
- http://localhost:8080/forgotpassword

To reset password
- http://localhost:8080/resetpassword/:resetToken

To Search Users
- http://localhost:8080/search

Environment Variable
- PORT=8080
- MONGO_URL = "Your_MonbodDB_URL
- privateKey = "Your_JWT_Secret_Token"
- FRONTEND_URL="FRONTEND_URL"
- EMAIL_USER="Your_Email"
- EMAIL_HOST="smtp.gmail.com"
- EMAIL_PASS="Your_Email_Password"

# Frontend

deployed link: https://vocal-pixie-cd338e.netlify.app/

## To use it locally follow the following steps
## Initials
- npm install - to install all dependencies
- npm run dev - to start the app

Environment Variable
- VITE_PORT="Your_Backend_URL"