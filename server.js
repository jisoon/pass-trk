const express = require('express');
const app = express();
require('./envset')
const trkApi = require('./api/trk-api')
const port = process.env.SERVER_PORT || 9002;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", trkApi);

app.listen(port, '0.0.0.0', () => {
  console.log("!!!! server env : ", process.env.NODE_ENV);
  console.log('!!!! PassTRK api url : ', process.env.CJ_API_URL);
  console.log('!!!! PassTRK port : ', port);
});


