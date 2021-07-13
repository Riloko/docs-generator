const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require("body-parser");


const generate = require('./generator');

const app = express();
const port = 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(bodyParser.json({limit: "50mb", extended: true}));


app.post('/generate', (req, res) => {
	generate(req.body).then(data => res.send(data))
});

app.listen(port, (req, res) => {
	console.log(`Started listenning http://localhost:${port}/`);

})
