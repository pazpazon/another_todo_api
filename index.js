const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('here we are in root!') ;
});


app.use('/api/todos', todoRoutes);


app.listen(PORT, () => console.log(`APP running on port:${PORT}`));
