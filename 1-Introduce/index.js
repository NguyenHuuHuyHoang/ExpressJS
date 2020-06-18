var express = require('express');
var app = express();
var port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function(request , response){
    // response.send('Hello Coder Tokyo');
    response.send('<h1>Hello Coder Tokyo</h1>');
})

app.get('/user', function(request , response){
    // response.send('Hello Coder Tokyo');
    response.send('Userlist');
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));
