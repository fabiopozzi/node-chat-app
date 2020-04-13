const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express configuration
const publicDirPath = path.join(__dirname, '../public')

// setup static directory to use
app.use(express.static(publicDirPath))

app.listen(port, () => {
    console.log('Server is up on port ', port)
})
