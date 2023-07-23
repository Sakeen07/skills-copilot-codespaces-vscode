// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create web server application
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Compile schema into model
const Comment = mongoose.model('Comment', commentSchema);

// Configure web server application
app.use(bodyParser.urlencoded({ extended: true }));

// Configure web server routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Comment saved successfully.');
            res.redirect('/');
        }
    });
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.send(comments);
        }
    });
});

// Start web server
app.listen(3000, () => {
    console.log('Web server started on port 3000.');
});
