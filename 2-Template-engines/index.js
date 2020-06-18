var express = require('express');
var app = express();
var port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');


// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function (req, res) {
    // res.send('Hello Coder Tokyo');
    // res.render('index');
    res.render('index', {
        name: 'AAA'
    });
});

app.get('/users', function (req, res) {
    // res.send('Hello Coder Tokyo');
    res.render('users/index', {
        users: [
            { id: 1, name: 'Thinh' },
            { id: 2, name: 'Hung' }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
