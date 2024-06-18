const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json()); 
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoutes);

app.use((error, req, res, next)=>{
    console.log(error);
    const status = error.statusCode
    const message = error.message
    res.status(status).json({message:message})
})

mongoose.connect('mongodb+srv://binaro97:7kYHbTN6C3aYrZMr@cluster0.4v5prio.mongodb.net/feed?retryWrites=true&w=majority&appName=Cluster0')
.then(result=>{
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
})
.catch(err=>console.log(err))
