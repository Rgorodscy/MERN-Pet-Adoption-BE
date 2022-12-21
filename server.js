const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs')

app.use(express.json())

//app.use of the routes





app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})