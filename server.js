const express = require('express');
const cors = require('cors');
const  cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const morgan = require('morgan');


const userRoute = require('./routes/UserRoute')
const petRoute = require('./routes/PetRoute')
const loginRoute = require('./routes/Login')
const signupRoute = require('./routes/Signup')

app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use('/pet', petRoute);
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}
main().catch(err => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to DB successfully");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
});