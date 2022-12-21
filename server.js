const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8080;

const userRoute = require('./routes/UserRoute')
const petRoute = require('./routes/PetRoute')
const loginRoute = require('./routes/Login')
const signupRoute = require('./routes/Signup')

app.use(express.json())
app.use(cors()); //Allows requests from anywhere, eventually it needs to be fixed to accept only from our FE

app.use('/pet', petRoute);
// app.use('/user', userRoute);
// app.use('/login', loginRoute);
// app.use('/signup', signupRoute);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})