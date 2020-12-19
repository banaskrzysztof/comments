const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 80;

const commentSchema = mongoose.Schema({
  userName: String,
  comment: String
});
const Comment = mongoose.model('Comment', commentSchema);

app.use(express.static(__dirname + '/dist/serwis'));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost/comments');

app.get('/*', ((req, res) => res.sendFile(path.join(__dirname))));
app.get('/api/comments', ((req, res) => {
  Comment.find(function (err, response) {
    res.json(response);
  })
}));
app.post('/api/save', (req, res) => {
  const body = req.body;
  const newComment = new Comment({
    userName: body.userName,
    comment: body.comment
  });
  newComment.save(function (err, Comment) {
    res.send(body);
  });
})

const server = http.createServer(app);

server.listen(port, () => console.log('Serwer is running...'));
