const express = require('express');
const bodyParser = require('body-parser');
const envelopeRoutes = require('./src/envelopes/routes');

const app = express();
const port = process.env.PORT;;

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/envelopes', envelopeRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));